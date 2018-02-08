import '../mock'
import Vip from '../stores/vip'

describe('会员中心页面测试', () => {
  it('修改登录状态', async () => {
    await Vip.getVipInfo()
    expect(Vip.qrCode).toBeDefined()
    expect(Vip.vipCard).toBeDefined()
  })

  it('获取订单详情', async () => {
    await Vip.getOrderInfo('1')
    expect(Vip.order).toHaveProperty('orderId')
    expect(Vip.order['items'].length).toBeGreaterThan(0)
  })
})
