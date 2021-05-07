import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

import { handleSaveQuestion } from '../../Actions/shared'

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        added: false
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit = async (event) => {

        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props

        event.preventDefault()
        await dispatch(handleSaveQuestion(optionOne, optionTwo))
        this.setState({
            added: true
        })
    }

    render() {

        const { optionOne, optionTwo, added } = this.state

        if (added) {
            return (<Redirect to='/'/>)
        }

        return (
            <div className='styleContainer'>
                <Card style={{ width: '70%', padding: '20px', border: '2px solid red' }}>
                    <h2 style={{ 
                            margin: '30px',  
                            fontFamily: 'cursive', 
                            fontWeight: 'bold', 
                            fontSize:'60px',
                            color: '#f10990',
                            outlineStyle: 'dashed',   
                            padding: '6px'                         
                        }}>
                            Would you Rather?
                    </h2>
                    <br/>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            onChange={this.handleChange} 
                            type='text' 
                            value={optionOne} 
                            name='optionOne' 
                            placeholder='Option (A): .....' 
                        />
                        <br/>
                        <br/>
                        <input 
                            onChange={this.handleChange} 
                            type='text' 
                            value={optionTwo} 
                            name='optionTwo' 
                            placeholder='Option (B): .....' 
                        />
                        <br/>
                        <input 
                            className='btn btn-outline-danger' 
                            type='submit'>
                        </input>
                    </form>
                </Card>
            </div >
        )
    }
}

export default connect()(NewQuestion)