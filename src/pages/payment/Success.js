import React from 'react'
import styles from './Payment.css'

const Success = props => {
  return (
    <div className={styles.wrap}>
      <div className={styles.resultIcon}>
        <i className="iconfont icon-success" />
      </div>
      <p className={styles.resultMsg}>支付成功</p>
      <p className={styles.successSec}>
        <span>3s</span>&nbsp;后跳转到订单页面
      </p>
    </div>
  )
}

export default Success
