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
  async getOrderInfo(orderId, wait) {
    try {
      status.setLoading(true)
      const { data } = await Axios.get(`/api/orders/${orderId}`, {
        params: {
          wait: wait
        }
      })
      runInAction(() => {
        if (Object.keys(data.data).length > 0) {
          this.order = data.data
          this.pending = false
        }
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    } finally {
      status.setLoading(false)
    }
  }

  @action.bound
  setPending(val) {
    console.log(val)
    this.pending = val
  }
}

export default new Auth()
