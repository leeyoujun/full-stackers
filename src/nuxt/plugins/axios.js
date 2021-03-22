import qs from 'qs'

export default function (context) {
  const { $axios } = context

  $axios.defaults.paramsSerializer = params => qs.stringify(params, { extend: true })

  $axios.interceptors.request.use(options => {
    if (process.server) {
      options.baseURL = 'http://127.0.0.1:8000'
    } else {
      // 클라우드 환경을 위하여 브라우저 환경에서 자동으로 설정되도록 수정
      //   * baseURL이 설정되어있어도 URL에 호스트명이 포함되어있으면 무시되므로
      //   * 모든 요청에 대해 별다른 처리 없이 baseURL을 상대경로로 설정될 수 있도록 함
      options.baseURL = `${window.location.protocol}//${window.location.host}`
    }

    return Promise.resolve(options)
  })
}
