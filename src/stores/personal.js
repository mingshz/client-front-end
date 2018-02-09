import { observable, action, useStrict, runInAction } from 'mobx'
// import { Toast } from 'antd-mobile'
import Axios from '../utils/request'
import status from './status'

useStrict(true)

class Personal {
  @observable user = {}

  @action.bound
  async getUserInfo() {
    try {
      status.setLoading(true)
      const data = await Axios.get('/user')
      runInAction(() => {
        this.user = data
      })
    } catch (err) {
      console.log(err.response.status)
    } finally {
      status.setLoading(false)
    }
  }
}

export default new Personal()
