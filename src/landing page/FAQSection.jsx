import React, { Component } from 'react'
import '../styles/Landing.css'

export default class FAQSection extends Component {

  faqs = [
    {
      question: 'What are the eligibility criteria?',
      answer: 'You need to be 18+ with a valid ID and proof of income.',
    },
    {
      question: 'How do I earn cashback?',
      answer: 'Cashback is earned on eligible purchases as per the card terms.',
    },
    {

      question: 'Are there any annual fees?',
      answer: 'Yes, there is an annual fee. Please refer to the card terms for detailed information.',
    },
    { 
      question: 'Can I use this card internationally?',
      answer: 'Yes, the card can be used for international transactions with no foreign transaction fees.',
    },
    {
      question: 'How do I redeem my cashback?',
      answer: 'You can redeem your cashback as a statement credit, direct deposit, or for gift cards, depending on the card issuer’s options.'
    }

  ];
  render() {
    return (
      <div className="faq-section customBackground">
      <h2>Frequently Asked Questions</h2>
      <div className="container">
        {this.faqs.map((faq, index) => (
          <div key={index} className="faq">
            <h5 className=' text-white'>{faq.question}</h5>
            <p className=' fw-bold'>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
    )
  }
}
