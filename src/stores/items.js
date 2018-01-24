import { action, useStrict } from 'mobx'
import Axios from 'axios'
import { Toast } from 'antd-mobile'

useStrict(true)

class Items {
  @action.bound
  getItems(params) {
    return new Promise((resolve, reject) => {
      Axios.get('/api/items', {
        params: params
      })
        .then(res => {
          console.log(res.data)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
          Toast.fail('系统异常', 2)
        })
    })
  }
}

export default new Items()
