import React, { Component } from 'react'
import { createForm } from 'rc-form'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'
import { Icon } from 'antd-mobile'
import styles from './Join.css'

@withRouter
@inject(({ global, status, auth }) => ({
  isExist: global.isExist,
  sendAuthCode: global.sendAuthCode,
  mobile: global.mobile,
  loading: status.loading,
  login: auth.asyncLogin
}))
@observer
class JoinContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDisabled: true,
      buttonText: '发送'
    }
  }

  componentDidMount() {
    this.props.isExist()
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (error) return
      this.props.login(value).then(() => {
        this.props.history.push('/')
      })
    })
  }

  sendAuthMsg = () => {
    const mobile = this.props.form.getFieldValue('mobile')
    this.props.sendAuthCode(mobile)
    this.setState({
      isDisabled: true
    })
    this.countDown()
  }

  countDown = () => {
    let time = 60
    let t = setInterval(() => {
      this.setState({
        buttonText: `${time--}s`
      })
      if (time === -1) {
        clearInterval(t)
        this.setState({
          isDisabled: false,
          buttonText: '发送'
        })
      }
    }, 1000)
  }

  isCanSend = e => {
    if (/^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(e.target.value)) {
      this.setState({
        isDisabled: false
      })
    } else {
      this.setState({
        isDisabled: true
      })
    }
  }
  validateMobile = (rule, value, callback) => {
    const form = this.props.form
    if (!/^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(form.getFieldValue('mobile'))) {
      callback('请输入正确的手机号')
    } else {
      callback()
    }
  }
  validateSurname = (rule, value, callback) => {
    const form = this.props.form
    if (!/^[\u4e00-\u9fa5]{0,}$/.test(form.getFieldValue('surname'))) {
      callback('请输入中文姓氏')
    } else {
      callback()
    }
  }
  render() {
    const { isDisabled, buttonText } = this.state
    const { mobile, loading } = this.props
    const { getFieldProps, getFieldError } = this.props.form

    const mobileProps = getFieldProps('mobile', {
      initialValue: '',
      validateFirst: true,
      onChange: this.isCanSend,
      validateTrigger: ['onBlur', 'onChange'],
      rules: [{ required: true, message: '请输入手机号' }, { validator: this.validateMobile }]
    })

    const authCodeProps = getFieldProps('authCode', {
      initialValue: '',
      validateFirst: true,
      validateTrigger: ['onBlur', 'onChange'],
      rules: [{ required: true, message: '请输入验证码' }]
    })

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
                [styles.error]: !!getFieldError('mobile')
              })}
            >
              <label>会员手机</label>
              <input {...mobileProps} placeholder="请输入您的手机号" type="tel" />
              <button type="button" className={styles.sendMsgBtn} disabled={isDisabled} onClick={this.sendAuthMsg}>
                {buttonText}
              </button>
              {getFieldError('mobile') ? <span className={styles.inputError}>{getFieldError('mobile')}</span> : null}
            </div>
            <div
              className={classNames(styles.formItem, {
                [styles.error]: !!getFieldError('authCode')
              })}
            >
              <label>验证码</label>
              <input {...authCodeProps} placeholder="请输入收到的验证码" type="tel" />
              {getFieldError('authCode') ? (
                <span className={styles.inputError}>{getFieldError('authCode')}</span>
              ) : null}
            </div>
            {!mobile ? (
              <div
                className={classNames(styles.formItem, {
                  [styles.error]: !!getFieldError('surname')
                })}
              >
                <label>姓氏</label>
                <input
                  {...getFieldProps('surname', {
                    initialValue: '',
                    validateFirst: true,
                    validateTrigger: ['onBlur', 'onChange'],
                    rules: [
                      { required: true, message: '请输入姓氏' },
                      { max: 5, message: '请输入最多5位中文' },
                      { validator: this.validateSurname }
                    ]
                  })}
                  id="surname"
                  placeholder="请输入您的姓氏"
                  type="text"
                />
                {getFieldError('surname') ? (
                  <span className={styles.inputError}>{getFieldError('surname')}</span>
                ) : null}
              </div>
            ) : null}
            {!mobile ? (
              <div className={styles.formItem}>
                <label>称谓</label>
                <select
                  {...getFieldProps('gender', {
                    initialValue: 'male'
                  })}
                  placeholder="请输入您的姓氏"
                  type="text"
                >
                  <option value="male">先生</option>
                  <option value="female">女士</option>
                </select>
              </div>
            ) : null}
            {!mobile ? (
              <div className={styles.extraTitle}>
                <h4>已收到会员卡的新VIP</h4>
              </div>
            ) : null}
            {!mobile ? (
              <div className={styles.formItem}>
                <label>卡密</label>
                <input
                  {...getFieldProps('cdKey', {
                    initialValue: ''
                  })}
                  placeholder="请输入卡背部的卡密"
                  type="text"
                />
              </div>
            ) : null}
            <div className={styles.submitButton}>
              <button type="button" onClick={this.submit} disabled={loading}>
                {!loading ? <Icon type="loading" size="xs" /> : null}
                <span>开启锋尚来美</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default createForm()(JoinContent)
