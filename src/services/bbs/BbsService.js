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
