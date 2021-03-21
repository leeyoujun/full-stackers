const ElasticsearchService = require('../../interfaces/ElasticsearchService')

class BbsConfigService extends ElasticsearchService {
  static _docType = 'bbsConfig'

  constructor({ router }) {
    super()

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
}

module.exports = BbsConfigService
