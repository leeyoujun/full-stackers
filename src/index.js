const path = require('path')
const debug = require('debug')('fullstackers')

const { RapidFire } = require('@luasenvy/rapidfire')

const { Client: Elasticsearch } = require('@elastic/elasticsearch')

/* ***********************************************************************
 * 서버 환경 설정 로드
 * ***********************************************************************
 * 1. src/.config.js
 * 2. process.env
 *********************************************************************** */
let options = {}

try {
  options = require('./.config.js')
  debug('.config.js Is Provided.')
} catch {
  debug('.config.js Is Not Provided. Config Is Read From "process.env"')

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

  // Ignore Errors
  options = {
    bind: process.env.FULLSTACKER_SERVICE_BIND || cmdBind || '127.0.0.1',
    port: process.env.FULLSTACKER_SERVICE_PORT || cmdPort || 8000,
    elasticsearch: {
      index: process.env.FULLSTACKER_ELASTICSEARCH_INDEX || process.env.npm_package_name,
      connection: {
        node: process.env.FULLSTACKER_ELASTICSEARCH_NODE || cmdElasticsearchNode,
        auth: {
          username: process.env.FULLSTACKER_ELASTICSEARCH_USERNAME || cmdElasticsearchUsername,
          password: process.env.FULLSTACKER_ELASTICSEARCH_PASSWORD || cmdElasticsearchPassword,
        },
      },
    },
  }
}

/* ***********************************************************************
 * 서버 환경설정 체크
 *********************************************************************** */
if (!options.elasticsearch.connection?.node)
  throw new Error('There Is No Elasticsearch Connection Information. "options.elasticsearch.connection.node" Config Is Required.')

if (options.elasticsearch?.connection?.auth) {
  if (!options.elasticsearch.connection.auth?.username || !options.elasticsearch.connection.auth?.password) {
    debug(`
    "options.elasticsearch.connection.auth.username" Or "options.elasticsearch.connection.auth.password" Is Not Provided.
    "options.elasticsearch.connection.auth" Config Will Deleted.
  `)
    delete options.elasticsearch.connection.auth
  }
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
