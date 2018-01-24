import React from 'react'
import classNames from 'classnames'
import styles from './List.css'

const List = props => {
  const { data } = props
  return (
    <div className={styles.list}>
      <div className={styles.hd}>
        <img
          src={data.thumbnail}
          alt={data.title}
        />
      </div>
      <div className={styles.bd}>
        <h4 className={styles.title}>{data.title}</h4>
        <div className={styles.info}>
          <span>{data.type}</span>
          <span className={styles.left}>{data.type}</span>
          <span className={styles.distance}>{data.distance}</span>
        </div>
        <div className={classNames(styles.price, 'clearfix')}>
          <div className={styles.new}>&yen;{data.vipPrice}</div>
          <div className={styles.old}>&yen;{data.originalPrice}</div>
        </div>
      </div>
    </div>
  )
}

export default List
