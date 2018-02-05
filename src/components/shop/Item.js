import React, { Component } from 'react'
import styles from './Item.css'

class Item extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }
  minusItem = id => {
    let quantity = this.state.quantity
    if (!quantity) return
    this.setState({
      quantity: quantity - 1
    })
    this.props.minusItem(id)
  }
  addItem = id => {
    let quantity = this.state.quantity
    this.setState({
      quantity: quantity + 1
    })
    this.props.addItem(id)
  }
  render() {
    const { quantity } = this.state
    const { data } = this.props
    return (
      <div className={styles.item}>
        <div className={styles.hd}>
          <img src={data.thumbnail} alt={data.title} />
        </div>
        <div className={styles.bd}>
          <h4>{data.title}</h4>
          <div className={styles.region}>
            <div className={styles.price}>￥{data.vipPrice}</div>
            <div className={styles.button}>
              {quantity > 0 ? (
                <a href="javascript:;" className={styles.btnMinus} onClick={this.minusItem.bind(null, data)}>
                  &#8722;
                </a>
              ) : null}
              {quantity > 0 ? <span className={styles.quantity}>{quantity}</span> : null}
              <a href="javascript:;" className={styles.btnAdd} onClick={this.addItem.bind(null, data)}>
                &#43;
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Item
