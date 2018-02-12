import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from '../utils/request'
// import { Toast } from 'antd-mobile'
import status from './status'
import history from '../utils/history'

useStrict(true)

class Payment {
  @observable balance = 0
  @observable timestamp = ''

  @action.bound
  async payOrder(orderId) {
    try {
      status.setLoading(true)
      await Axios.put(`/capital/payment/${orderId}`)
      runInAction(() => {
        history.replace('/success')
      })
    } catch (err) {
      console.info(err.response)
      if (err.response.status === 402) {
        runInAction(() => {
          this.balance = err.response.data
          this.timestamp = +new Date()
        })
      } else {
        console.log(err.response.status)
      }
    } finally {
      status.setLoading(false)
    }
  }
}

export default new Payment()
