import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

/* Reference : 
            React Private-Route (RouteGuard)           
        Link :
          [ https://dev.to/ibrahimawadhamid/how-to-create-a-private-route-in-react-route-guard-example-for-authenticated-users-only-kin ] */

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => (
    <Route {...rest} render={props => !authedUser ? (<Redirect to={{
        pathname: '/login',
        state: { previousPath: props.location.pathname }
    }} />) :
        (<Component {...props} />)} />
)

const mapStateToProps = ({ authedUser }) => ({
    authedUser,
})

export default connect(mapStateToProps)(PrivateRoute)