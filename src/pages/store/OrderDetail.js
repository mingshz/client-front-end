import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Order from '../../components/order/Order'

@inject(({ shop }) => ({
  getOrderById: shop.getOrderById,
  order: shop.order
}))
@observer
class Detail extends Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.getOrderById(orderId)
  }
  render() {
    const { order } = this.props
    return <Order order={order} hasFooter={false} />
  }
}

export default Detail
