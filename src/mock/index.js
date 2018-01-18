import Mock from 'mockjs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios)

mock.onGet(/\/api\/isExist/).reply(200, {
  resCode: 200,
  resMsg: 'OK',
  data: ''
})

mock.onGet(/\/api\/isRegister/).reply(417, Mock.mock({
  resCode: 200,
  resMsg: 'OK',
  data: ''
}))
