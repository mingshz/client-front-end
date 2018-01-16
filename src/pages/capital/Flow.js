import React from 'react'
import styles from './Flow.css'
import List from '../../components/capital/FlowList'

const Flow = props => {
  return (
    <div className={styles.flow}>
      <div className={styles.hd}>
        <div className={styles.title}>
          <span>当前余额</span>
          <span className="fr">
            <i className="iconfont icon-history" />明细
          </span>
        </div>
        <div className={styles.balance}>
          <div className={styles.number}>
            <span>&yen;</span>500,000.00
          </div>
          <button type="button">充值</button>
        </div>
      </div>
      <div className={styles.list}>
        <List />
        <List />
      </div>
    </div>
  )
}

export default Flow
