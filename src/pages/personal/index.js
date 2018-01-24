import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Personal.css'

const Personal = props => {
  return (
    <div className="main">
      <div className={styles.header}>
        <div className={styles.hd}>
          <img
            className={styles.avatar}
            alt="微信头像"
            src="http://k2.jsqq.net/uploads/allimg/1703/7_170307143820_16.jpg"
          />
        </div>
        <div className={styles.bd}>
          <h4>常先生</h4>
          <p>156****7176</p>
        </div>
      </div>
      <div className={styles.capital}>
        <span>余额</span>
        <p>2,980.00</p>
      </div>
      <div className={styles.list}>
        <ul>
          <li>
            <Link to="/orders">
              <i className="iconfont icon-order" />
              <p>订单列表</p>
            </Link>
          </li>
          <li>
            <Link to="/items">
              <i className="iconfont icon-like" />
              <p>最新推荐</p>
            </Link>
          </li>
          <li>
            <Link to="/deposit">
              <i className="iconfont icon-recharge" />
              <p>充值</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Personal
