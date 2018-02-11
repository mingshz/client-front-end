import React, { Component } from 'react'
import qs from 'query-string'
import { Result, Icon } from 'antd-mobile'

class Error extends Component {
  render() {
    const params = qs.parse(this.props.location.search)
    return (
      <Result
        style={{ height: '100vh', overflow: 'hidden', background: '#fff' }}
        img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642', width: '60px', height: '60px' }} />}
        title={params.type ? params.type : '充值失败'}
        message={params.msg}
        buttonText="返回"
        onButtonClick={() => this.props.history.goBack()}
      />
    )
  }
}

export default Error
