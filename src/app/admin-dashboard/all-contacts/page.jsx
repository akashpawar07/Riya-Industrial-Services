import Footer from "@/components/Footer";
import Admin_Navbar from "@/app/admin-dashboard/AdminNavbar";
import All_Contacts from '@/app/admin-dashboard/all-contacts/AllContacts'

export const metadata = {
  title: "Riya | All Contacts "
}

export default function Home() {
  return (
    <>
      <Admin_Navbar/>
      <All_Contacts/>
      <Footer />
    </>
  )
}