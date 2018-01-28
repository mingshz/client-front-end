import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { when } from 'mobx'
import { withRouter } from 'react-router'
import styles from './Payment.css'
import List from '../../components/paymentList'

@withRouter
@inject(({ vip, payment }) => ({
  pending: vip.pending,
  getOrderInfo: vip.getOrderInfo,
  order: vip.order,
  setPending: vip.setPending,
  isPay: payment.isPay,
  payOrder: payment.payOrder,
  setIsPay: payment.setIsPay
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
  }

  componentWillUnmount() {
    this.props.setIsPay(false)
    this.props.setPending(true)
  }

  refresh = () => {
    console.info('Debug: No OrderId && Refresh')
    let orderId = localStorage.getItem('OrderId')
    this.props.getOrderInfo(orderId, -1)
  }

  payOrder = () => {
    let orderId = localStorage.getItem('OrderId')
    this.props.payOrder(orderId)
  }
  render() {
    const { order } = this.props
    let items = []
    let total = 0
    if (order.items) {
      items = order.items.slice()
      console.log(items)
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
