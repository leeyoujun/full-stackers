const ElasticsearchService = require('../../interfaces/ElasticsearchService')

const BbsConfigService = require('../../services/admin/BbsConfigService')

class PostService extends ElasticsearchService {
  static _docType = 'post'

  constructor({ router }) {
    super()

    router.get('/api/blogs', (req, res, next) => this.getPosts(req, res).catch(next))

    this.router = router

    this.bbsConfigService = null
  }

  async init() {
    super.init()

    this.bbsConfigService = this.$rapidfire.services.find(service => service instanceof BbsConfigService)
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
    const { status, message } = await this.controller.validate({
      params: req.params,
      expressions: [{ key: 'postId', type: 'required' }],
    })

    if (status) return res.status(status).send(message)

    const {
      body: { _id, _source },
    } = await this.elastic.get({ index: PostService.index, id: req.params.postId })

    res.send({ _id, ..._source })
  }
}

module.exports = PostService
