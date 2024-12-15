import React, { Component } from 'react'
import '../styles/Landing.css'

export default class CardOptions extends Component {

  cards = [
    { name: 'Platinum Card', description: 'Perfect for frequent travelers, offering exclusive airport lounge access, enhanced rewards on travel-related purchases, and special discounts at top destinations. Experience luxury and convenience on every journey!' },
    { name: 'Gold Card', description: 'Maximize your savings with the best cashback rewards card. Earn up to 5% cashback on everyday purchases, from groceries to dining and online shopping. Watch your rewards add up with every transaction!' },
    { name: 'Student Card', description: 'A perfect start for students building their credit. With no credit history required, earn rewards, enjoy low fees, and build your credit score responsibly. Get financial freedom early on' },
  ];

  render() {
    return (
      <div className="card-options py-5 customBackground" style={{}}>
      <div className="container">
        <h2 className="text-center mb-4">Choose Your Card</h2>
        <div className="row">
          {this.cards.map((card, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center" style={{boxShadow:"5px 5px 5px #4f6f52"}}>
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.description}</p>
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
  }
}
