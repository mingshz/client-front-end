import React from 'react'
import classNames from 'classnames'
import styles from './FLowList.css'

const List = props => {
  const { data } = props
  return (
    <a
      className={classNames(styles.list, {
        [styles.link]: !data.type
      })}
      href={data.type ? 'javascript:;' : `#/detail/order/${data.orderId}`}
    >
      <p className={styles.time}>{data.time}</p>
      <div
        className={classNames(styles.info, {
          [styles.in]: !!data.type
        })}
      >
        <span className={styles.name}>{data.title}</span>
        <span className={styles.number}>
          {data.type ? '+' : '-'}
          {Number(data.sum)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
        </span>
      </div>
    </a>
  )
}

export default List
