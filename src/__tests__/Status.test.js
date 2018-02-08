import Status from '../stores/status'

describe('状态修改', () => {
  it('修改登录状态', () => {
    Status.setLoading(true)
    expect(Status.loading).toBeTruthy()
  })
  it('修改提交状态', () => {
    Status.setSubmitting(true)
    expect(Status.submitting).toBeTruthy()
  })
  it('修改刷新状态', () => {
    Status.setRefreshing(true)
    expect(Status.refreshing).toBeTruthy()
  })
})
