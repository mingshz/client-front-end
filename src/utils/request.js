import axios from 'axios'
import { Toast } from 'antd-mobile'

import history from './history'

const errorCode = [403, 500]
const noMsg = [402, 403, 431, 432, 500]
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
    }
    // 未注册
    if (error.response.status === 432) {
      history.push('/join')
    }
    if (errorCode.indexOf(error.response.status) !== -1) {
      history.push(`/error/${error.response.status}`)
    }
    if (noMsg.indexOf(error.response.status) === -1) {
      console.log(error.response)
      Toast.fail('系统异常', 2)
    }
    return Promise.reject(error)
  }
)

export default service
