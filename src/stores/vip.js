import { observable, action, useStrict, runInAction } from 'mobx'
import Axios from '../utils/request'
import { Toast } from 'antd-mobile'
import status from './status'
import history from '../utils/history'

useStrict(true)

class Auth {
  @observable qrCode = ''
  @observable vipCard = ''
  @observable order = {}

  @action.bound
  async getVipInfo() {
    try {
      status.setLoading(true)
      const data = await Axios.get('/user/vipCard')
      runInAction(() => {
        this.qrCode = data.qrCode
        this.vipCard = data.vipCard
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
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
        if (Object.keys(data).length > 0) {
          this.order = data
          if (!isRefresh) {
            history.push('/payment')
          }
        }
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    } finally {
      status.setLoading(false)
    }
  }
}

export default new Auth()
