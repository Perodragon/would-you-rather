import React from 'react'
import ReactDOM from 'react-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import GameApp from './Components/App'
import reducer from './Reducers'
import middleware from './Middleware'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import './Styles/index.css'

/* Reference : 
            Redux DevTools Extension's helper           
        Link :
          [ https://www.npmjs.com/package/redux-devtools-extension ] */

const store = createStore(
  reducer, 
  composeWithDevTools(middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <GameApp />
  </Provider>,
document.getElementById('root')
) 