import React, { Component } from 'react'
import { Modal, List } from 'antd-mobile'
import classNames from 'classnames'
import styles from './Cart.css'

const Item = List.Item

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }
  showModal = e => {
    if (!this.props.total) return
    e.preventDefault()
    this.setState({
      modal: true
    })
  }
  onClose = () => {
    this.setState({
      modal: false
    })
  }

  minusItem = id => {
    this.props.minusItem(id)
  }
  addItem = id => {
    this.props.addItem(id)
  }

  render() {
    const { total, orders, submit } = this.props
    let sum = 0
    let quantity = 0
    let newArray = []
    for (let id in orders) {
      const { num, price, name } = orders[id]
      sum += price * num * 100
      quantity += num
      newArray.push({
        itemId: id,
        title: name,
        vipPrice: price,
        num: num
      })
    }
    return (
      <div className={styles.cart}>
        <Modal popup visible={this.state.modal} onClose={this.onClose} animationType="slide-up">
          <List renderHeader={() => '订单列表'} className="shop-order_list">
            {/* TODO */}
            {newArray.map(order => (
              <Item key={order.itemId}>
                <span className="shop-order_name">{order.title}</span>
                <div className="shop-order_btn">
                  {/* <span className={styles.btnMinus} onClick={this.minusItem.bind(null, order)}>
                    &#8722;
                  </span> */}
                  <span className={styles.quantity}>x{order.num}</span>
                  {/* <span className={styles.btnAdd}>&#43;</span> */}
                </div>
              </Item>
            ))}
            {/* TODO */}
          </List>
        </Modal>
        <div
          className={classNames(styles.icon, {
            [styles.full]: total > 0
          })}
          onClick={this.showModal}
        >
          <i className="iconfont icon-shop-order" />
          {total > 0 ? <div className={styles.cartNum}>{quantity}</div> : null}
        </div>
        <div className={styles.cartInfo}>
          <span>￥{(sum / 100).toFixed(2)}</span>
        </div>
        <div
          className={classNames(styles.cartButton, {
            [styles.ready]: total > 0
          })}
          onClick={submit}
        >
          {total > 0 ? '去结算' : '准备下单'}
        </div>
      </div>
    )
  }
}
export default Cart
