import React, { Component } from 'react'
import { withFormik } from 'formik'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import styles from './Join.css'

const MyForm = props => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, isLogin } = props

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div
        className={classNames(styles.formItem, {
          [styles.error]: errors.mobile && touched.mobile
        })}
      >
        <label htmlFor="mobile">会员手机</label>
        <input
          id="mobile"
          placeholder="请输入您的手机号"
          type="text"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button type="button" className={styles.sendMsgBtn}>
          发送
        </button>
        {errors.mobile && touched.mobile && <span className={styles.inputError}>{errors.mobile}</span>}
      </div>
      <div
        className={classNames(styles.formItem, {
          [styles.error]: errors.authCode && touched.authCode
        })}
      >
        <label htmlFor="authCode">验证码</label>
        <input
          id="authCode"
          placeholder="请输入收到的验证码"
          type="text"
          value={values.authCode}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classNames({
            [styles.error]: errors.authCode && touched.authCode
          })}
        />
        {errors.authCode && touched.authCode && <span className={styles.inputError}>{errors.authCode}</span>}
      </div>
      {!isLogin ? (
        <div
          className={classNames(styles.formItem, {
            [styles.error]: errors.surname && touched.surname
          })}
        >
          <label htmlFor="surname">姓氏</label>
          <input
            id="surname"
            placeholder="请输入您的姓氏"
            type="text"
            value={values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classNames({
              [styles.error]: errors.surname && touched.surname
            })}
          />
          {errors.surname && touched.surname && <span className={styles.inputError}>{errors.surname}</span>}
        </div>
      ) : null}
      {!isLogin ? (
        <div className={styles.formItem}>
          <label htmlFor="gender">称谓</label>
          <select
            id="gender"
            placeholder="请输入您的姓氏"
            type="text"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="male">先生</option>
            <option value="female">女士</option>
          </select>
        </div>
      ) : null}
      {!isLogin ? (
        <div className={styles.extraTitle}>
          <h4>已收到会员卡的新VIP</h4>
        </div>
      ) : null}
      {!isLogin ? (
        <div className={styles.formItem}>
          <label htmlFor="cdKey">卡密</label>
          <input
            id="cdKey"
            placeholder="请输入卡背部的卡密"
            type="text"
            value={values.cdKey}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      ) : null}
      <div className={styles.submitButton}>
        <button type="submit" disabled={isSubmitting}>
          开启锋尚来美
        </button>
      </div>
    </form>
  )
}

const JoinForm = withFormik({
  mapPropsToValues: props => ({ mobile: '', authCode: '', surname: '', gender: 'male' }),
  validate: (values, props) => {
    let errors = {}
    if (!values.mobile) {
      errors.mobile = '请输入手机号'
    } else if (!/^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(values.mobile)) {
      errors.mobile = '请输入正确的手机号'
    }
    if (!values.authCode) {
      errors.authCode = '请输入验证码'
    }
    if (!props.isLogin) {
      if (!values.surname) {
        errors.surname = '请输入姓氏'
      } else if (values.surname.length > 5) {
        errors.surname = '请输入最多5位中文'
      } else if (!/^[\u4e00-\u9fa5]{0,}$/.test(values.surname)) {
        errors.surname = '请输入中文姓氏'
      }
    }
    return errors
  },
  handleSubmit: (values, { props, setSubmitting, setFieldError }) => {
    console.log(props)
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  },
  displayName: 'JoinForm'
})(MyForm)

@inject(({ global }) => ({
  isExist: global.isExist,
  mobile: global.mobile
}))
@observer
class JoinContent extends Component {
  componentDidMount() {
    this.props.isExist()
  }

  render() {
    const { mobile } = this.props
    return (
      <div className={classNames(styles.main, 'main')}>
        <div className={classNames(styles.header, 'clearfix')}>
          <div className={styles.block} />
          <div className={styles.title}>
            <h4>加入锋尚来美VIP</h4>
          </div>
        </div>
        <div className={styles.body}>
          <JoinForm isLogin={!!mobile} />
        </div>
      </div>
    )
  }
}
export default JoinContent
