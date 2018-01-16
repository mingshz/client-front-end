import React, { Component } from 'react'
import { ListView } from 'antd-mobile'
import OrderList from '../../components/order/Order'

const data = i => {
  const time = +new Date()
  const random = Math.round(Math.random() * 10)
  return {
    orderId: time + i,
    completeTime: `2017-12-${i} 22:30`,
    orderStatus: '已支付',
    orderStatusCode: 0,
    store: '龙湖天街店',
    payer: '常先生',
    payerMobile: '156***7176',
    items: [
      {
        itemId: time + i,
        thumbnail: `http://iph.href.lu/120x120?text=${i+1}`,
        title: '全车内饰清洁赠车内空气净化套餐',
        quantity: 3 + random,
        vipPrice: 286.99 + random,
        originalPrice: 1000.99 + +random
      }
    ]
  }
}
const NUM_ROWS = 10
let pageIndex = 0

function genData(pIndex = 0) {
  const dataBlob = []
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = pIndex * NUM_ROWS + i
    dataBlob.push(data(ii))
  }
  return dataBlob
}

class OrderListPage extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    }, 100)
  }

  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    this.setState({ isLoading: true })

    setTimeout(() => {
      this.rData = this.rData.concat(genData(++pageIndex))
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    }, 100)
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#f1f1f1',
          height: '0.32rem'
        }}
      />
    )
    const row = (rowData, sectionID, rowID) => {
      return <OrderList order={rowData} hasFooter={false} isCool={12} />
    }
    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderFooter={() => (
          <div style={{ padding: 10, textAlign: 'center', fontSize: '14px'}}>{this.state.isLoading ? '加载中...' : '加载更多'}</div>
        )}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={10}
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={200}
        scrollRenderAheadDistance={200}
      />
    )
  }
}

export default OrderListPage
