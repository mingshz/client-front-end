import { observable, action, useStrict, computed } from 'mobx'

useStrict(true)

class Test {
  @observable num = 8

  @computed
  get price() {
    return this.num * 100
  }

  @computed
  get total() {
    return this.price + 100
  }

  @action.bound
  handleClick = () => {
    this.num = Math.random()
    console.log(this.price)
  }
}

export default new Test()
