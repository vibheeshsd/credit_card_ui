import React, { Component } from 'react'
import HeroSection from '../landing page/HeroSection'
import BenefitsSection from '../landing page/BenefitsSection'

export default class Home extends Component {
  render() {
    return (
      <div>
        <HeroSection />
        <BenefitsSection />
      </div>
    )
  }
}
