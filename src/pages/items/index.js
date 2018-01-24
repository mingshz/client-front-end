import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Async from 'react-code-splitting'
import styles from './Item.css'
import Tabs from '../../components/tabs'
const Hot = props => <Async load={import('./Hot')} componentProps={props}/>
const Favorite = props => <Async load={import('./Favorite')} componentProps={props}/>
class Items extends Component {
  render() {
    const { pathname } = this.props.location
    const TabList = [
      {
        path: '/hot',
        text: '最热',
        icon: 'hot-o',
        isActive: pathname === '/items/hot'
      },
      {
        path: '/favorite',
        text: '收藏',
        icon: 'favorite-o',
        isActive: pathname === '/items/favorite'
      }
      // {
      //   path: '/nearby',
      //   text: '附近',
      //   icon: 'location-o',
      //   isActive: false
      // }
    ]
    return (
      <div className="main">
        <Tabs data={TabList} />
        <div className={styles.list}>
          <Switch>
            <Route path="/items/hot" component={Hot} />
            <Route path="/items/favorite" component={Favorite} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Items
