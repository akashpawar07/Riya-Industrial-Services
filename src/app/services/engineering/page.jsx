import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import Engineering_Page from './Engineering_Page'

export const metadata = {
  title : "Riya Industry | Engineering"
}

export default function page() {
  return (
    <>
      <Navbar/>
      <Engineering_Page/>
      <Footer/>
    </>
  )
}
