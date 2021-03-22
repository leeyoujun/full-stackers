const ElasticsearchService = require('../../interfaces/ElasticsearchService')

class BbsConfigService extends ElasticsearchService {
  static _docType = 'bbsConfig'

  constructor({ router }) {
    super()

    router.get('/api/configs/bbs', (req, res, next) => this.getBbsConfigs(req, res).catch(next))
    router.get('/api/configs/bbs/:bbsConfigId', (req, res, next) => this.getBbsConfig(req, res).catch(next))
    router.post('/api/configs/bbs', (req, res, next) => this.createBbsConfig(req, res).catch(next))
    router.put('/api/configs/bbs', (req, res, next) => this.updateBbsConfig(req, res).catch(next))
    router.delete('/api/configs/bbs/:bbsConfigId', (req, res, next) => this.deleteBbsConfig(req, res).catch(next))

    this.router = router
  }

  /**
   * 데이터 베이스 활용
   *
   * 엘라스틱서치 nodejs 클라이언트 공식 문서: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
   *
   * const { body: { hits: { hits: posts } } } = await this.elastic.search({
   *   index: BbsConfigService.index,
   *   body: {
   *     query: {
   *       match: {
   *         'docType.keyword': BbsConfigService.docType,
   *       }
   *     }
   *   },
   * })
   */

  async getBbsConfigs(req, res) {
    const { rows: posts } = await this.scrolling({
      index: BbsConfigService.index,
      body: {
        query: {
          match: {
            'docType.keyword': BbsConfigService.docType,
          },
        },
      },
    })

    res.send(posts)
  }

  async getBbsConfig(req, res) {
    const { status, message } = await this.controller.validator({
      params: req.params,
      expressions: [{ key: 'bbsConfigId', type: 'required' }],
    })

    if (status) return res.status(status).send(message)

    const {
      body: { _id, _source },
    } = await this.elastic.get({ index: BbsConfigService.index, id: req.params.bbsConfigId })

    res.send({ _id, ..._source })
  }

  async createBbsConfig(req, res) {
    const { status, message } = await this.controller.validator({
      params: req.body,
      expressions: [
        { key: 'title', type: 'required' },
        { key: 'slug', type: 'required' },
        { key: 'type', type: 'required' },
      ],
    })

    if (status) return res.status(status).send(message)

    const { seqCursor = 0, title, slug, type, categories = [] } = req.body

    const {
      body: { _id: createdId },
    } = await this.elastic.index({
      index: BbsConfigService.index,
      refresh: 'wait_for',
      body: {
        docType: BbsConfigService.docType,
        data: {
          seqCursor,
          title,
          slug,
          type,
          categories,
          createdAt: new Date(),
        },
      },
    })

    res.status(201).send({ createdId })
  }

  async updateBbsConfig(req, res) {
    const { status, message } = await this.controller.validator({
      params: req.body,
      expressions: [
        { key: '_id', type: 'required' },
        { key: 'title', type: 'required' },
        { key: 'slug', type: 'required' },
        { key: 'type', type: 'required' },
      ],
    })

    if (status) return res.status(status).send(message)

    const { _id, seqCursor, title, slug, type, categories } = req.body

    await this.elastic.update({
      index: BbsConfigService.index,
      refresh: 'wait_for',
      id: _id,
      body: {
        doc: {
          docType: BbsConfigService.docType,
          data: {
            seqCursor,
            title,
            slug,
            type,
            categories,
            updatedAt: new Date(),
          },
        },
      },
    })

    res.sendStatus(204)
  }

  async deleteBbsConfig(req, res) {
    await this.elastic.delete({ index: BbsConfigService.index, id: req.params.bbsConfigId })
    res.sendStatus(204)
  }
}

module.exports = BbsConfigService
