import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Item from '../../components/shop/Item'
import Cart from '../../components/shop/Cart'
import styles from './Shop.css'

@inject(({ shop }) => ({
  addItem: shop.addItem,
  minusItem: shop.minusItem
}))
@observer
class Shop extends Component {
  render() {
    const { addItem, minusItem } = this.props
    return (
      <div>
        <div className={styles.itemList}>
          <Item addItem={addItem} minusItem={minusItem} />
        </div>
        <Cart />
      </div>
    )
  }
}

export default Shop
