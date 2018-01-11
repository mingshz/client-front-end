import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'
import classNames from 'classnames'
import styles from './Join.css'

const MyForm = props => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className={styles.formItem}>
        <label htmlFor="mobile">会员手机</label>
        <input
          id="mobile"
          placeholder="请输入您的手机号"
          type="text"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classNames({
            [styles.error]: errors.mobile && touched.mobile
          })}
        />
        {errors.mobile && touched.mobile && <span className={styles.inputError}>{errors.mobile}</span>}
      </div>
      <div className={styles.formItem}>
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
      <div className={styles.formItem}>
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
      <div className={styles.formItem}>
        <label htmlFor="gender">称谓</label>
        <input
          id="gender"
          placeholder="请输入您的姓氏"
          type="text"
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classNames({
            [styles.error]: errors.gender && touched.gender
          })}
        />
        {errors.gender && touched.gender && <span className={styles.inputError}>{errors.gender}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  )
}

const JoinForm = withFormik({
  mapPropsToValues: () => ({ mobile: '' }),
  validationSchema: Yup.object().shape({
    mobile: Yup.string()
      .matches(/^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/, '请输入正确的手机号')
      .required('请输入手机号')
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  },
  displayName: 'JoinForm' // helps with React DevTools
})(MyForm)

const JoinContent = props => {
  return (
    <div className={styles.main}>
      <div
        className={classNames(styles.header, {
          clearfix: true
        })}
      >
        <div className={styles.block} />
        <div className={styles.title}>
          <h4>加入锋尚来美VIP</h4>
        </div>
      </div>
      <div className={styles.body}>
        <JoinForm />
      </div>
    </div>
  )
}
export default JoinContent
