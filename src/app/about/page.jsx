import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutPage from "@/app/about/AboutPage"

export const metadata = {
  title: "Riya Industry | About Us "
}

export default function Home() {
  return (
    <>
      <Navbar/>
      <AboutPage/>
      <Footer />
    </>
  )
}