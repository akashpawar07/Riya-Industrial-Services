import React from 'react'
import Navbar from '@/components/Navbar'
import StrengthsPage from '@/components/Strengths'
import Footer from '@/components/Footer'

export const metadata = {
 title : "Riya Industry | Our Strength"
}

export default function page() {
  return (
    <div>
      <Navbar/>
      <StrengthsPage/>
      <Footer/>
    </div>
  )
}
