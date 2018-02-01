import React from 'react'
import styles from './Item.css'

const Item = props => {
  return (
    <div className={styles.item}>
      <div className={styles.hd}>
        <img
          src="https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/62871920/TB23sk4cwnH8KJjSspcXXb3QFXa_!!62871920.jpg_230x230.jpg"
          alt="项目"
        />
      </div>
      <div className={styles.bd}>
        <h4>一切的懂洗都是很不得玩具啊</h4>
        <div className={styles.price}>
          <div className={styles.price}>￥100元</div>
        </div>
      </div>
    </div>
  )
}

export default Item
