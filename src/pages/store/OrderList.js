import React, { Component } from 'react'
import { ListView, Toast } from 'antd-mobile'
import Axios from '../../utils/request'
import Order from '../../components/shop/Order'
import styles from './Order.css'

class OrderList extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    const statue = this.getOrderStatus()
    this.state = {
      dataSource,
      isLoading: true,
      orderType: 'STORE',
      orderStatus: statue,
      current: 1
    }
  }

  getOrderStatus = () => {
    if (this.props.location.pathname === '/store/orders/all') return ''
    if (this.props.location.pathname === '/store/orders/complete') return 'success'
    if (this.props.location.pathname === '/store/orders/pending') return 'forPay'
  }
  getOrders = () => {
    Axios.get('/orders', {
      params: {
        orderType: this.state.orderType,
        orderStatus: this.state.orderStatus,
        current: this.state.current,
        pageSize: 10
      }
    })
      .then(res => {
        let list = res.list
        if (this.state.current === 1) {
          this.rData = list
        } else {
          this.rData = this.rData.concat(list)
        }
        if (list.length === 10) {
          let current = this.state.current
          this.setState({
            current: ++current
          })
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false
        })
      })
      .catch(err => {
        console.error(err)
        Toast.fail('系统异常', 2)
      })
  }
  componentDidMount() {
    this.getOrders()
  }

  onEndReached = event => {
    if (this.state.isLoading) return
    this.setState({ isLoading: true })
    this.getOrders()
  }

  render() {
    const row = (rowData, sectionID, rowID) => {
      return <Order order={rowData} />
    }
    return (
      <div className={styles.orderList}>
        <ListView
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 10, textAlign: 'center', fontSize: '14px' }}>
              {this.state.isLoading ? '加载中...' : '加载更多'}
            </div>
          )}
          renderRow={row}
          className="am-list"
          style={{
            height: '100%',
            overflow: 'auto'
          }}
          pageSize={10}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={200}
          scrollRenderAheadDistance={200}
        />
      </div>
    )
  }
}

export default OrderList
