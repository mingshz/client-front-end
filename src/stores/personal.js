import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'

useStrict(true)

class Personal {
  @observable user = {}

  @action.bound
  async getUserInfo() {
    try {
      const { data } = await Axios.get('/api/user')
      runInAction(() => {
        this.user = data.data
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    }
  }
}

export default new Personal()
