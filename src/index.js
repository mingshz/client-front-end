import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import Join from './pages/join'
import registerServiceWorker from './registerServiceWorker'
import FastClick from 'fastclick'

FastClick.attach(document.body)
ReactDOM.render(<Join />, document.getElementById('root'))
registerServiceWorker()
