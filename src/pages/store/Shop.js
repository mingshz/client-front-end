import React, { Component } from 'react'
import Item from '../../components/shop/Item'
import Cart from '../../components/shop/Cart'

class Shop extends Component {
  render() {
    return (
      <div>
        <div>
          <Item />
        </div>
        <Cart />
      </div>
    )
  }
}

export default Shop
