import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <div className="d-flex align-items-center fixed-bottom" style={{height:'70px' ,backgroundColor: '#4f6f52', 
        color: 'white',justifyContent:'center', fontWeight:'bold'}} >
        <p >&copy; 2024 Credit Card Management System. All rights reserved.</p>
      </div>
    )
  }
}
    

