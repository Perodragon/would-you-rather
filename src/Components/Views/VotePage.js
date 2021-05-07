import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

import { handleAnswerQuestion } from '../../Actions/shared'

import AnsweredQuestion from '../Subcomponents/VoteResults'
import ErrorPage from './ErrorPage'

class VotePage extends Component {

    state = {
        port: '',
        UiAnswer: '',
        err: false
    }

    componentDidMount() {

        const { question, authedUser } = this.props

        if (question) {
            const voted = question.optionOne.votes.includes(authedUser.id) || 
                          question.optionTwo.votes.includes(authedUser.id)

            if (voted) {
                this.setState({
                    port: 'answered'
                })
            }
        }
    }

    handleChange = (evt) => {
        this.setState({
            UiAnswer: evt.target.value
        })
    }

    handleSubmit = async (evt, questionId) => {

        const { UiAnswer } = this.state
        const { dispatch } = this.props

        evt.preventDefault()

        if (UiAnswer === '') {
            this.setState({
                err: true
            })
        } else {
            this.setState({
                err: false
            })
            await dispatch(handleAnswerQuestion(questionId, UiAnswer))
            this.setState({
                port: 'answered'
            })
        }
    }

    render() {

        const { author, authedUser, question } = this.props
        const { port, err } = this.state
        let display = ''

        if (!question || !author) {
            return (
                <ErrorPage/>
            )
        }

        /* Reference : 
                    React Conditional Rendering           
                Link :
                [ https://reactjs.org/docs/conditional-rendering.html ] */

        if (port === 'answered') {
            display = <AnsweredQuestion 
                            question={question} 
                            author={author} 
                            authedUser={authedUser} 
                      />
        } else {
            display =
                <div>
                    <div className='vote'>
                        <h3 className='starterVt'>Would you rather?</h3>
                    </div>
                    <form 
                        onSubmit={(event) => 
                            this.handleSubmit(event, question.id)
                        }>
                        <input 
                            type='radio' 
                            value='optionOne' 
                            name='vote' 
                            onChange={this.handleChange} 
                        />
                            {' '}{question.optionOne.text}
                        <br/>
                        <input 
                            type='radio' 
                            value='optionTwo' 
                            name='vote' 
                            onChange={this.handleChange} 
                        />
                            {' '}{question.optionTwo.text}
                        <br/>

                        {/* Reference : React Bootstrap
                            Link : 
                                [ https://react-bootstrap.github.io/components/buttons/ ] */}
                        <input 
                            className=' submitBtn btn btn-outline-danger' 
                            type='submit' 
                        />
                    </form>
                </div>
        }

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
                            Question.Vt 
                    </h2>
                    {err ?  <div 
                                className="alert alert-danger" 
                                role="alert"
                            >
                                Please Vote!
                            </div> 
                                : ''
                    }
                    <div className='questionVote'>
                        <img className='avt' src={author.avatarURL} alt='avatar' />
                        <h6>'{author.name}' {port === 'answered' ? 'stated within' : 'says'} ..</h6>
                        <br/>
                        {display}
                        <br/>
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {

    let { questions, users } = state
    let author
    const { question_id } = props.match.params
    const question = questions[question_id]    

    if (question) {
        author = users[question.author]
    }
    return {
        authedUser: state.authedUser,
        question,
        author: author === null ? '' : author
    }
}

export default connect(mapStateToProps)(VotePage)