import React, { Component } from 'react'
import classNames from 'classnames'
import { List, Radio, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'
const RadioItem = Radio.RadioItem

class Deposit extends Component {
  state = {
    value: 0,
    type: 'money'
  }
  onChange = value => {
    this.setState({
      value,
      show: !!this.state.value
    })
  }
  render() {
    const { value, type } = this.state
    return (
      <div>
        <List renderHeader={() => '充值方式'}>
          <RadioItem checked={value === 0} onChange={() => this.onChange(0)}>
            微信支付
          </RadioItem>
          <RadioItem checked={value === 1} onChange={() => this.onChange(1)}>
            充值卡支付
          </RadioItem>
        </List>
        <List renderHeader={() => '单笔充值最少金额为5,000.00元'}>
          <InputItem
            className={classNames({
              hidden: value
            })}
            moneyKeyboardAlign="left"
            type={type}
            placeholder="请输入充值金额"
            ref={el => (this.customFocusInst = el)}
          >
            金额
          </InputItem>
          <InputItem
            className={classNames({
              hidden: !value
            })}
            type="bankCard"
            placeholder="请输入充值卡卡密"
          >
            卡密
          </InputItem>
        </List>
        <WhiteSpace size="xl" />
        <WingBlank>
          <Button>充值</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Deposit
