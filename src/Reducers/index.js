import authedUser from '../Reducers/authedUser'
import users from '../Reducers/users'
import questions from '../Reducers/questions'

import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

/* Reference : 
            React-Redux-Loadingbar.Reducers           
        Link :
          [https://www.npmjs.com/package/react-redux-loading-bar] */

export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
})