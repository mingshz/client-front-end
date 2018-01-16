import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import '../node_modules/normalize.css/normalize.css'
import './assets/font/iconfont.css'
import 'amfe-flexible'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
