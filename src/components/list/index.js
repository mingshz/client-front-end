import React from 'react'
import classNames from 'classnames'
import styles from './List.css'

const List = prop => {
  return (
    <div className={styles.list}>
      <div className={styles.hd}>
        <img
          src="https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/62871920/TB23sk4cwnH8KJjSspcXXb3QFXa_!!62871920.jpg_230x230.jpg"
          alt="xxx"
        />
      </div>
      <div className={styles.bd}>
        <h4 className={styles.title}>全车内饰清洁赠车内套餐</h4>
        <div className={styles.info}>
          <span>洗车</span>
          <span className={styles.left}>星光大道</span>
          <span className={styles.distance}>200m</span>
        </div>
        <div className={classNames(styles.price, 'clearfix')}>
          <div className={styles.new}>&yen;189.00</div>
          <div className={styles.old}>&yen;300.00</div>
        </div>
      </div>
    </div>
  )
}

export default List
