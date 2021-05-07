import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

class Leaderboard extends Component {

    state = {
        checkboard: []
    }

    componentDidMount() {

        const { users } = this.props

        if (users) {
            let checkboard = []
            for (let i in users) {
                var user = users[i]
                let answersCounter = Object.keys(user.answers).length
                let questionsCounter = user.questions.length
                let authedUser = {
                    id: user.id,
                    name: user.name,
                    answersCounter,
                    questionsCounter,
                    avatarURL: user.avatarURL,
                    score: (questionsCounter + answersCounter)
                }
                checkboard.push(authedUser)
            }   

            /* Reference : 
                        Javascript Sort Method           
                    Link :
                    [ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort ] */

            checkboard = checkboard.sort((a, b) => (a.score > b.score) ? -1 : 1)
            this.setState({
                checkboard
            })

        }
    }

    render() {

        const { checkboard } = this.state

        return (
            <div className='styleContainer'>

            {/* Reference : 
                        React-Bootstrap.Cards           
                    Link :
                    [ https://react-bootstrap.github.io/components/cards/ ] */}

                <Card 
                    style={{ width: '70%', 
                    padding: '5px', 
                    border: '2px solid red' 
                }}>
                    <h2 
                        style={{ 
                            padding: '20px', 
                            fontStyle:'italic', 
                            color: '#f10990',
                            fontSize:'50px',
                            fontWeight:'bold'
                            }}>
                                Leaderboard.Ch
                    </h2>
                    <div className='checkboardVs' >
                        {checkboard.map((user) => (
                            <div key={user.id} className='userboard'>
                                <img className='avt' src={user.avatarURL} alt='avt'/>
                                <h2>{user.name}</h2>  
                                <br/>
                                <div className="scoreboard">[ Score:{user.score} ]</div>
                                <br/>
                                <span>
                                    <p>(1). Asked Questions: ( {user.questionsCounter} ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <br/>
                                           (2). Answered Questions: ( {user.answersCounter} )
                                    </p>
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => ({
    users,
})

export default connect(mapStateToProps)(Leaderboard)