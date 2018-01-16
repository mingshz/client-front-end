import React from 'react'
import styles from './Vip.css'

const Vip = props => {
  return (
    <div className="main">
      <div className={styles.qrCode}>
        <div className={styles.hd}>
          <img src={require('../../assets/qrCode.jpg')} alt="二维码" />
        </div>
        <div className={styles.bd}>
          <h4>NOTICE</h4>
          <p>向商户出示该会员卡，可打折消费</p>
        </div>
      </div>
      <div className={styles.vipCard}>
        <div className={styles.card}>
          <div className={styles.vip}>VIP</div>
          <img className={styles.logo} src={require('../../assets/logo.png')} alt="logo"/>
          <p className={styles.name}>锋尚来美会员卡</p>
          <div className={styles.bottom}>
            <p className={styles.number}>8888 8888 8888 8888 8888</p>
            <span>授予尊敬的锋尚来美VIP会员</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vip
