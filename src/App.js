import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Async from 'react-code-splitting'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

useStrict(true)
class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <Switch>
            {/* 登录注册 */}
            <Route path="/join" exact component={() => <Async load={import('./pages/join')} />} />
            {/* 个人中心 */}
            <Route path="/personal" exact component={() => <Async load={import('./pages/personal')} />} />
            <Redirect from="/" exact to="/personal" />
            {/* 会员卡 */}
            <Route path="/vip" exact component={() => <Async load={import('./pages/vip')} />} />
            {/* 项目列表 */}
            <Route path="/items" exact component={() => <Async load={import('./pages/items')} />} />
            {/* 项目详情 */}
            <Route path="/items/:itemId" exact component={() => <Async load={import('./pages/items/Detail')} />} />
            {/* 支付成功 */}
            <Route path="/success" exact component={() => <Async load={import('./pages/payment/Success')} />} />
            {/* 支付页面 */}
            <Route path="/payment" exact component={() => <Async load={import('./pages/payment')} />} />
            {/* 流水页面 */}
            <Route path="/flow" exact component={() => <Async load={import('./pages/capital/Flow')} />} />
            {/* 充值页面 */}
            <Route path="/deposit" exact component={() => <Async load={import('./pages/capital/Deposit')} />} />
            {/* 订单列表 */}
            <Route path="/orders" exact component={() => <Async load={import('./pages/order/OrderList')} />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
