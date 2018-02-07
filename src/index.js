import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import store from './stores'
import '../node_modules/normalize.css/normalize.css'
import './assets/font/iconfont.css'
import 'amfe-flexible'
import './index.css'
// import './mock'

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
