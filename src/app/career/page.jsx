import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CareerPage from "@/app/career/CareerPage"

export const metadata = {
  title: "Riya Industry | Career "
}

export default function Home() {
  return (
    <>
      <Navbar/>
      <CareerPage/>
      <Footer />
    </>
  )
}
