const _get = require('lodash/get')

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

  /* ***************************************
   * Request Validate Function
   * ************************************* */
  async validate({ params = {}, expressions = [] }) {
    const validation = {}

    for (const expression of expressions) {
      const { key, type, fn } = expression
      const value = _get(params, key)
      const checker = type === 'fn' ? fn : this[`${type}Check`]

      if (checker instanceof Function) Object.assign(validation, await checker({ ...expression, params, value }))
      else Object.assign(validation, { status: 501, message: `유효성 검사방식이 지정되지 않았거나 구현되지 않은 방식입니다.: "${type}"` })

      if (validation.status) break
    }

    return validation
  }

  requiredCheck({ key, value }) {
    if (value == 0 || value) return
    return { status: 400, message: `필수 값이 누락되었습니다.: ${key}` }
  }

  numberCheck({ key, value }) {
    if (value != null && !isNaN(value)) return Number(value)
    return { status: 400, message: `"${key}" 값은 숫자만 허용됩니다.: ${value}` }
  }

  enumCheck({ key, value, enums = [] }) {
    if (enums.includes(value)) return

    return {
      status: 400,
      message: `"${value}" 값은 "${key}" 값으로 허용되지 않은 값입니다.: ${enums.join(', ')} 중 하나만 허용됩니다.`,
    }
  }

  kebabCaseCheck({ key, value }) {
    const isValid = /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(value)
    if (isValid) return

    return { status: 400, message: `"${key}" 값의 형식이 올바르지 않습니다.: ${value}` }
  }

  lowerCamelCaseCheck({ key, value }) {
    const isValid = /^[a-z][a-zA-Z0-9]+$/.test(value)
    if (isValid) return

    return { status: 400, message: `"${key}" 값의 형식이 올바르지 않습니다.: ${value}` }
  }

  snakeCaseCheck({ key, value }) {
    const isValid = /^([a-z][a-z0-9]*)(_[a-z0-9]+)*$/.test(value)
    if (isValid) return

    return { status: 400, message: `"${key}" 값의 형식이 올바르지 않습니다.: ${value}` }
  }

  UpperCamelCaseCheck({ key, value }) {
    const isValid = /^[A-Z][a-zA-Z0-9]+$/.test(value)
    if (isValid) return

    return { status: 400, message: `"${key}" 값의 형식이 올바르지 않습니다.: ${value}` }
  }
}

module.exports = Controller
