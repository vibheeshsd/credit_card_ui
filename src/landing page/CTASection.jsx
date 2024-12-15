import React, { Component } from 'react'
import Login from '../pages/Login'

export default class CTASection extends Component {

  handleClick = () => {
    window.location.href = "/login"
}
  render() {
    return (
      <div className="cta-section text-dark py-5">
        <h2>Start Your Journey Today</h2>
        <p className="mt-3">Don't miss out on exclusive rewards and benefits.</p>
        <button className="btn btn-lg mt-4" onClick={this.handleClick}>Apply Now</button>
      </div>
    )
  }
}
