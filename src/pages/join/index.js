import React, { Component } from 'react'
import { List, InputItem } from 'antd-mobile'

class Join extends Component {
  render() {
    return (
      <div>
        <List>
          <InputItem placeholder="请输入您的手机号" clear />
          <InputItem placeholder="请输入收到的验证码" clear />
          <InputItem placeholder="请输入您的姓氏" clear />
        </List>
      </div>
    )
  }
}

export default Join