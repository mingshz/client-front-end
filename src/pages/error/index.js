import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './Error.css'

class Error extends Component {
  render() {
    const { params } = this.props.match
    let status = 'error'
    if (/^5/.test(params.code)) {
      status = 'warn'
    }
    return (
      <div className={styles.body}>
        <div className={styles.result}>
          <i
            className={classNames({
              iconfont: true,
              'icon-warn': status === 'error',
              'error-code': status === 'error',
              'icon-report': status === 'warn',
              'warn-code': status === 'warn'
            })}
          />
          <h2 className={styles.title}>{status === 'error' ? '找不到此页面...' : '系统维护中'}</h2>
          <p className={styles.tips}>
            {status === 'error'
              ? ' 出现了这个问题，也许是因为您访问了不正确的链接地址，但更可能是由于我们对程序做出了更新，没有及时通知您所造成的。'
              : ' 出现了这个问题，是由于我们对程序做出了更新，维护需要一段时间，请您谅解。'}
          </p>
        </div>
      </div>
    )
  }
}

export default Error
