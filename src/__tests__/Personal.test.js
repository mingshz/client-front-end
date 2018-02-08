import '../mock'
import Personal from '../stores/personal'

describe('个人中心页面', () => {
  it('未授权', async () => {
    await Personal.getUserInfo().catch(error => {
      expect(error).toThrow()
    })
  })
})
