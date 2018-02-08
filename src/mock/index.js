import Mock from 'mockjs'
import axios from '../utils/request'
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios, { delayResponse: 500 })

mock.onGet(/\/isRegister/).reply(
  200,
  Mock.mock({
    resCode: 200,
    resMsg: 'OK',
    data: ''
  })
)

mock.onGet(/\/sendAuthCode/).reply(200, {})

mock.onPost(/\/auth/).reply(401, {})

mock.onGet(/\/user$/).reply(431, {
  balance: 0,
  wxNickName: 'Neo Chang',
  mobile: '15670007176',
  name: '常先生',
  id: 5,
  avatar:
    'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epm89OQtZt24aicSgu2ccE7Z3HEjML7WbstGUgF0EkGVI0uLeMRqbmBIa8RmaUsGsqpTLN26sTbemw/132',
  storeId: '',
  guidable: false,
  enabled: true
})

mock.onGet(/\/items$/).reply(config => {
  if (config.params.itemType === 'HOT') {
    return [
      200,
      Mock.mock({
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
              return Number((this.originalPrice - 999).toFixed(2))
            },
            originalPrice: '@float(1000, 2000, 2,2)'
          }
        ]
      })
    ]
  } else {
    return [
      200,
      Mock.mock({
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
            title: '@ctitle()收藏',
            address: '@county',
            type: '@pick(["洗车","餐饮","美容","维修"])',
            distance: '',
            vipPrice: function() {
              return Number((this.originalPrice - 999).toFixed(2))
            },
            originalPrice: '@float(1000, 2000, 2,2)'
          }
        ]
      })
    ]
  }
})

mock.onGet(/\/orders$/).reply(
  200,
  Mock.mock({
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10
    },
    'list|10': [
      {
        orderId: '@id',
        completeTime: '@datetime("yyyy-MM-dd H:m")',
        orderStatus: '@pick(["success", "forPay"])',
        orderStatusMsg: function() {
          if (this.orderStatus === 'success') {
            return '已完成'
          }
          if (this.orderStatus === 'forPay') {
            return '待付款'
          }
        },
        store: '@cword(3)店',
        payer: '@cfirst()先生',
        payerAvatar:
          'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epm89OQtZt24aicSgu2ccE7Z3HEjML7WbstGUgF0EkGVI0uLeMRqbmBIa8RmaUsGsqpTLN26sTbemw/132',
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
              return Number((this.originalPrice - 999).toFixed(2))
            },
            originalPrice: '@float(1000, 2000, 2,2)'
          }
        ]
      }
    ]
  })
)

mock.onGet(/\/capital\/flow/).reply(
  200,
  Mock.mock({
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10
    },
    'list|10': [
      {
        time: '@datetime("yyyy-MM-dd H:m")',
        title: function() {
          if (this.type) {
            return '微信充值'
          } else {
            return Mock.Random.cword(3, 6) + '消费'
          }
        },
        sum: '@float(100, 9000, 2,2)',
        type: '@pick([0,1])',
        orderId: function() {
          if (this.type) {
            return ''
          } else {
            return Mock.Random.id()
          }
        }
      }
    ]
  })
)

mock.onGet(/\/user\/vipCard/).reply(
  200,
  Mock.mock({
    orderId: '@id',
    qrCode: 'http://image-1252688601.cossh.myqcloud.com/qrCode.jpg',
    vipCard: function() {
      return (
        Mock.Random.integer(999, 9999).toString() +
        Mock.Random.integer(999, 9999).toString() +
        Mock.Random.integer(999, 9999).toString() +
        Mock.Random.integer(999, 9999).toString() +
        Mock.Random.integer(999, 9999).toString()
      )
    }
  })
)

mock.onGet(/\/orders\/(.*)/).reply(
  200,
  Mock.mock({
    orderId: '@id',
    orderStatus: '@pick(["success", "forPay"])',
    orderStatusMsg: function() {
      if (this.orderStatus === 'success') {
        return '已完成'
      }
      if (this.orderStatus === 'forPay') {
        return '待付款'
      }
    },
    'items|1-5': [
      {
        itemId: '@id',
        thumbnail:
          'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/62871920/TB23sk4cwnH8KJjSspcXXb3QFXa_!!62871920.jpg_230x230.jpg',
        title: '@ctitle(5,10)',
        quantity: '@integer(3, 20)',
        amount: '@float(1000, 2000, 2,2)'
      }
    ]
  })
)

mock.onPut(/\/payment\/(.*)/).reply(config => {
  if (Math.random() > 0.1) {
    return [200, {}]
  } else {
    return [
      402,
      Mock.mock({
        balance: '@float(100, 20000, 2,2)'
      })
    ]
  }
})

mock.onPost(/\/order/).reply(200, {})

mock.onGet(/\/items\/(.*)/).reply(
  200,
  Mock.mock({
    itemId: '@id',
    thumbnail: 'http://image-1252688601.cossh.myqcloud.com/item.png',
    title: '@ctitle(20)',
    address: '@county(true)',
    tel: '0571-11112222',
    type: '洗车',
    distance: 1000,
    vipPrice: '@float(200, 900, 2,2)',
    originalPrice: '@float(1000, 2000, 2,2)',
    details:
      '<img src="https://img.alicdn.com/imgextra/i4/55285307/TB2oyE9h0fJ8KJjy0FeXXXKEXXa_!!55285307.jpg" alt="xxx" /><p>这个分不差饭随爱豆饭随爱豆发大水发大水发大水佛挡杀佛大厦发送发送。发大水发送，发大水啥都。</p><img src="http://image-1252688601.cossh.myqcloud.com/item.png" alt="item" />'
  })
)
