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
      page: 1
    }
  }

  getOrderStatus = () => {
    if (this.props.location.pathname === '/store/orders/all') return 'all'
    if (this.props.location.pathname === '/store/orders/complete') return 'complete'
    if (this.props.location.pathname === '/store/orders/pending') return 'pending'
  }
  getOrders = () => {
    Axios.get('/orders', {
      params: {
        orderType: this.state.orderType,
        orderStatus: this.state.orderStatus,
        page: this.state.page,
        pageSize: 10
      }
    })
      .then(res => {
        let list = res.list
        if (this.state.page === 1) {
          this.rData = list
        } else {
          this.rData = this.rData.concat(list)
        }
        if (list.length === 10) {
          let page = this.state.page
          this.setState({
            page: ++page
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
