import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { getUsers, getQuestions } from '../Actions/shared'
import { showLoading, hideLoading } from 'react-redux-loading'
import { connect } from 'react-redux'

import PrivateRoute from './Codex/PrivateRoute'

import NavBar from './Views/NavBar'
import LoadingBar from 'react-redux-loading'
import LoginPage from './Views/LoginPage'
import Questions from './Views/Questions'
import Leaderboard from './Views/Leaderboard'
import NewQuestion from './Views/NewQuestion'
import VotePage from './Views/VotePage'
import ErrorPage from './Views/ErrorPage'

/* References : 
            (1) React npm Loadingbar           
            (2) React Route of 404-NotFound 
        Links :
          [ https://www.npmjs.com/package/react-top-loading-bar ]
          [ https://reactrouter.com/web/example/no-match ] */

class GameApp extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(showLoading());
        dispatch(getUsers())
        dispatch(getQuestions())
        dispatch(hideLoading());
    }

  render() {
    return (
      <Router>
        <Fragment>
          <div className="App">
            <LoadingBar />
            <NavBar/> 
              <Switch>
                <Route path="/login" component={LoginPage}/>
                <PrivateRoute exact path='/' component={Questions}/>                
                <PrivateRoute path='/leaderboard' component={Leaderboard}/>
                <PrivateRoute path='/add' component={NewQuestion}/>
                <PrivateRoute path='/questions/:question_id' component={VotePage}/>
                <Route path='*' exact={true} component={ErrorPage}/>
              </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ users, questions, authedUser, loadingBar }) => ({
  users,
  questions,
  authedUser,
  loadingBar,
})

export default connect(mapStateToProps)(GameApp)