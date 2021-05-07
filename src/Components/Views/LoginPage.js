import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setAuthedUser } from '../../Actions/authedUser'

import loginImg from '../../UnknownImg/Anonymous_Login.gif'
import Alert from 'react-bootstrap/Alert'

class LoginPage extends Component {

    state = {
        logged: '',
        authedUser: '',
    }

    usersMenu = (users) => {

        let usersLs = []

        for (let i in users) {
            var user = users[i]
            usersLs.push(user)
        }
        return usersLs
    }

    handleChange = (event) => {

        const { users } = this.props
        const usersLs = this.usersMenu(users)

        event.preventDefault()        

        this.setState({
            authedUser: usersLs[event.target.value]
        })

        let pfp = document.getElementById('userPfp')
        pfp.setAttribute('src', usersLs[event.target.value].avatarURL)
    }

    /* Reference : 
            handleSubmit Js           
        Link :
          [ https://www.sitepoint.com/work-with-forms-in-react/ ] */

    handleSubmit = (evt) => {

        const { authedUser } = this.state
        const { dispatch } = this.props

        evt.preventDefault()

        if (authedUser) {
            dispatch(setAuthedUser(authedUser))
            this.setState({
                logged: true
            })
        }
    }

    render() {

        const { logged } = this.state
        const { users } = this.props
        var routePath = this.props.location.state
        let ls = []

        if (logged) {

            let requiredPath

            if (routePath) {
                requiredPath = routePath.previousPath
            }
            else {
                requiredPath = '/'
            }
            return <Redirect to={requiredPath}/>
        }

        if (users) {
            ls = this.usersMenu(users)
        }

        return (
            <div className='styleContainer'>
                <Card 
                    style={{ 
                        width: '25rem', 
                        padding: '5px', 
                        border: '2px solid red' 
                    }}
                >
                    <h2>Login</h2>
                    
                    {/* Reference : 
                            React-Bootstrap.Alerts           
                                Link :
                                [ https://react-bootstrap.github.io/components/alerts/ ]  */}

                    <Alert variant="info">Login to join our game!</Alert>
                    <div className='styleContainer'>
                        <img id='userPfp' src={loginImg} alt='avatar' />
                    </div>
                    <Card.Body>
                        <Card.Text>
                            <select onChange={this.handleChange} className='selectOptions' defaultValue='hint'>
                                <option value='hint' disabled>LoginCharacter...</option>
                                    {ls.map((user, idx) => (
                                    <option key={user.id} value={idx}>{user.name}</option>
                                    ))}
                            </select>
                        </Card.Text>
                        <Button onClick={this.handleSubmit} variant="outline-danger">Login</Button>                        
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => ({
    users,
})

export default connect(mapStateToProps)(LoginPage)