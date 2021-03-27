import qs from 'qs'

let port = 8000

try {
  const { port: _port } = require('../../.config.js')
  port = _port
} catch {
  const cmdParams = process.argv.filter(arg => arg.startsWith('--')).map(arg => arg.replace(/^--/, ''))

  const { 'service-port': cmdPort } = cmdParams.reduce((acc, param) => {
    const [key, val] = param.split('=')
    return Object.assign(acc, { [`${key}`]: val })
  }, {})

  port = process.env.FULLSTACKER_SERVICE_PORT || cmdPort
}

export default function (context) {
  const { $axios } = context

  $axios.defaults.paramsSerializer = params => qs.stringify(params, { extend: true })

  $axios.interceptors.request.use(options => {
    if (process.server) {
      options.baseURL = `http://127.0.0.1:${port}`
    } else {
      // 클라우드 환경을 위하여 브라우저 환경에서 자동으로 설정되도록 수정
      //   * baseURL이 설정되어있어도 URL에 호스트명이 포함되어있으면 무시되므로
      //   * 모든 요청에 대해 별다른 처리 없이 baseURL을 상대경로로 설정될 수 있도록 함
      options.baseURL = `${window.location.protocol}//${window.location.host}`
    }

    return Promise.resolve(options)
  })
}
