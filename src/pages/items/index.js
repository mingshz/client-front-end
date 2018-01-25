import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Async from 'react-code-splitting'
import styles from './Item.css'
import Tabs from '../../components/tabs'
const Hot = props => <Async load={import('./Hot')} componentProps={props} />
const Favorite = props => <Async load={import('./Favorite')} componentProps={props} />
class Items extends Component {
  render() {
    const { location, match } = this.props
    const TabList = [
      {
        path: '/hot',
        text: '最热',
        icon: 'hot-o',
        isActive: location.pathname === '/items/hot'
      },
      {
        path: '/favorite',
        text: '收藏',
        icon: 'favorite-o',
        isActive: location.pathname === '/items/favorite'
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
            <Redirect path={match.path} exact to={`${match.path}/hot`} />
            <Route path={`${match.path}/hot`} exact replace component={Hot} />
            <Route path={`${match.path}/favorite`} exact replace component={Favorite} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Items
