import React, { Component } from 'react'
import { createForm } from 'rc-form'
import classNames from 'classnames'
import { Toast } from 'antd-mobile'
import { List, Radio, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'

const RadioItem = Radio.RadioItem
const { origin } = window.location
class Deposit extends Component {
  state = {
    value: 0,
    type: 'money',
    minMoney: localStorage.getItem('minRechargeAmount'),
    redirectUrl: `${origin}/#/flow?paySuccess=true`
  }
  componentWillMount() {
    sessionStorage.setItem('from', this.props.match.params.from)
    if (this.props.match.params.from === 'payment') {
      let money =
        sessionStorage.getItem('balance') > localStorage.getItem('minRechargeAmount')
          ? sessionStorage.getItem('balance')
          : localStorage.getItem('minRechargeAmount')
      this.setState({
        minMoney: money,
        redirectUrl: `${origin}/#/payment?paySuccess=true`
      })
    }
  }

  onChange = value => {
    this.setState({
      value,
      show: !!this.state.value
    })
  }

  renderMinMoney = () => {
    let money = this.state.minMoney

    money = Number(money)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    return `此笔充值最少金额为${money}元`
  }

  submitDeposit = () => {
    this.props.form.validateFields((error, value) => {
      if (error) return
      if (!value.redirectUrl) return
      if (this.state.value) {
        let cdKey = this.props.form.getFieldProps('cdKey').value
        if (!cdKey) {
          Toast.fail('请输入充值卡卡密', 2)
          return
        }
      } else {
        let depositSum = this.props.form.getFieldProps('depositSum').value
        if (!depositSum) {
          Toast.fail('请输入正确的金额', 2)
          return
        } else {
          if (!/^([1-9]\d*|0)(\.\d{1,2})?$/.test(depositSum)) {
            Toast.fail('请输入正确的金额', 2)
            return
          }
          if (Number(depositSum) < this.state.minMoney) {
            Toast.fail(`此笔充值最少金额为${this.state.minMoney}元`, 2)
            return
          }
        }
      }
      this.refs.depositForm.submit()
    })
  }
  render() {
    const { value, redirectUrl } = this.state

    const { getFieldProps } = this.props.form
    return (
      <form action="/capital/deposit" method="post" ref="depositForm" autoComplete="off">
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
            disabled={value}
            type="digit"
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
            disabled={!value}
            type="text"
            name="cdKey"
            placeholder="请输入充值卡卡密"
          >
            卡密
          </InputItem>
          <input
            {...getFieldProps('redirectUrl', {
              initialValue: redirectUrl
            })}
            type="hidden"
            name="redirectUrl"
            value={redirectUrl}
          />
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
