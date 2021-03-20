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

    this.nuxt = new Nuxt({ telemetry: false, dev: isDev, srcDir: path.join(this.$rapidfire.env.paths.root, 'src/nuxt/') })

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
