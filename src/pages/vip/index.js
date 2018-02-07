import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'
import { when } from 'mobx'
import styles from './Vip.css'

@withRouter
@inject(({ vip }) => ({
  qrCode: vip.qrCode,
  vipCard: vip.vipCard,
  getVipInfo: vip.getVipInfo,
  getOrderInfo: vip.getOrderInfo
}))
@observer
class Vip extends Component {
  componentDidMount() {
    this.props.getVipInfo()
    when(
      () => this.props.qrCode,
      () => {
        let orderId = sessionStorage.getItem('OrderId')
        if (orderId) {
          this.getOrderHandler(orderId)
        } else {
          console.error('订单号丢失')
        }
      }
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getOrderHandler = orderId => {
    let wait = 1
    this.timer = setInterval(() => {
      console.log(`Now: ${wait}`)
      this.props.getOrderInfo(orderId)
      wait++
    }, 2000)
  }
  render() {
    const { qrCode, vipCard } = this.props
    return (
      <div className="main">
        <div className={styles.qrCode}>
          <div className={styles.hd}>
            <img src={qrCode ? qrCode : require('../../assets/logo.png')} alt="二维码" />
          </div>
          <div className={styles.bd}>
            <h4>NOTICE</h4>
            <p>向商户出示该会员卡，可打折消费</p>
          </div>
        </div>
        <div className={styles.vipCard}>
          <div className={styles.card}>
            <div className={styles.vip}>VIP</div>
            <img className={styles.logo} src={require('../../assets/logo.png')} alt="logo" />
            <p className={styles.name}>锋尚来美会员卡</p>
            <div className={styles.bottom}>
              <p className={styles.number}>
                {vipCard
                  ? String(vipCard)
                      .replace(/\D/g, '')
                      .replace(/(....)(?=.)/g, '$1 ')
                  : '**** **** **** ****'}
              </p>
              <span>授予尊敬的锋尚来美VIP会员</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Vip
