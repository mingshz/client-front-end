import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from '../utils/request'
import { Toast } from 'antd-mobile'
import status from './status'

useStrict(true)

class Payment {
  @observable isPay = false
  @observable balance = 0

  @action.bound
  async payOrder(orderId) {
    try {
      status.setLoading(true)
      await Axios.put(`/payment/${orderId}`)
      runInAction(() => {
        this.isPay = true
      })
    } catch (err) {
      console.info(err.response)
      if (err.response.status === 401) {
        runInAction(() => {
          this.balance = err.response.data.data.balance
        })
      } else {
        Toast.fail('系统异常', 2)
      }
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
