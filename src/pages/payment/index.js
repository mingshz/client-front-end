import React from 'react'
import styles from './Payment.css'
import List from '../../components/paymentList'

const Payment = props => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>即将支付以下订单：</div>
      <div className={styles.body}>
        <List />
        <List />
      </div>
      <div className={styles.footer}>
        <button type="button">确认支付&nbsp;<span>¥3000.00</span></button>
      </div>
    </div>
  )
}

export default Payment
