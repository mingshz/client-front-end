import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Async from 'react-code-splitting'
import classNames from 'classnames'
import styles from './Order.css'
const OrderList = props => <Async load={import('./OrderList')} componentProps={props} />
class Order extends Component {
  render() {
    const { location } = this.props
    const TabList = [
      {
        path: '/store/orders/all',
        text: '全部',
        isActive: location.pathname === '/store/orders/all'
      },
      {
        path: '/store/orders/complete',
        text: '已付款',
        isActive: location.pathname === '/store/orders/complete'
      },
      {
        path: '/store/orders/pending',
        text: '未付款',
        isActive: location.pathname === '/store/orders/pending'
      }
    ]
    let page = TabList.find(v => v.path === location.pathname)
    if (!page) page = TabList[0]
    return (
      <div className="main">
        <div className={styles.tabs}>
          {TabList.map((v, i) => (
            <div className={styles.tabItem} key={i}>
              <Link
                to={v.path}
                replace
                className={classNames({
                  [styles.active]: v.isActive
                })}
              >
                <p>{v.text}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.list}>
          <Switch>
            <Route key={page.path} path={page.path} exact replace component={OrderList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Order
