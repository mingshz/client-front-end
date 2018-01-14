import React from 'react'
import styles from './Item.css'
import Tabs from '../../components/tabs'
import List from '../../components/list'

const Items = prop => {
  return (
    <div className="main">
      <Tabs />
      <div className={styles.list}>
        <List />
        <List />
        <List />
        <List />
        <List />
      </div>
    </div>
  )
}

export default Items
