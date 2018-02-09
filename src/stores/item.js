import { observable, action, useStrict, runInAction } from 'mobx'
// import { Toast } from 'antd-mobile'
import Axios from '../utils/request'

useStrict(true)

class Item {
  @observable itemDetail = {}

  @action.bound
  async getItemById(itemId) {
    try {
      const data = await Axios.get(`/items/${itemId}`)
      runInAction(() => {
        this.itemDetail = data
      })
    } catch (err) {
      console.log(err.response.status)
    }
  }
}

export default new Item()
