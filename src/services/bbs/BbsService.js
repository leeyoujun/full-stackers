const ElasticsearchService = require('../../interfaces/ElasticsearchService')

class BbsService extends ElasticsearchService {
  static _docType = 'bbs'

  constructor({ router }) {
    super()

    router.get('/api/bbs/posts', (req, res, next) => this.getPosts.catch(next))
    router.get('/api/bbs/posts/:postId', (req, res, next) => this.getPost.catch(next))
    router.post('/api/bbs/posts', (req, res, next) => this.createPost.catch(next))
    router.put('/api/bbs/posts', (req, res, next) => this.updatePost.catch(next))
    router.delete('/api/bbs/posts/:postId', (req, res, next) => this.deletePost.catch(next))

    this.router = router
  }

  /**
   * 데이터 베이스 활용
   *
   * 엘라스틱서치 nodejs 클라이언트 공식 문서: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
   *
   * const { body: { hits: { hits: posts } } } = await this.elastic.search({
   *   index: BbsService.index,
   *   body: {
   *     query: {
   *       match: {
   *         'docType.keyword': BbsService.docType,
   *       }
   *     }
   *   },
   * })
   */

  async getPosts(req, res) {
    res.status(200)
  }
  async getPost(req, res) {
    res.status(200)
  }
  async createPost(req, res) {
    res.status(201)
  }
  async updatePost(req, res) {
    res.status(200)
  }
  async deletePost(req, res) {
    res.status(204)
  }
}

module.exports = BbsService
