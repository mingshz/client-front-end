import React, { Component } from 'react'
import { createForm } from 'rc-form'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import styles from './Join.css'

// const JoinForm = withFormik({
//   mapPropsToValues: props => ({ mobile: '', authCode: '', surname: '', gender: 'male' }),
//   validate: (values, props) => {
//     let errors = {}
//     if (!values.mobile) {
//       errors.mobile = '请输入手机号'
//     } else if (!/^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(values.mobile)) {
//       errors.mobile = '请输入正确的手机号'
//     }
//     if (!values.authCode) {
//       errors.authCode = '请输入验证码'
//     }
//     if (!props.isLogin) {
//       if (!values.surname) {
//         errors.surname = '请输入姓氏'
//       } else if (values.surname.length > 5) {
//         errors.surname = '请输入最多5位中文'
//       } else if (!/^[\u4e00-\u9fa5]{0,}$/.test(values.surname)) {
//         errors.surname = '请输入中文姓氏'
//       }
//     }
//     return errors
//   },
//   handleSubmit: (values, { props, setSubmitting, setFieldError }) => {
//     console.log(props)
//     setTimeout(() => {
//       alert(JSON.stringify(values, null, 2))
//       setSubmitting(false)
//     }, 1000)
//   },
//   displayName: 'JoinForm'
// })(MyForm)

@inject(({ global }) => ({
  isExist: global.isExist,
  mobile: global.mobile
}))
@observer
class JoinContent extends Component {
  componentDidMount() {
    this.props.isExist()
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value)
    })
  }

  render() {
    let errors
    const { mobile } = this.props
    const { getFieldProps, getFieldError } = this.props.form

    return (
      <div className={classNames(styles.main, 'main')}>
        <div className={classNames(styles.header, 'clearfix')}>
          <div className={styles.block} />
          <div className={styles.title}>
            <h4>加入锋尚来美VIP</h4>
          </div>
        </div>
        <div className={styles.body}>
          <form autoComplete="off">
            <div
              className={classNames(styles.formItem, {
                [styles.error]: false
              })}
            >
              <label>会员手机</label>
              <input
                {...getFieldProps('mobile', {
                  rules: [{ required: true, message: '请输入手机号' }]
                })}
                placeholder="请输入您的手机号"
              />
              {(errors = getFieldError('required')) ? errors.join(',') : null}
              <button type="button" className={styles.sendMsgBtn}>
                发送
              </button>
            </div>
            <div className={styles.submitButton}>
              <button type="button" onClick={this.submit}>
                开启锋尚来美
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default createForm()(JoinContent)
