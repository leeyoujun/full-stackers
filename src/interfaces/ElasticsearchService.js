const Service = require('./Service')
const Controller = require('../controllers/Controller')

const ElasticsearchServiceLoader = require('../loaders/ElasticsearchServiceLoader')

class ElasticsearchService extends Service {
  // loader
  static loader = ElasticsearchServiceLoader

  // controller
  static controller = Controller

  // elasticsearch index
  static _index = ''

  static get index() {
    return this._index
  }

  static _docType = ''

  static get docType() {
    return this._docType
  }

  constructor() {
    super()

    this._elastic = null
  }

  get elastic() {
    return this._elastic
  }

  async init() {
    await super.init()

    this.constructor._index = this.constructor._index || process.env.npm_package_name

    const index = this.constructor._index

    if (index) {
      try {
        await this.elastic.indices.get({ index })
      } catch (err) {
        const { meta: { body: { status, error: { type = '' } = {} } = {} } = {} } = err

        if (status !== 404 || type !== 'index_not_found_exception') throw err

        try {
          await this.elastic.indices.create({ index, wait_for_active_shards: 'all' })
        } catch (err) {
          const { meta: { body: { status, error: { type = '' } = {} } = {} } = {} } = err

          // Ignore 'resource_already_exists_exception'
          if (status !== 400 || type !== 'resource_already_exists_exception') throw err
        }
      }
    }
  }

  total({
    body: {
      hits: {
        total: { value: total },
      },
    },
  }) {
    return total
  }

  mapBucket({ body: { aggregations } } = {}) {
    if (!aggregations) throw new Error(`"mapBucket()"에 실패하였습니다. "aggregations" 값은 필수값입니다.`)

    return Object.keys(aggregations).reduce(
      (acc, key) =>
        Object.assign(acc, {
          [`${key}`]: aggregations[key].buckets,
        }),
      {}
    )
  }

  mapSource({
    body: {
      hits: { hits },
    },
  }) {
    return hits.map(h => Object.assign({ _id: h._id, _seq_no: h._seq_no }, h._source.data, h.fields))
  }

  simplify(result) {
    if (Object.prototype.hasOwnProperty.call(result.body, 'aggregations')) return { total: this.total(result), aggs: this.mapBucket(result) }
    return { total: this.total(result), rows: this.mapSource(result) }
  }

  async scrolling({ index, body, size = 3000, scroll = '5s' }) {
    if (!index) throw new Error('"index" 값은 필수값 입니다.')
    if (!body) throw new Error('"body" 값은 필수값 입니다.')

    // 스크롤 시작 지점 검색
    const params = { index, size, scroll, body }

    const response = await this.elastic.search(params)

    const {
      body: { _scroll_id: scrollId },
    } = response

    const { rows, total } = this.simplify(response)

    // 결과가 더 있다면 스크롤링 시작
    if (total > rows.length) return await this.scroller({ scrollId, scroll, rows, total })

    return { rows, total }
  }

  async scroller({ scrollId, scroll, rows = [], total }) {
    const response = await this.elastic.scroll({ scrollId, scroll })

    const {
      body: { _scroll_id: _scrollId },
    } = response

    const { rows: _rows } = this.simplify(response)

    if (!_scrollId || _rows.length === 0) return { rows, total }

    rows = rows.concat(_rows)

    if (rows.length >= total) return { rows, total }

    return await this.scroller({ scrollId: _scrollId, scroll, rows, total })
  }
}

module.exports = ElasticsearchService
