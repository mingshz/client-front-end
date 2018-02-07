import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Order.css'

const Order = props => {
  const { order } = props
  let money = 0
  order.items.map(o => (money += o.vipPrice * 100))
  return (
    <Link to={`/orders/${order.orderId}`} className={styles.order}>
      <div className={styles.hd}>
        <img src={order.payerAvatar} alt={order.payer} />
      </div>
      <div className={styles.bd}>
        <div className={styles.header}>
          <span>{order.payer}</span>
          <span className={styles.status}>{order.orderStatusMsg}</span>
        </div>
        <div className={styles.info}>订单号：{order.orderId}</div>
        <div className={styles.info}>成交时间：{order.completeTime}</div>
        <div className={styles.footer}>
          <div className={styles.amount}>
            实付金额：<span className={styles.money}>¥{money / 100}</span>
          </div>
          <span className={styles.total}>共{order.items.length}件商品</span>
        </div>
      </div>
      <div className={styles.ft} />
    </Link>
  )
}

export default Order
