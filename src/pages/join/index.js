import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'
import classNames from 'classnames'
import styles from './Join.css'

const MyForm = props => {
  const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        placeholder="Enter your email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.email && touched.email ? 'text-input error' : 'text-input'}
      />
      {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}

      <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  )
}

const JoinForm = withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!')
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
