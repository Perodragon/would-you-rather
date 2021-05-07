import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Question extends Component {

    state = {
        author: {}
    }

    componentDidMount() {

        const { question, users } = this.props
        let author = users[question.author]

        author = {
            name: author.name,
            avatarURL: author.avatarURL
        }

        this.setState({
            author
        })
    }

    render() {

        const { question, qSolve } = this.props
        const { author } = this.state

        return (
            <div className='styleContainer'>
                <div className='questionDetails'>
                    <img className='avt' src={author.avatarURL} alt='avatar' />
                    <h6>'{author.name}' {qSolve === 'unanswered' ? 'says' : 'stated within'} .. </h6>
                    <br />
                    <h4 className='starter'>Would you rather? ... </h4>
                    <p> ( {question.optionOne.text} [Or] ... !! )</p>
                    <Link to={{ pathname: `questions/${question.id}`, question, author, qSolve }}>
                        <button className='btn btn-outline-danger'>Details</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => ({
    users,
})

export default connect(mapStateToProps)(Question)