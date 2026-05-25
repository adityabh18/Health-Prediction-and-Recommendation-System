import React from 'react'
import Navbar from '../components/Navbar'
import HomeContent from '../components/HomeContent'
import WhyChoose from '../components/WhyChoose'
import SymptomSection from '../components/SymptomSection'
import VoicesOfTrust from '../components/VoicesOfTrust'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <HomeContent/>
        <WhyChoose/>
        <SymptomSection/>
        <VoicesOfTrust/>
        <Footer/>
    </div>
  )
}

export default Home