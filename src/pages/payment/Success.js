import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './Payment.css'

@withRouter
class Success extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sec: 3
    }
  }
  componentDidMount() {
    this.goOrderList()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
  
  goOrderList = () => {
    this.timer = setInterval(() => {
      this.setState({
        sec: this.state.sec - 1
      })
      if (this.state.sec === 0) {
        clearInterval(this.timer)
        this.props.history.replace('/orders')
      }
    }, 1000)
  }

  render() {
    const { sec } = this.state
    return (
      <div className={styles.wrap}>
        <div className={styles.resultIcon}>
          <i className="iconfont icon-success" />
        </div>
        <p className={styles.resultMsg}>支付成功</p>
        <p className={styles.successSec}>
          <span>{sec}s</span>&nbsp;后跳转到订单页面
        </p>
      </div>
    )
  }
}

export default Success
