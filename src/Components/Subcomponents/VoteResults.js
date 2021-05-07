import React, { Component } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

/* Reference : 
            React-Redux Counter Example           
        Link :
          [ https://daveceddia.com/how-does-redux-work/ ] */

const voteCounter = (question) => {

    let state = {}

    let optionOneCounter = (question.optionOne.votes).length
    let optionTwoCounter = (question.optionTwo.votes).length
    let sum = optionOneCounter + optionTwoCounter
    let firstPg = ((optionOneCounter / sum) * 100).toFixed(0)
    let secondPg = ((optionTwoCounter / sum) * 100).toFixed(0)
    
    state = {
        optionA: optionOneCounter,
        optionB: optionTwoCounter,
        sum,
        optionALs: firstPg,
        optionBLs: secondPg
    }
    return state
}

export default class AnsweredQuestion extends Component {

    render() {

        const { question, authedUser } = this.props
        const voteChecker = voteCounter(question)
        let qSolve = ''
        let optionOne, optionTwo

        if (question.optionOne.votes.includes(authedUser.id)) {
            qSolve = 'optionOne'
        } else if (question.optionTwo.votes.includes(authedUser.id)) {
            qSolve = 'optionTwo'
        }

        return (
            <div className='voteDisplay'>
                <br/>
                <h6 className='voteTitle'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ Results ]</h6>
                <br/>
                <div className='styleContainer'>
                    <h4 className='rather'>Would you rather?</h4>
                </div>

                <div className={optionOne}>                    
                    <p>{question.optionOne.text}</p>
                    <h5>{qSolve === 'optionOne' ? '-->[Selected]<--' : ''}</h5>

                    {/* Reference : 
                            React-Bootstrap.Progressbar           
                                Link :
                                [ https://react-bootstrap.github.io/components/progress/ ] */}

                    <ProgressBar 
                        now={voteChecker.optionALs} 
                        label={`${voteChecker.optionALs}%`}
                    />
                    <p className='res'>
                        {voteChecker.optionA} out of {voteChecker.sum} votes
                    </p>
                </div>

                <div className={optionTwo}>                   
                    <p>{question.optionTwo.text} </p>
                    <h5>{qSolve === 'optionTwo' ? '-->[Selected]<--' : ''}</h5>
                    <ProgressBar 
                        now={voteChecker.optionBLs} 
                        label={`${voteChecker.optionBLs}%`} 
                    />
                    <p className='res'>
                        {voteChecker.optionB} out of {voteChecker.sum} votes
                    </p>
                </div>
            </div>
        )
    }
}