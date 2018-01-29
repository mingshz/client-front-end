import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { when, autorun } from 'mobx'
import { withRouter } from 'react-router'
import { Modal } from 'antd-mobile'
import styles from './Payment.css'
import List from '../../components/paymentList'

const alert = Modal.alert

@withRouter
@inject(({ vip, payment }) => ({
  pending: vip.pending,
  getOrderInfo: vip.getOrderInfo,
  order: vip.order,
  setPending: vip.setPending,
  isPay: payment.isPay,
  payOrder: payment.payOrder,
  balance: payment.balance
}))
@observer
class Payment extends Component {
  componentDidMount() {
    if (this.props.pending) {
      this.refresh()
    }
    when(
      () => this.props.isPay,
      () => {
        this.props.history.replace('/success')
      }
    )
    autorun(() => {
      if (this.props.balance !== 0) {
        console.log(this.props.balance)
        sessionStorage.setItem('balance', this.props.balance)
        this.alertInstance = alert('充值', '您的余额不足，是否充值？', [
          {
            text: '取消',
            onPress: () => console.log('cancel'),
            style: 'default'
          },
          {
            text: '确定',
            onPress: () => {
              this.props.history.push({
                pathname: '/deposit',
                state: 'payment'
              })
            }
          }
        ])
      }
    })
  }

  componentWillUnmount() {
    this.props.setPending(this.props.isPay)
    if (this.props.balance !== 0) this.alertInstance.close()
  }

  refresh = () => {
    console.info('Debug: No OrderId && Refresh')
    let orderId = sessionStorage.getItem('OrderId')
    this.props.getOrderInfo(orderId, -1)
  }

  payOrder = () => {
    let orderId = sessionStorage.getItem('OrderId')
    this.props.payOrder(orderId)
  }
  render() {
    const { order } = this.props
    let items = []
    let total = 0
    if (order.items) {
      items = order.items.slice()
      items.forEach(v => {
        total += v.amount * 100
      })
    } else {
      console.log('Order Items is empty')
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>即将支付以下订单：</div>
        <div className={styles.body}>{items.map(v => <List key={v.itemId} data={v} />)}</div>
        <div className={styles.footer}>
          <button type="button" onClick={this.payOrder}>
            确认支付&nbsp;<span>¥{(total / 100).toFixed(2)}</span>
          </button>
        </div>
      </div>
    )
  }
}
export default Payment
