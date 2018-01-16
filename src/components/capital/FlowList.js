import React from 'react'
import classNames from 'classnames'
import styles from './FLowList.css'

const List = props => {
  return (
    <div className={styles.list}>
      <p className={styles.time}>2017-12-30 19:00</p>
      <div
        className={classNames(styles.info, {
          [styles.in]: false
        })}
      >
        <span className={styles.name}>彩虹城门店消费</span>
        <span className={styles.number}>¥300.00</span>
      </div>
    </div>
  )
}

export default List
