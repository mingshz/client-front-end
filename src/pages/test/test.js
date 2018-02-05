import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject(({ test }) => ({
  price: test.price,
  total: test.total,
  handleClick: test.handleClick
}))
@observer
class Test extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.handleClick}>
          computed测试
        </button>
        <h1>衬衫的价格是: {this.props.price}</h1>
        <h1>Now: {this.props.total}</h1>
      </div>
    )
  }
}

export default Test
