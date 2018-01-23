import Mock from 'mockjs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios)

mock.onGet(/\/api\/isExist/).reply(200, {
  resCode: 200,
  resMsg: 'OK',
  data: '15670001464'
})

mock.onGet(/\/api\/isRegister/).reply(
  417,
  Mock.mock({
    resCode: 200,
    resMsg: 'OK',
    data: ''
  })
)

mock.onGet(/\/api\/sendAuthCode/).reply(
  200,
  Mock.mock({
    resCode: 200,
    resMsg: 'OK',
    data: ''
  })
)

mock.onPost(/\/api\/auth/).reply(config => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (Math.random() > 0.5) {
        resolve([200, { id: 4, name: 'foo' }])
      } else {
        resolve([500, { success: false }])
      }
    }, 1000)
  })
})
