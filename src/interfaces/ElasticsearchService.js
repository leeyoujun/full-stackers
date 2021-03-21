const Service = require('./Service')

const ElasticsearchServiceLoader = require('../loaders/ElasticsearchServiceLoader')

class ElasticsearchService extends Service {
  // loader
  static loader = ElasticsearchServiceLoader

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
}

module.exports = ElasticsearchService
