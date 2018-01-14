import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
// import Join from './pages/join'
// import Personal from './pages/personal'
// import Vip from './pages/vip'
import Items from './pages/items'
import registerServiceWorker from './registerServiceWorker'
import '../node_modules/normalize.css/normalize.css'
import './assets/font/iconfont.css'
import 'amfe-flexible'

ReactDOM.render(<Items />, document.getElementById('root'))
registerServiceWorker()
