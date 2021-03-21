const {
  Interfaces: { Service: RapidfireService },
} = require('@luasenvy/rapidfire')

class Service extends RapidfireService {
  constructor() {
    super()
  }

  toKebabCase({ content }) {
    return content.replace(/(?!^[A-Z])([A-Z])/g, '-$1').toLowerCase()
  }
}

module.exports = Service
