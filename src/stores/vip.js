import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from '../utils/request'
// import { Toast } from 'antd-mobile'
import status from './status'
import history from '../utils/history'

useStrict(true)

class Auth {
  @observable order = {}
  @observable vipInfo = {}

  @action.bound
  async getVipInfo() {
    try {
      status.setLoading(true)
      const data = await Axios.get('/user/vipCard')
      runInAction(() => {
        this.vipInfo = data
      })
    } catch (err) {
      console.log(err.response.status)
    } finally {
      status.setLoading(false)
    }
  }

  @action.bound
  async getOrderInfo(orderId, isRefresh) {
    try {
      status.setLoading(true)
      const data = await Axios.get(`/orders/${orderId}`)
      runInAction(() => {
        if (data.orderStatusCode !== 0) {
          this.order = data
          if (!isRefresh) {
            history.push('/payment')
          }
        }
      })
    } catch (err) {
      console.log(err.response.status)
    } finally {
      status.setLoading(false)
    }
  }
}

export default new Auth()
