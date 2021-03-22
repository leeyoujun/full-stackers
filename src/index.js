const path = require('path')

const { RapidFire } = require('@luasenvy/rapidfire')

const { Client: Elasticsearch } = require('@elastic/elasticsearch')

const cmdParams = process.argv.filter(arg => arg.startsWith('--')).map(arg => arg.replace(/^--/, ''))

const {
  'service-bind': cmdBind,
  'service-port': cmdPort,
  'elasticsearch-node': cmdElasticsearchNode,
  'elasticsearch-username': cmdElasticsearchUsername,
  'elasticsearch-password': cmdElasticsearchPassword,
} = cmdParams.reduce((acc, param) => {
  const [key, val] = param.split('=')
  return Object.assign(acc, { [`${key}`]: val })
}, {})

const options = {
  bind: process.env.FULLSTACKER_BIND || cmdBind || '127.0.0.1',
  port: process.env.FULLSTACKER_PORT || cmdPort || 8000,
  elasticsearch: {
    connection: {
      node: process.env.FULLSTACKER_ELASTIC_NODE || cmdElasticsearchNode,
      auth: {
        username: process.env.FULLSTACKER_ELASTIC_USERNAME || cmdElasticsearchUsername,
        password: process.env.FULLSTACKER_ELASTIC_PASSWORD || cmdElasticsearchPassword,
      },
    },
  },
}

const app = { options }

const fn = {
  makeDatabaseConnection({ options }) {
    return new Elasticsearch(options)
  },
}

function main() {
  const {
    bind,
    port,
    elasticsearch: { connection: elasticsearchConnection },
  } = app.options

  // Create a new Elasticsearch Client
  const client = fn.makeDatabaseConnection({ options: elasticsearchConnection })

  const rapidFire = new RapidFire({
    host: bind,
    port: port,
    paths: {
      loaders: path.join(__dirname, 'loaders'),
      services: path.join(__dirname, 'services'),
      controllers: path.join(__dirname, 'controllers'),
      middlewares: path.join(__dirname, 'middlewares'),
    },
    dbs: [client],
    app,
  })

  rapidFire.ignition()
}

main()
