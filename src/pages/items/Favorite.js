import React, { Component } from 'react'
import { ListView } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import List from '../../components/list'

@inject(({ items }) => ({
  getItems: items.getItems
}))
@observer
class FavoriteItemsPage extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      isLoading: true,
      itemType: 'Favorite',
      page: 1
    }
  }

  componentDidMount() {
    this.props.getItems({ itemType: this.state.itemType, page: this.state.page, pageSize: 10 }).then(res => {
      if (res.data.list.length === 10) {
        let page = this.state.page
        this.setState({
          page: ++page
        })
      }
      this.rData = res.data.list
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    })
  }

  onEndReached = event => {
    if (this.state.isLoading) return
    this.setState({ isLoading: true })
    this.props.getItems({ itemType: this.state.itemType, page: this.state.page, pageSize: 10 }).then(res => {
      if (res.data.list.length === 10) {
        let page = this.state.page
        this.setState({
          page: ++page
        })
      }
      this.rData = this.rData.concat(res.data.list)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    })
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
        pageSize={10}
        style={{
          height: '100%',
          overflow: 'auto'
        }}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={200}
        scrollRenderAheadDistance={200}
      />
    )
  }
}

export default FavoriteItemsPage
