const path = require('path')

let port = 8000

try {
  const { port: _port } = require('./.config.js')
  port = _port
} catch {
  const cmdParams = process.argv.filter(arg => arg.startsWith('--')).map(arg => arg.replace(/^--/, ''))

  const { 'service-port': cmdPort } = cmdParams.reduce((acc, param) => {
    const [key, val] = param.split('=')
    return Object.assign(acc, { [`${key}`]: val })
  }, {})

  port = process.env.FULLSTACKER_SERVICE_PORT || cmdPort
}

module.exports = {
  telemetry: false,
  dev: process.env.NODE_ENV !== 'production',
  srcDir: path.join(__dirname, 'nuxt/'),
  buildDir: path.join(__dirname, '../.nuxt/'),
  modules: ['@nuxtjs/axios', 'bootstrap-vue/nuxt'],
  plugins: [{ src: '~plugins/axios' }],
  axios: {
    baseURL: `http://127.0.0.1:${port}`,
  },
  bootstrapVue: {
    componentPlugins: ['LayoutPlugin'],
    directivePlugins: ['VBTooltipPlugin'],
  },
}
