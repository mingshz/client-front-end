import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'

useStrict(true)

class Global {
  @observable mobile = ''
  @observable register = false
  @observable authCode = ''

  @action.bound
  async isRegister(mobile) {
    try {
      await Axios.get(`/isRegister/${mobile}`)
      runInAction(() => {
        this.register = false
      })
    } catch (err) {
      if (err.response.status === 417) {
        runInAction(() => {
          this.register = true
        })
      } else {
        Toast.fail('系统异常', 2)
      }
    }
  }

  @action.bound
  async sendAuthCode(mobile) {
    try {
      Toast.success('发送成功', 1)
      await Axios.get(`/sendAuthCode/${mobile}`)
    } catch (err) {
      Toast.fail('系统异常', 2)
    }
  }
}

export default new Global()
