import React, { Component } from 'react'
import CashBack from '../images/money-back.png'
import Perks from '../images/Perks.png'
import Secure from '../images/Secure Transactions.png'
import '../styles/Landing.css'

export default class BenefitsSection extends Component {
    render() {
        return (
            <div className="benefits-section py-5">
                <div className="container">
                    <h2 className="text-center customText mb-4">Why Choose Our Credit Card?</h2>
                    <div className="row">
                        <div className="card-1 col-md-4 text-center container" style={{width:"25%", boxShadow:"5px 5px 5px #4f6f52"}}>
                            <img src= {CashBack} alt='cashback-icon' style={{width:"15%", marginBottom:'5px'}}/>
                            <i className="bi bi-cash-coin display-4 mb-3"></i>
                            <h5>Cashback Rewards</h5>
                            <p>Earn up to 5% cashback on your credit card purchases, including online shopping, dining, and travel expenses. Maximize your savings with every swipe!</p>
                        </div>
                        <div className="card-1 col-md-4 text-center container" style={{width:"25%", boxShadow:"5px 5px 5px #4f6f52"}}>
                        <img src= {Secure} alt='cashback-icon' style={{width:"15%", marginBottom:'5px'}}/>
                            <i className="bi bi-shield-check display-4 mb-3"></i>
                            <h5>Secure Transactions</h5>
                            <p>Your safety is our priority with advanced security features like encryption, fraud detection, and zero-liability protection. Shop and transact with confidence knowing you're covered!</p>
                        </div>
                        <div className="card-1 col-md-4 text-center container" style={{width:"25%", boxShadow:"5px 5px 5px #4f6f52"}}>
                        <img src= {Perks} alt='cashback-icon' style={{width:"15%", marginBottom:'5px'}}/>
                            <i className="bi bi-star display-4 mb-3"></i>
                            <h5>Exclusive Perks</h5>
                            <p>Unlock access to premium memberships, exclusive deals, and personalized rewards. Enjoy VIP treatment and benefits tailored to your lifestyle!</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
