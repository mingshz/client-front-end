import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Tabs.css'

const Tabs = props => {
  const TabList = props.data
  return (
    <div className={styles.tabs}>
      {TabList.map((v, i) => (
        <div className={styles.tabItem} key={i}>
          <Link
            to={`/items${v.path}`}
            replace
            className={classNames({
              [styles.tabWrap]: !v.isActive,
              [styles.active]: v.isActive
            })}
          >
            <i
              className={classNames({
                iconfont: true,
                [`icon-${v.icon}`]: true
              })}
            />
            <p>{v.text}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Tabs
