import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Async from 'react-code-splitting'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

const Items = props => <Async load={import('./pages/items')} componentProps={props} />
const Deposit = props => <Async load={import('./pages/capital/Deposit')} componentProps={props} />
const Shop = props => <Async load={import('./pages/store/Shop')} componentProps={props} />
const Detail = props => <Async load={import('./pages/items/Detail')} componentProps={props} />
const StoreOrders = props => <Async load={import('./pages/store/Order')} componentProps={props} />
const StoreOrderDetail = props => <Async load={import('./pages/store/OrderDetail')} componentProps={props} />
const Error = props => <Async load={import('./pages/error')} componentProps={props} />

useStrict(true)
class App extends Component {
  render() {
    return (
      <Provider>
        <HashRouter>
          <Switch>
            {/* 启动页面 */}
            <Route path="/" exact component={() => <Async load={import('./pages/splash')} />} />
            {/* 登录注册 */}
            <Route path="/join" exact component={() => <Async load={import('./pages/join')} />} />
            {/* 个人中心 */}
            <Route path="/personal" exact component={() => <Async load={import('./pages/personal')} />} />
            {/* 会员卡 */}
            <Route path="/vip" exact component={() => <Async load={import('./pages/vip')} />} />
            {/* 项目列表 */}
            <Route path="/items" component={Items} />
            {/* 项目详情 */}
            <Route path="/detail/item/:itemId" component={Detail} />
            {/* 支付成功 */}
            <Route path="/success" exact component={() => <Async load={import('./pages/payment/Success')} />} />
            {/* 支付页面 */}
            <Route path="/payment" exact component={() => <Async load={import('./pages/payment')} />} />
            {/* 流水页面 */}
            <Route path="/flow" exact component={() => <Async load={import('./pages/capital/Flow')} />} />
            {/* 充值页面 */}
            <Route path="/deposit" exact component={Deposit} />
            {/* 订单列表 */}
            <Route path="/orders" exact component={() => <Async load={import('./pages/order/OrderList')} />} />
            {/* 商品地址 */}
            <Route path="/shop/:orderId" exact component={Shop} />
            {/* 销售订单 */}
            <Route path="/store/orders/:orderType" component={StoreOrders} />
            {/* 销售订单详情 */}
            <Route path="/detail/order/:orderId" component={StoreOrderDetail} />
            {/* 错误页面 */}
            <Route path="/error/:code" component={Error} />
            <Route component={Error} />
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

export default App
