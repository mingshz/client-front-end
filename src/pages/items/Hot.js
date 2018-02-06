import React, { Component } from 'react'
import { ListView, Toast } from 'antd-mobile'
import Axios from 'axios'
import List from '../../components/list'

class HotItemsPage extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      isLoading: true,
      itemType: 'HOT',
      page: 1
    }
  }

  getItems = () => {
    Axios.get('/items', {
      params: { itemType: this.state.itemType, page: this.state.page, pageSize: 10 }
    })
      .then(res => {
        let list = res.data.data.list
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
        Toast.fail('系统异常', 2)
      })
  }
  
  componentDidMount() {
    this.getItems()
  }

  onEndReached = event => {
    if (this.state.isLoading) return
    this.setState({ isLoading: true })
    this.getItems()
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
      return <List data={rowData} />
    }
    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderFooter={() => (
          <div style={{ padding: 10, textAlign: 'center', fontSize: '14px' }}>
            {this.state.isLoading ? '加载中...' : '加载更多'}
          </div>
        )}
        renderRow={row}
        renderSeparator={separator}
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
    )
  }
}

export default HotItemsPage
