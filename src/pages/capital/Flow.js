import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { ListView, Toast } from 'antd-mobile'
import Axios from '../../utils/request'
import { inject, observer } from 'mobx-react'
import styles from './Flow.css'
import List from '../../components/capital/FlowList'

@withRouter
@inject(({ personal }) => ({
  user: personal.user,
  getUserInfo: personal.getUserInfo
}))
@observer
class Flow extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      isLoading: true,
      page: 1
    }
  }

  getFlow = () => {
    Axios.get('/capital/flow', {
      params: { page: this.state.page, pageSize: 10 }
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
    this.getFlow()
    if (!this.props.user.balance) {
      this.props.getUserInfo()
    }
  }

  goToDeposit = () => {
    this.props.history.push('/deposit')
  }

  onEndReached = event => {
    if (this.state.isLoading) return
    this.setState({ isLoading: true })
    this.getFlow()
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
    const { user } = this.props
    return (
      <div className={styles.flow}>
        <div className={styles.hd}>
          <div className={styles.title}>
            <span>当前余额</span>
            <span className="fr">
              <i className="iconfont icon-history" />明细
            </span>
          </div>
          <div className={styles.balance}>
            <div className={styles.number}>
              <span>&yen;</span>
              {typeof user.balance === 'number'
                ? Number(user.balance)
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                : '****.**'}
            </div>
            <button type="button" onClick={this.goToDeposit}>
              充值
            </button>
          </div>
        </div>
        <div className={styles.list}>
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
        </div>
      </div>
    )
  }
}

export default Flow
