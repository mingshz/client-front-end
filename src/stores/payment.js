import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'
import status from './status'

useStrict(true)

class Payment {
  @observable isPay = false

  @action.bound
  async payOrder(orderId) {
    try {
      status.setLoading(true)
      const { data } = await Axios.put('/api/payment', { orderId: orderId })
      console.log(data)
      runInAction(() => {
        this.isPay = true
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    } finally {
      status.setLoading(false)
    }
  }

  @action.bound
  setIsPay(val) {
    this.isPay = val
  }
}

export default new Payment()
