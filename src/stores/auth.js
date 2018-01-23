import { action, useStrict } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'
import status from './status'

useStrict(true)

class Auth {
  //   @action.bound
  //   async login(userInfo) {
  //     try {
  //       status.setLoading(true)
  //       await Axios.post('/api/auth', userInfo)
  //     } catch (err) {
  //       Toast.fail('系统异常', 2)
  //     } finally {
  //       status.setLoading(false)
  //     }
  //   }
  @action.bound
  asyncLogin(userInfo) {
    status.setLoading(true)
    return new Promise((resolve, reject) => {
      Axios.post('/api/auth', userInfo)
        .then(() => {
          resolve()
          status.setLoading(false)
        })
        .catch(err => {
          Toast.fail('系统异常', 2)
          status.setLoading(false)
        })
    })
  }
}

export default new Auth()
