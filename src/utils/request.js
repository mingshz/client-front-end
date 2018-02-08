import axios from 'axios'
import history from './history'

const service = axios.create({
  // baseURL: '',
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log(error.response.status)
    // 微信未授权
    if (error.response.status === 431) {
      const { origin, href } = window.location
      window.location.replace(`${origin}/auth?redirectUrl=${encodeURIComponent(href)}`)
      return
    }
    // 未注册
    if (error.response.status === 433) {
      history.push('/join')
      return
    }
    if (error.response.status === 500) {
      history.push(`/error/${error.response.status}`)
    }
    return Promise.reject(error)
  }
)

export default service
