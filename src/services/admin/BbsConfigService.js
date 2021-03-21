const ElasticsearchService = require('../../interfaces/ElasticsearchService')

class BbsConfigService extends ElasticsearchService {
  static _docType = 'bbsConfig'

  constructor({ router }) {
    super()

    this.router = router
  }
}

module.exports = BbsConfigService
