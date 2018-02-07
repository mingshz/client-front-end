import { observable, action, useStrict, runInAction } from 'mobx'
import { Toast } from 'antd-mobile'
import Axios from '../utils/request'

useStrict(true)

class Item {
  @observable itemDetail = {}

  @action.bound
  async getItemById(itemId) {
    try {
      const data = await Axios.get(`/items/${itemId}`)
      console.log(data)
      runInAction(() => {
        this.itemDetail = data
      })
    } catch (err) {
      Toast.fail('系统异常', 2)
    }
  }
}

export default new Item()
