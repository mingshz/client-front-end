import React from 'react'
import styles from './List.css'

const List = props => {
  return (
    <div className={styles.list}>
      <div className={styles.hd}>
        <img
          src="https://gd4.alicdn.com/imgextra/i3/55285307/TB2WBGRhIjI8KJjSsppXXXbyVXa_!!55285307.jpg_400x400.jpg"
          alt="xxx"
        />
      </div>
      <div className={styles.bd}>
        <h4 className={styles.title}>全车内饰清洁赠车内空气</h4>
        <p className={styles.number}>数量：3</p>
        <p className={styles.subTotal}>小计：¥500.00</p>
      </div>
    </div>
  )
}

export default List
