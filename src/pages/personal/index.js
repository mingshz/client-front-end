import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import styles from './Personal.css'

@inject(({ personal }) => ({
  user: personal.user,
  getUserInfo: personal.getUserInfo
}))
@observer
class Personal extends Component {
  componentDidMount() {
    this.props.getUserInfo()
  }

  render() {
    const { user } = this.props
    return (
      <div className="main">
        <div className={styles.header}>
          <div className={styles.hd}>
            <img
              className={styles.avatar}
              alt="微信头像"
              src={user.avatar ? user.avatar : require('../../assets/logo.png')}
            />
          </div>
          <div className={styles.bd}>
            <h4>{user.name ? user.name : '***'}</h4>
            <p>{user.mobile ? String(user.mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '***********'}</p>
          </div>
        </div>
        <div className={styles.capital}>
          <span>余额</span>
          <p>
            {typeof user.balance === 'number'
              ? Number(user.balance)
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
              : '****.**'}
          </p>
        </div>
        <div className={styles.list}>
          <ul>
            {user.storeId ? (
              <li>
                <Link to="/store/orders/all">
                  <i className="iconfont icon-shop-order" />
                  <p>销售订单</p>
                </Link>
              </li>
            ) : null}
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
              <Link to="/flow">
                <i className="iconfont icon-recharge" />
                <p>充值</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Personal
