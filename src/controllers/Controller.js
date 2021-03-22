const _ = require('lodash')

const {
  Interfaces: { Controller: _Controller },
} = require('@luasenvy/rapidfire')

class Controller extends _Controller {
  constructor() {
    super()
  }

  requiredValue({ value }) {
    return value !== 0 && !value
  }

  enumValue({ enums = [], value }) {
    return !enums.includes(value)
  }

  async validator({ params = {}, expressions = [] }) {
    const validation = {}

    for (const { key, type, enums = [], fn } of expressions) {
      const value = _.get(params, key)
      if (type === 'required') {
        if (this.requiredValue({ value })) return Object.assign(validation, { status: 400, message: `필수 값이 누락되었습니다.: ${key}` })
      } else if (type === 'enum') {
        if (this.enumValue({ enums, value }))
          return Object.assign(validation, {
            status: 400,
            message: `"${value}" 값은 "${key}" 값으로 허용되지 않은 값입니다.: ${enums.join(', ')} 중 하나만 허용됩니다.`,
          })
      } else if (type === 'fn') {
        if (fn instanceof Function) {
          const result = await fn({ value })
          const { status, message } = result || {}

          if (status) return Object.assign(validation, { status, message })
        } else {
          throw new Error(`유효성 검사에서 "fn" 형식은 반드시 "Function" 유형이어야 합니다.
            fn: ${fn}
          `)
        }
      }
    }

    return validation
  }
}

module.exports = Controller
