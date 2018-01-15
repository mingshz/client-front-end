import React from 'react'
import styles from './Detail.css'

const Detail = prop => {
  return (
    <div>
      <div className={styles.hd}>
        <img src="http://image-1252688601.cossh.myqcloud.com/item.png" alt="item" />
      </div>
      <div className={styles.info}>
        <h4>全车内饰清洁赠车内空气净化套餐</h4>
        <p>
          <i className="iconfont icon-location-o" /> 地址：滨江区星光大道二期B3-109
        </p>
        <p>
          <i className="iconfont icon-mobile" /> 电话：0571-11112222
        </p>
      </div>
      <div className={styles.bd}>
        <img src="https://img.alicdn.com/imgextra/i4/55285307/TB2oyE9h0fJ8KJjy0FeXXXKEXXa_!!55285307.jpg" alt="xxx" />
        <p>这个分不差饭随爱豆饭随爱豆发大水发大水发大水佛挡杀佛大厦发送发送。发大水发送，发大水啥都。</p>
        <img src="http://image-1252688601.cossh.myqcloud.com/item.png" alt="item" />
      </div>
    </div>
  )
}

export default Detail
