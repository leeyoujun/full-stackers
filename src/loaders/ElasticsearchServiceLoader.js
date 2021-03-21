const {
  Interfaces: { ServiceLoader },
} = require('@luasenvy/rapidfire')

const { Client: Elasticsearch } = require('@elastic/elasticsearch')

class ElasticsearchServiceLoader extends ServiceLoader {
  constructor() {
    super()
  }

  async load({ express, Service: ElasticsearchService }) {
    const elastic = this.$rapidfire.dbs.find(db => db instanceof Elasticsearch)

    const service = new ElasticsearchService({ router: express.Router() })

    service._$rapidfire = this.$rapidfire
    service._elastic = elastic

    return service
  }
}

module.exports = ElasticsearchServiceLoader
