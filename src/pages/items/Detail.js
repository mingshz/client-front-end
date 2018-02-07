import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './Detail.css'

@inject(({ item }) => ({
  detail: item.itemDetail,
  getItemById: item.getItemById
}))
@observer
class Detail extends Component {
  componentDidMount() {
    let itemId = this.props.match.params.itemId
    this.props.getItemById(itemId)
  }
  render() {
    const { detail } = this.props
    return (
      <div>
        <div className={styles.hd}>
          <img src={detail.thumbnail} alt={detail.title} />
        </div>
        <div className={styles.info}>
          <h4>{detail.title}</h4>
          <p>
            <i className="iconfont icon-location-o" /> 地址：{detail.address}
          </p>
          <p>
            <i className="iconfont icon-mobile" /> 电话：{detail.tel}
          </p>
        </div>
        <div
          className={styles.bd}
          dangerouslySetInnerHTML={{
            __html: detail.details
          }}
        />
      </div>
    )
  }
}

export default Detail
