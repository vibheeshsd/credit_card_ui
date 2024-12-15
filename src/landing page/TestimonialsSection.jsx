import React, { Component } from 'react'
import man from '../images/man.png'
import gamer from '../images/gamer.png'
import woman from '../images/woman.png'


export default class TestimonialsSection extends Component {

  testimonials = [
    {
      name: 'John Doe',
      review: 'This credit card has amazing rewards and benefits!',
      image: man,
    },
    {
      name: 'Jane Smith',
      review: 'Best card for cashback rewards. Highly recommend!',
      image: woman,
    },
    {
      name: 'Alex',
      review: 'This credit card works well for student with more benefits',
      image : gamer
    }
  ];

  render() {
    return (
      <div className="testimonials-section">
      <h2 className=' customText fw-bold'>What Our Customers Say</h2>
      <div className="container">
        <div className="row">
          {this.testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-4">
              <div className="testimonial-card">
                <img src={testimonial.image} alt={testimonial.name} />
                <h5>{testimonial.name}</h5>
                <p>{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
  }
}
