import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

import Question from '../Subcomponents/Question'

class Questions extends Component {

    state = {
        Ls: [],        
        answeredLs: [],
        unansweredLs: [],        
        port: 'unanswered',
    }

    /* Reference : 
            React Navigation Tabs           
        Link :
          [ https://reactnavigation.org/docs/tab-based-navigation/ ] */

    handleportChange = (evt, actvPort) => {

        const { port } = this.state
        const currentport = document.getElementById(port)
        const reqPort = document.getElementById(actvPort)
        let currentLs = ''

        evt.preventDefault()
        
        currentport.classList.remove('port')
        reqPort.classList.add('port')        

        if (actvPort === 'unanswered') {
            currentLs = this.state.unansweredLs
        } else {
            currentLs = this.state.answeredLs
        }
        this.setState({
            port: actvPort,
            Ls: currentLs,
        })
    }

    componentDidMount() {

        const { questions, authedUser } = this.props

        if (questions) {
            let questionsLs = []
            for (let i in questions) {
                var question = questions[i]
                questionsLs.push(question)
            }

            let answeredLs = questionsLs.filter(
                (question) =>
                    question.optionOne.votes.includes(authedUser.id) ||
                    question.optionTwo.votes.includes(authedUser.id)
            )
            answeredLs = answeredLs.sort((a, b) =>
                a.timestamp > b.timestamp ? -1 : 1
            )

            let unansweredLs = questionsLs.filter(
                (question) =>
                    !question.optionOne.votes.includes(authedUser.id) &&
                    !question.optionTwo.votes.includes(authedUser.id)
            )
            unansweredLs = unansweredLs.sort((a, b) =>
                a.timestamp > b.timestamp ? -1 : 1
            )

            this.setState({
                answeredLs: answeredLs,
                unansweredLs: unansweredLs,
                Ls: unansweredLs,
            })
        }
    }

    render() {

        const { Ls, port } = this.state

        return (
            <div className='styleContainer'>
                <Card
                    style={{
                        width: '70%',
                        padding: '5px',
                        border: '2px solid red',
                    }}
                >
                    <h2 
                        style={{ 
                            padding: '20px', 
                            fontStyle:'italic', 
                            color: '#f10990',
                            fontSize:'50px',
                            fontWeight:'bold' 
                        }}>
                            Questions.Ls
                    </h2>
                    <div className='ports'>
                        <div
                            id='unanswered'
                            className='questionport port'
                            onClick={(evt) => this.handleportChange(evt, 'unanswered')}
                        >
                            Unanswered
                        </div>

                        <div
                            id='answered'
                            className='questionport'
                            onClick={(evt) => this.handleportChange(evt, 'answered')}
                        >
                            Answered
                        </div>
                    </div>

                    {Ls.map((question) => (
                        <Question
                            key={question.id}
                            question={question}
                            qSolve={port}
                        />
                    ))}
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, users, questions }) => ({
    authedUser,
    users,
    questions,
})

export default connect(mapStateToProps)(Questions)