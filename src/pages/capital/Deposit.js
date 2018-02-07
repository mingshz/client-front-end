import React, { Component } from 'react'
import { createForm } from 'rc-form'
import classNames from 'classnames'
import { List, Radio, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'

const RadioItem = Radio.RadioItem

class Deposit extends Component {
  componentWillMount() {
    sessionStorage.setItem('from', this.props.location.state)
  }

  state = {
    value: 0,
    type: 'money',
    minMoney: sessionStorage.getItem('balance') || 5000,
    redirectUrl: ''
  }
  onChange = value => {
    this.setState({
      value,
      show: !!this.state.value
    })
  }

  renderMinMoney = () => {
    let from = sessionStorage.getItem('from')
    console.log(from)

    let money = from === 'undefined' ? 5000 : this.state.minMoney > 5000 ? this.state.minMoney : 5000
    money = Number(money)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    return `此笔充值最少金额为${money}元`
  }
  redirectUrl = () => {
    let from = sessionStorage.getItem('from')
    const { origin } = window.location
    let url = from === 'undefined' ? `${origin}/#/flow` : `${origin}/#/payment`
  }
  submitDeposit = () => {
    this.props.form.validateFields((error, value) => {
      if (error) return
      console.log(value)
    })
    this.refs.depositForm.submit()
  }
  render() {
    const { value, redirectUrl } = this.state
    const { getFieldProps } = this.props.form
    return (
      <form action="/capital/deposit" method="post" ref="depositForm">
        <List renderHeader={() => '充值方式'}>
          <RadioItem checked={value === 0} onChange={() => this.onChange(0)}>
            微信支付
          </RadioItem>
          <RadioItem checked={value === 1} onChange={() => this.onChange(1)}>
            充值卡支付
          </RadioItem>
        </List>
        <List renderHeader={() => this.renderMinMoney()}>
          <InputItem
            {...getFieldProps('depositSum')}
            className={classNames({
              hidden: value
            })}
            type="number"
            name="depositSum"
            placeholder="请输入充值金额"
          >
            金额
          </InputItem>
          <InputItem
            {...getFieldProps('cdKey')}
            className={classNames({
              hidden: !value
            })}
            type="bankCard"
            name="cdKey"
            placeholder="请输入充值卡卡密"
          >
            卡密
          </InputItem>
          <input type="hidden" name="redirectUrl" value={redirectUrl} />
        </List>
        <WhiteSpace size="xl" />
        <WingBlank>
          <Button onClick={this.submitDeposit}>充值</Button>
        </WingBlank>
      </form>
    )
  }
}

export default createForm()(Deposit)
