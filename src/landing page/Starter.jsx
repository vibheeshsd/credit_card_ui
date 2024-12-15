import React, { Component } from 'react'
import Header from '../components/Header'
import HeroSection from './HeroSection'
import BenefitsSection from './BenefitsSection'
import RewardsSection from './RewardsSection'
import CardOptions from './CardOptions'
import TestimonialsSection from './TestimonialsSection'
import FAQSection from './FAQSection'
import CTASection from './CTASection'


export default class Starter extends Component {
    render() {
        return (
            <div>
                <Header />
                <HeroSection />
                <BenefitsSection />
                {/* <RewardsSection /> */}
                <CardOptions />
                <TestimonialsSection />
                <FAQSection />
                <CTASection />
            </div>
        )
    }
}
