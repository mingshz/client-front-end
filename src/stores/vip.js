import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'
import status from './status'

useStrict(true)

class Auth {
  @observable qrCode = ''
  @observable vipCard = ''
  @observable orderId = ''
  @observable pending = true
  @observable order = {}

  @action.bound
  async getVipInfo() {
    try {
      status.setLoading(true)
      const { data, config } = await Axios.get('/api/user/vipCard')
      console.log(config.headers)
      runInAction(() => {
        this.qrCode = data.data.qrCode
        this.vipCard = data.data.vipCard
        // this.orderId = config.headers['X-Order-Id']
        this.orderId = data.data.orderId
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    } finally {
      status.setLoading(false)
    }
  }

  @action.bound
  async getOrderInfo(orderId) {
    console.log(orderId)
    try {
      status.setLoading(true)
      const { data } = await Axios.get(`/api/orders/${orderId}`)
      runInAction(() => {
        this.order = data.data
        console.log(data.data)
        this.pending = false
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    } finally {
      status.setLoading(false)
    }
  }
}

export default new Auth()
