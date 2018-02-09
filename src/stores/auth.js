import { action, useStrict } from 'mobx'
// import { Toast } from 'antd-mobile'
import status from './status'
import Axios from '../utils/request'
import history from '../utils/history'

useStrict(true)

class Auth {
  @action.bound
  async loginHandler(userInfo) {
    try {
      status.setLoading(true)
      await Axios.post('/auth', userInfo)
      history.push('/personal')
    } catch (err) {
      console.log(err.response.status)
    } finally {
      status.setLoading(false)
    }
  }
}

export default new Auth()
