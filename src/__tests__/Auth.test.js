import '../mock'
import Auth from '../stores/auth'

describe('注册登录页面', () => {
  it('尝试登录失败', async () => {
    await Auth.loginHandler({ mobile: '15670007176' }).catch(error => {
      expect(error).toThrow()
    })
  })
})
