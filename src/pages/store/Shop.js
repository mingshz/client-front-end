import React, { Component } from 'react'
import Item from '../../components/shop/Item'
import Cart from '../../components/shop/Cart'
import styles from './Shop.css'

class Shop extends Component {
  render() {
    return (
      <div>
        <div className={styles.itemList}>
          <Item />
          <Item />
          <Item />
        </div>
        <Cart />
      </div>
    )
  }
}

export default Shop
