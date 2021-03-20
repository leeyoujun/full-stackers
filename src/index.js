const path = require('path')

const { RapidFire } = require('@luasenvy/rapidfire')

const rapidFire = new RapidFire({
  host: 'localhost',
  port: 8000,
  paths: {
    services: path.join(__dirname, 'services'),
    middlewares: path.join(__dirname, 'middlewares'),
  },
})

rapidFire.ignition()
