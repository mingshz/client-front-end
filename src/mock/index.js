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

mock.onGet(/\/api\/user/).reply(
  200,
  Mock.mock({
    resCode: 200,
    resMsg: 'OK',
    data: {
      avatar: 'https://sfault-avatar.b0.upaiyun.com/885/222/885222425-582560bf7c6af_huge256',
      name: '@cfirst()先生',
      mobile: /^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/,
      balance: '@float(10000, 1000000, 2,2)',
      isMember: '@boolean',
      isRepresent: '@boolean'
    }
  })
)

mock.onGet(/\/api\/items/).reply(config => {
  if (config.params.itemType === 'HOT') {
    return [
      200,
      Mock.mock({
        resCode: 200,
        resMsg: 'OK',
        data: {
          pagination: {
            current: 1,
            total: 1,
            pageSize: 10
          },
          'list|10': [
            {
              itemId: '@id',
              thumbnail:
                'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/62871920/TB23sk4cwnH8KJjSspcXXb3QFXa_!!62871920.jpg_230x230.jpg',
              title: '@ctitle',
              address: '@county',
              type: '@pick(["洗车","餐饮","美容","维修"])',
              distance: '',
              vipPrice: function() {
                return (this.originalPrice - 999).toFixed(2)
              },
              originalPrice: '@float(1000, 2000, 2,2)'
            }
          ]
        }
      })
    ]
  } else {
    return [
      200,
      Mock.mock({
        resCode: 200,
        resMsg: 'OK',
        data: {
          pagination: {
            current: 1,
            total: 1,
            pageSize: 10
          },
          'list|10': [
            {
              itemId: '@id',
              thumbnail:
                'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/62871920/TB23sk4cwnH8KJjSspcXXb3QFXa_!!62871920.jpg_230x230.jpg',
              title: '收藏收藏收藏',
              address: '@county',
              type: '@pick(["洗车","餐饮","美容","维修"])',
              distance: '',
              vipPrice: function() {
                return (this.originalPrice - 999).toFixed(2)
              },
              originalPrice: '@float(1000, 2000, 2,2)'
            }
          ]
        }
      })
    ]
  }
})

mock.onGet(/\/api\/orders/).reply(
  200,
  Mock.mock({
    resCode: 200,
    resMsg: 'OK',
    data: {
      pagination: {
        current: 1,
        total: 1,
        pageSize: 10
      },
      'list|10': [
        {
          orderId: '@id',
          completeTime: '@datetime("yyyy-MM-dd H:m")',
          orderStatus: '已支付',
          orderStatusCode: 0,
          store: '@cword(3)店',
          payer: '@cfirst()先生',
          payerMobile: /^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/,
          'items|1-3': [
            {
              itemId: '@id',
              thumbnail: function() {
                let bgColor = Mock.Random.color()
                let fontcolor = Mock.Random.hex()
                let text = Mock.Random.character() + Mock.Random.cword()
                return Mock.Random.image('120x120', bgColor, fontcolor, text)
              },
              title: '全车内饰清洁赠车内空气净化套餐',
              quantity: '@integer(3, 20)',
              vipPrice: function() {
                return (this.originalPrice - 999).toFixed(2)
              },
              originalPrice: '@float(1000, 2000, 2,2)'
            }
          ]
        }
      ]
    }
  })
)
