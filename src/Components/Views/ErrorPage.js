import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import errImg from '../../UnknownImg/Error404.jpg'

/* Reference : 
            React 404 Page Not-Found            
        Link :
          [ https://ultimatecourses.com/blog/react-router-not-found-component ] */

export default class ErrorPage extends Component {
    render() {
        return (
            <div className='errContainer styleContainer' >
                <br/>
                <h1>Error - Not Found!</h1> 
                <br/>
                <h3>Something wrong occurred, Please try again!</h3>
                <br/>    
                <img id='errImg' src={errImg} alt='error' /> 
                <br/>  
                <br/>           
                <Link to="/">
                    <button className='btn btn-outline-danger'>Go Home</button>
                </Link>
            </div>
        )
    }
}