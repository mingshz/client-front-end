import React, { Component } from 'react'
import { ListView, Toast } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import { toJS, when } from 'mobx'
import Axios from '../../utils/request'
import Item from '../../components/shop/Item'
import Cart from '../../components/shop/Cart'
import Loading from '../../components/loading'
import styles from './Shop.css'

@inject(({ shop, personal, status }) => ({
  addItem: shop.addItem,
  minusItem: shop.minusItem,
  easyOrders: shop.easyOrders,
  total: shop.total,
  submitOrders: shop.submitOrders,
  getUserInfo: personal.getUserInfo,
  user: personal.user,
  loading: status.loading
}))
@observer
class Shop extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      isLoading: true,
      storeId: '',
      current: 1
    }
  }

  getItems = storeId => {
    storeId = storeId || this.state.storeId
    Axios.get('/items', {
      params: { storeId: storeId, current: this.state.current, pageSize: 10 }
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
    this.props.getUserInfo()
    when(
      () => Object.keys(this.props.user).length > 0,
      () => {
        const { storeId } = this.props.user
        this.setState({
          storeId: storeId
        })
        this.getItems(storeId)
      }
    )
  }

  onEndReached = event => {
    if (this.state.isLoading) return
    this.setState({ isLoading: true })
    this.getItems()
  }

  render() {
    const { addItem, minusItem, total, easyOrders, submitOrders, match, loading } = this.props
    const orderId = match.params.orderId
    const orders = toJS(easyOrders)
    const row = (rowData, sectionID, rowID) => {
      return <Item data={rowData} addItem={addItem} minusItem={minusItem} />
    }

    if (loading) return <Loading />
    return (
      <div>
        <div className={styles.itemList}>
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
        <Cart
          total={total}
          orders={orders}
          addItem={addItem}
          minusItem={minusItem}
          submit={submitOrders}
          orderId={orderId}
        />
      </div>
    )
  }
}

export default Shop
