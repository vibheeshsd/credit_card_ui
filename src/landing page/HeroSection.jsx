import React, { Component } from 'react'
import '../styles/Landing.css'

export default class HeroSection extends Component {
    constructor(props) {
        super(props)
        this.state = {}    
    }

    handleClick = () => {
         window.location.href = "/login"
     }
    render() {
        return (
            <div className="hero-section text-center grey text-white py-5">
                <h1 style={{color:'#323232'}}>Get the Credit Card That Fits Your Needs</h1>
                <p style={{color:'#323232'}} className="mt-3">Enjoy exclusive rewards, cashback, and much more!</p>
                <button className="btn btn-light btn-lg mt-4" onClick={this.handleClick}>Apply Now</button>
            </div>
        )
    }
}
