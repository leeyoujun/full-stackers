const path = require('path')

const { Nuxt, Builder } = require('nuxt')

const {
  Interfaces: { Middleware },
} = require('@luasenvy/rapidfire')

class NuxtMiddleware extends Middleware {
  constructor() {
    super()

    this.nuxt = null
  }

  async init() {
    const isDev = this.$rapidfire.options.isDev

    const { port } = this.$rapidfire.app.options

    this.nuxt = new Nuxt({
      telemetry: false,
      dev: isDev,
      srcDir: path.join(this.$rapidfire.env.paths.root, 'src/nuxt/'),
      modules: ['@nuxtjs/axios', 'bootstrap-vue/nuxt'],
      plugins: [{ src: '~plugins/axios' }],
      axios: { baseURL: `http://127.0.0.1:${port}` },
      bootstrapVue: {
        componentPlugins: ['LayoutPlugin'],
        directivePlugins: ['VBTooltipPlugin'],
      },
    })

    await this.nuxt.ready()

    // Build only in dev mode
    if (isDev) {
      const builder = new Builder(this.nuxt)
      await builder.build()
    }

    this.pipelines.push({ pipe: this.nuxt.render })
  }
}

module.exports = NuxtMiddleware
