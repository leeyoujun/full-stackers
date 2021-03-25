const ElasticsearchService = require('../../interfaces/ElasticsearchService')

const BbsConfigService = require('../../services/admin/BbsConfigService')

class PostService extends ElasticsearchService {
  static _docType = 'post'

  constructor({ router }) {
    super()

    router.get('/api/posts', (req, res, next) => this.getPosts(req, res).catch(next))
    router.get('/api/posts/paginate', (req, res, next) => this.getPaginatedPosts(req, res).catch(next))
    router.get('/api/posts/:postId', (req, res, next) => this.getPost(req, res).catch(next))

    router.post('/api/posts', (req, res, next) => this.createPost(req, res).catch(next))
    router.put('/api/posts', (req, res, next) => this.updatePost(req, res).catch(next))
    router.delete('/api/posts/:postId', (req, res, next) => this.deletePost(req, res).catch(next))

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

  async getPaginatedPosts(req, res) {
    const { status, message } = await this.controller.validate({
      params: req.query,
      expressions: [
        { key: 'from', type: 'required' },
        { key: 'size', type: 'required' },
        { key: 'from', type: 'number' },
        { key: 'size', type: 'number' },
      ],
    })
    if (status) return res.status(status).send(message)

    const { from, size } = req.query

    const response = await this.elastic.search({
      index: PostService.index,
      from,
      size,
      body: {
        query: {
          match_all: {},
        },
        sort: {
          'data.createdAt': {
            order: 'desc',
          },
        },
      },
    })

    const { total, rows } = this.simplify(response)

    res.send({ total, rows })
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

  async createPost(req, res) {
    const { status, message } = await this.controller.validate({
      params: req.body,
      expressions: [
        { key: 'bbsConfigId', type: 'required' },
        { key: 'title', type: 'required' },
        { key: 'content', type: 'required' },
        { key: 'postId', type: 'required' },
        // TODO: writerId는 반드시 필요하도록 추후 작업
        // { key: 'writerId', type: 'required' },
        {
          key: 'bbsConfigId',
          type: 'fn',
          fn: async ({ value: bbsConfigId }) => {
            const {
              body: { count },
            } = await this.elastic.count({
              index: this.bbsConfigService.constructor.index,
              body: {
                query: {
                  match: { _id: bbsConfigId },
                },
              },
            })

            if (count <= 0) return { status: 400, message: `"${bbsConfigId}" 서비스가 존재하지 않습니다.` }
          },
        },
      ],
    })

    if (status) return res.status(status).send(message)

    const { bbsConfigId, title, content, writerId, view = 0, categories = [], like = 0, dislike = 0, comments = [] } = req.body

    const {
      body: { _id: createdId },
    } = await this.elastic.index({
      index: PostService.index,
      refresh: 'wait_for',
      body: {
        docType: PostService.docType,
        data: {
          bbsConfigId,
          title,
          content,
          writerId,
          view,
          categories,
          like,
          dislike,
          comments,
          createdAt: new Date(),
        },
      },
    })

    res.status(201).send({ createdId })
  }

  async updatePost(req, res) {
    const { status, message } = await this.controller.validate({
      params: req.body,
      expressions: [
        { key: '_id', type: 'required' },
        { key: 'bbsConfigId', type: 'required' },
        { key: 'title', type: 'required' },
        { key: 'content', type: 'required' },
        { key: 'postId', type: 'required' },
      ],
    })

    if (status) return res.status(status).send(message)

    const { _id, bbsConfigId, title, content, writerId, view = 0, categories = [], like = 0, dislike = 0, comments = [] } = req.body

    await this.elastic.update({
      index: PostService.index,
      refresh: 'wait_for',
      id: _id,
      body: {
        doc: {
          docType: PostService.docType,
          data: {
            bbsConfigId,
            title,
            content,
            writerId,
            view,
            categories,
            like,
            dislike,
            comments,
            updatedAt: new Date(),
          },
        },
      },
    })

    res.sendStatus(204)
  }

  async deletePost(req, res) {
    await this.elastic.delete({ index: PostService.index, id: req.params.postId })
    res.sendStatus(204)
  }
}

module.exports = PostService
