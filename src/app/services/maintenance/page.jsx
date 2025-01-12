import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Maintenance_Page from "@/app/services/maintenance/Maintenance_Page";

export const metadata = {
  title: "Riya Industry | Maintenance "
}

export default function Home() {
  return (
    <>
      <Navbar/>
      <Maintenance_Page/>
      <Footer />
    </>
  )
}