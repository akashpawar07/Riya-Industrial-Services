import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactPage from "@/app/contact/ContactPage"

export const metadata = {
  title: "Riya Industry | Contact Us"
}

export default function Home() {
  return (
    <>
      <Navbar/>
      <ContactPage/>
      <Footer />
    </>
  )
}
