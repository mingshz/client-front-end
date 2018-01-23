import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'
import status from './status'

useStrict(true)

class Auth {
  @observable isLogin = false

  @action.bound
  async loginHandler(userInfo) {
    try {
      status.setLoading(true)
      await Axios.post('/api/auth', userInfo)
      runInAction(() => {
        this.isLogin = true
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    } finally {
      status.setLoading(false)
    }
  }
}

export default new Auth()
