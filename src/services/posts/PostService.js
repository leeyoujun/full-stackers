const ElasticsearchService = require('../../interfaces/ElasticsearchService')

class PostService extends ElasticsearchService {
  static _docType = 'post'

  constructor({ router }) {
    super()

    router.get('/api/posts', (req, res, next) => this.getPosts(req, res).catch(next))
    router.get('/api/posts/:postId', (req, res, next) => this.getPost(req, res).catch(next))
    router.post('/api/posts', (req, res, next) => this.createPost(req, res).catch(next))
    router.put('/api/posts', (req, res, next) => this.updatePost(req, res).catch(next))
    router.delete('/api/posts/:postId', (req, res, next) => this.deletePost(req, res).catch(next))

    this.router = router
  }

  /**
   * 데이터 베이스 활용
   *
   * 엘라스틱서치 nodejs 클라이언트 공식 문서: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
   *
   * const { body: { hits: { hits: posts } } } = await this.elastic.search({
   *   index: PostService.index,
   *   body: {
   *     query: {
   *       match: {
   *         'docType.keyword': PostService.docType,
   *       }
   *     }
   *   },
   * })
   */
  async getPosts(req, res) {
    const { rows: posts } = await this.scrolling({
      index: PostService.index,
      body: {
        query: {
          match: {
            'docType.keyword': PostService.docType,
          },
        },
      },
    })

    res.send(posts)
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

module.exports = PostService
