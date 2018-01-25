import React from 'react'
import styles from './Order.css'

const Order = props => {
  const { order, hasFooter } = props
  return (
    <div className={styles.order} key={order.orderId}>
      <div className={styles.hd}>
        <div className={styles.title}>
          <span className={styles.name}>
            <i className="iconfont icon-store" />门店：{order.store}
          </span>
          <span className={styles.state}>{order.orderStatus}</span>
        </div>
        <div className={styles.orderInfo}>
          <span>订单号：{order.orderId}</span>
          <span className={styles.time}>{order.completeTime}</span>
        </div>
      </div>
      <div className={styles.bd}>
        {order.items.map(item => (
          <div className={styles.item} key={item.itemId}>
            <div className={styles.itemHeader}>
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className={styles.itemBody}>
              <h4 className={styles.itemName}>{item.title}</h4>
              <p className={styles.number}>数量：{item.quantity}</p>
              <p className={styles.originalPrice}>原价：¥{item.originalPrice}</p>
              <p className={styles.discountPrice}>折扣价：¥{item.vipPrice}</p>
            </div>
          </div>
        ))}
      </div>
      {hasFooter ? (
        <div className={styles.ft}>
          <button type="button">详情</button>
          <button type="button">投诉</button>
        </div>
      ) : null}
    </div>
  )
}

export default Order
