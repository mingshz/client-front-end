import { observable, action, useStrict, toJS, extendObservable, runInAction } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'
import history from '../utils/history'

useStrict(true)

class Shop {
  @observable easyOrders = {}
  @observable orders = []
  @observable total = 0

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
      await Axios.post('/api/order', {
        orderId: orderId,
        items: toJS(this.orders)
      })
      Toast.hide()
      history.push('/orders')
      runInAction(() => {
        this.easyOrders = {}
        this.orders = []
        this.total = 0
      })
    } catch (err) {
      console.log(err)
      Toast.fail('系统异常', 2)
    }
  }
}

export default new Shop()
