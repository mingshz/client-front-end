import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './Payment.css'
import List from '../../components/paymentList'

@inject(({ vip }) => ({
  pending: vip.pending,
  getOrderInfo: vip.getOrderInfo,
  order: vip.order
}))
@observer
class Payment extends Component {
  componentDidMount() {
    if (this.props.pending) {
      this.refresh()
    }
  }

  refresh = () => {
    console.info('Debug: No OrderId && Refresh')
    let orderId = localStorage.getItem('OrderId')
    this.props.getOrderInfo(orderId, -1)
  }
  render() {
    const { order } = this.props
    let items = []
    if (order.items) {
      items = order.items.slice()
      console.log(items)
    } else {
      console.log('Order Items is empty')
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>即将支付以下订单：</div>
        <div className={styles.body}>{items.map(v => <List key={v.itemId} data={v} />)}</div>
        <div className={styles.footer}>
          <button type="button">
            确认支付&nbsp;<span>¥3000.00</span>
          </button>
        </div>
      </div>
    )
  }
}
export default Payment
