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
    return (
      <div className={styles.item}>
        <div className={styles.hd}>
          <img
            src="https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/62871920/TB23sk4cwnH8KJjSspcXXb3QFXa_!!62871920.jpg_230x230.jpg"
            alt="项目"
          />
        </div>
        <div className={styles.bd}>
          <h4>一切的懂洗都是很不得玩具啊</h4>
          <div className={styles.region}>
            <div className={styles.price}>￥100元</div>
            <div className={styles.button}>
              {quantity > 0 ? (
                <a href="javascript:;" className={styles.btnMinus} onClick={this.minusItem.bind(null, '1111')}>
                  &#8722;
                </a>
              ) : null}
              {quantity > 0 ? <span className={styles.quantity}>{quantity}</span> : null}
              <a href="javascript:;" className={styles.btnAdd} onClick={this.addItem.bind(null, '2222')}>
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
