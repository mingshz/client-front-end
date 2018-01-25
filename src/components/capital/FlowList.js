import React from 'react'
import classNames from 'classnames'
import styles from './FLowList.css'

const List = props => {
  const { data } = props
  return (
    <div className={styles.list}>
      <p className={styles.time}>{data.time}</p>
      <div
        className={classNames(styles.info, {
          [styles.in]: !!data.type
        })}
      >
        <span className={styles.name}>{data.title}</span>
        <span className={styles.number}>
          ¥{Number(data.sum)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
        </span>
      </div>
    </div>
  )
}

export default List
