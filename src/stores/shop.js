import { observable, action, useStrict, toJS, extendObservable } from 'mobx'

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
  async submitOrders() {
    if (!this.total) return
    console.log(toJS(this.orders))
  }
}

export default new Shop()
