import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'

useStrict(true)

class Global {
  @observable mobile
  @observable register

  constructor() {
    this.mobile = ''
    this.register = false
  }

  @action.bound
  async isExist() {
    try {
      const { data } = await Axios.get('/api/isExist')
      runInAction(() => {
        this.mobile = data.data
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    }
  }

  @action.bound
  async isRegister(mobile) {
    try {
      await Axios.get(`/api/isRegister/${mobile}`)
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
}

export default new Global()
