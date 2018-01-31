import React from 'react'
import classNames from 'classnames'
import styles from './Cart.css'

const Cart = props => {
  return (
    <div className={styles.cart}>
      <div
        className={classNames(styles.icon, {
          [styles.full]: true
        })}
      >
        <i className="iconfont icon-shop-order" />
      </div>
      <div className={styles.cartInfo}>
        <span>133.1</span>
      </div>
      <div
        className={classNames(styles.cartButton, {
          [styles.ready]: true
        })}
      >
        去结算
      </div>
    </div>
  )
}

export default Cart
