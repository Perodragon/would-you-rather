import { applyMiddleware } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading'

import thunk from 'redux-thunk'
import logger from './logger'

/* Reference : 
            React-Redux-Loadingbar.Middleware           
        Link :
          [https://www.npmjs.com/package/react-redux-loading-bar] */

export default applyMiddleware(
  thunk,
  logger,
  loadingBarMiddleware()
)