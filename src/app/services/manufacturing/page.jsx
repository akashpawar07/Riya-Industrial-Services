import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ManufacutigPage from "@/app/services/manufacturing/Manufacturing_Page"

export const metadata = {
  title: "Riya Industry | Manufacturing "
}

export default function Home() {
  return (
    <>
      <Navbar/>
      <ManufacutigPage/>
      <Footer />
    </>
  )
}