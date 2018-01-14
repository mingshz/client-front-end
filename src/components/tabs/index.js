import React from 'react'
import classNames from 'classnames'
import styles from './Tabs.css'

const Tabs = prop => {
  return (
    <div className={styles.tabs}>
      <div className={styles.tabItem}>
        <div
          className={classNames({
            [styles.tabWrap]: false,
            [styles.active]: true
          })}
        >
          <i className="iconfont icon-hot-o" />
          <p>最热</p>
        </div>
      </div>
      <div className={styles.tabItem}>
        <div className={styles.tabWrap}>
          <i className="iconfont icon-favorite-o" />
          <p>收藏</p>
        </div>
      </div>
      <div className={styles.tabItem}>
        <div className={styles.tabWrap}>
          <i className="iconfont icon-location-o" />
          <p>附近</p>
        </div>
      </div>
    </div>
  )
}

export default Tabs
