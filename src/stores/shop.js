import { observable, action, useStrict, toJS, extendObservable, runInAction } from 'mobx'
import Axios from '../utils/request'
import { Toast } from 'antd-mobile'
import status from './status'
import history from '../utils/history'

useStrict(true)

class Shop {
  @observable easyOrders = {}
  @observable orders = []
  @observable total = 0
  @observable order = {}

  @action.bound
  minusItem(data) {
    const { itemId: id } = data
    if (this.easyOrders[id]) {
      this.easyOrders[id].num--
    } else {
      console.log('The items not in this order!')
    }
    this.renderOrders()
  }

  @action.bound
  addItem(data) {
    const { itemId: id, title: name, vipPrice: price } = data
    if (this.easyOrders[id]) {
      this.easyOrders[id].num++
    } else {
      extendObservable(this.easyOrders, {
        [id]: {
          num: 1,
          name: name,
          price: price
        }
      })
    }
    this.renderOrders()
  }

  @action.bound
  renderOrders() {
    let arr = []
    for (let order in this.easyOrders) {
      if (this.easyOrders[order].num > 0) {
        arr.push({
          storeItemId: order,
          num: this.easyOrders[order].num
        })
      }
    }
    this.orders.replace(arr)
    this.renderTotal()
  }

  @action.bound
  renderTotal() {
    this.total = toJS(this.orders).length
  }

  @action.bound
  async submitOrders(orderId) {
    if (!this.total) return
    Toast.loading('提交中', 30)
    try {
      await Axios.post('/order', {
        orderId: orderId,
        items: toJS(this.orders)
      })
      Toast.hide()
      history.push('/store/orders/all')
      runInAction(() => {
        this.easyOrders = {}
        this.orders = []
        this.total = 0
      })
    } catch (err) {
      console.log(err)
    }
  }

  @action.bound
  async getOrderById(orderId) {
    try {
      status.setLoading(true)
      const data = await Axios.get(`/orders/${orderId}`)
      runInAction(() => {
        if (Object.keys(data).length > 0) {
          this.order = data
        }
      })
    } catch (err) {
      console.log(err.response.status)
    } finally {
      status.setLoading(false)
    }
  }
}

export default new Shop()
