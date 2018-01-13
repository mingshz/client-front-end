import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
// import Join from './pages/join'
import Personal from './pages/personal'
import registerServiceWorker from './registerServiceWorker'
import '../node_modules/normalize.css/normalize.css'
import './assets/font/iconfont.css'
import 'amfe-flexible'

ReactDOM.render(<Personal />, document.getElementById('root'))
registerServiceWorker()
