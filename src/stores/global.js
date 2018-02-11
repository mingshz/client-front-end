import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from '../utils/request'
import { Toast } from 'antd-mobile'

useStrict(true)

class Global {
  @observable mobile = ''
  @observable register = false

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
        // Toast.fail('系统异常', 2)
      }
    }
  }

  async sendAuthCode(mobile) {
    try {
      Toast.success('发送成功', 1)
      await Axios.get(`/sendAuthCode/${mobile}`)
    } catch (err) {
      // Toast.fail('系统异常', 2)
    }
  }

  async sysInit() {
    try {
      const data = await Axios.get('/init')
      for (let init in data) {
        localStorage.setItem(init, data[init])
      }
    } catch (err) {
      // Toast.fail('系统异常', 2)
    }
  }
}

export default new Global()
