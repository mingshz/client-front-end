import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styles from './Splash.css'

@withRouter
class Splash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sec: 6
    }
  }

  componentDidMount() {
    this.goIndex()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  goIndex = () => {
    this.timer = setInterval(() => {
      this.setState({
        sec: this.state.sec - 1
      })
      if (this.state.sec === 0) {
        clearInterval(this.timer)
        this.props.history.replace('/personal')
      }
    }, 1000)
  }
  render() {
    const { sec } = this.state
    return (
      <div className={styles.splash}>
        <Link to={'/personal'} replace className={styles.skip}>
          跳过（<span>{sec}</span>）
        </Link>
      </div>
    )
  }
}

export default Splash
