import axios from 'axios'
import history from './history'

const service = axios.create({
  // baseURL: '',
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    console.log(config)
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
    // 微信未授权
    if (error.response.status === 431) {
      const { origin, href } = window.location
      window.location.replace(`${origin}/api/auth?redirectUrl=${encodeURIComponent(href)}`)
    }
    if (error.response.status === 432) {
      history.push('/join')
    }
    return Promise.reject(error)
  }
)

export default service
