const ElasticsearchService = require('../interfaces/ElasticsearchService')

class HelloService extends ElasticsearchService {
  static _docType = 'hello'

  // readonly
  static get docType() {
    return this._docType
  }

  constructor({ router }) {
    super()

    router.get('/api/bbs', (req, res, next) => this.catIndices(req, res).catch(next))

    this.router = router
  }

  async catIndices(req, res) {
    res.send(
      await this.elastic.search({
        index: HelloService.index,
        body: {
          query: {
            match: { 'docType.keyword': HelloService.docType },
          },
        },
      })
    )
  }
}

module.exports = HelloService
