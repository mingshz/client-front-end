import React from 'react'
import styles from './List.css'

const List = props => {
  const { data } = props
  return (
    <div className={styles.list}>
      <div className={styles.hd}>
        <img src={data.thumbnail} alt={data.title} />
      </div>
      <div className={styles.bd}>
        <h4 className={styles.title}>{data.title}</h4>
        <p className={styles.number}>数量：{data.quantity}</p>
        <p className={styles.subTotal}>小计：¥{data.amount}</p>
      </div>
    </div>
  )
}

export default List
