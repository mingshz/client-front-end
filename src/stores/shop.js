import { observable, action, useStrict } from 'mobx'

useStrict(true)

class Shop {
  @observable orders = []
  @observable easyOrders = {}
  //
  @action.bound
  minusItem(id, num) {
    num = num || 1
    console.log('Minus: ' + id)
    // let index = Object.keys(this.easyOrders).indexOf(id)
    // if (index === -1) {
    //   console.log('The items not in this order!')
    // } else {
    //   this.easyOrders.id = this.easyOrders.id - num
    // }
  }

  @action.bound
  addItem(id, num) {
    num = num || 1
    console.log('Add: ' + id)
    // let index = Object.keys(this.easyOrders).indexOf(id)
    // if (index === -1) {
    //   this.easyOrders.push({
    //     id: num
    //   })
    // } else {
    //   this.easyOrders.id = this.easyOrders.id + num
    // }
  }
}

export default new Shop()
