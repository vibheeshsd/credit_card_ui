import React, { Component } from 'react'
import '../styles/Landing.css'

export default class RewardsSection extends Component {
    render() {
        return (
            <div className="rewards-section">
                <h2>Unlock Exclusive Rewards</h2>
                <div className="container">
                    <p className="reward"><i className="bi bi-cash-coin icon"></i> Up to 5% cashback</p>
                    <p className="reward"><i className="bi bi-gift icon"></i> Birthday surprises</p>
                    <p className="reward"><i className="bi bi-card-checklist icon"></i> Priority services</p>
                </div>
            </div>
        )
    }
}
