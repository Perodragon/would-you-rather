import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'

import { logoutUser } from '../../Actions/authedUser'

class NavBar extends Component {

    logout = (event) => {
        const { dispatch } = this.props

        event.preventDefault()
        dispatch(logoutUser())
    }

    render() {
        
        const { authedUser } = this.props

        return (

            /* Reference : 
                    React-Bootstrap.Navbar         
                        Link :
                        [ https://react-bootstrap.github.io/components/navbar/ ] */

            <Navbar className="custom-nav-bg" collapseOnSelect expand="lg" bg="white" variant="white">
                <NavLink to='/'><p className='mainTheme'>Would You Rather?</p></NavLink>
                <Nav className="mr-auto">
                    <nav className='nav'>
                        <ul>
                            <li>
                                <NavLink to='/' exact activeClassName='active'>Questions</NavLink>
                            </li>
                            <li>
                                <NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink>
                            </li>
                            <li>
                                <NavLink to='/add' activeClassName='active'>New Question</NavLink>
                            </li>
                        </ul>
                    </nav>
                </Nav>

                {this.props.authedUser ? 
                    <div className='authedUser'>
                        <img src={authedUser.avatarURL} className='minImg' alt='avatar'/>
                        <p className='welcomeMsg' onClick={this.logout}>Hello, {authedUser.name} <NavLink className='loginLink' to='/login'>[Logout]</NavLink></p>
                    </div> 
                    : <NavLink to='/login'><p className='loginBtn'>[Login]</p></NavLink>
                }
            </Navbar>            
        )
    }
}

const mapStateToProps = ({ authedUser }) => ({
    authedUser,
})
  
/* Reference : 
        React WithRouter_Connect       
            Link :
            [ https://reactrouter.com/web/api/withRouter ] */


export default withRouter(connect(mapStateToProps)(NavBar))