import { observable, action, useStrict, runInAction } from 'mobx'
import { Toast } from 'antd-mobile'
import Axios from '../utils/request'

useStrict(true)

class Personal {
  @observable user = {}

  @action.bound
  async getUserInfo() {
    try {
      const { data } = await Axios.get('/user')
      runInAction(() => {
        this.user = data
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    }
  }
}

export default new Personal()
