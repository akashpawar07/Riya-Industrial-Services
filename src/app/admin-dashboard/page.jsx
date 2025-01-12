
import Footer from "@/components/Footer";
import Admin_Navbar from "@/app/admin-dashboard/AdminNavbar";
import AdminPage from "@/app/admin-dashboard/AdminPage";

export const metadata = {
  title: "Admin-Dashboard "
}

export default function Home() {
  return (
    <>
      <Admin_Navbar/>
      <AdminPage/>
      <Footer />
    </>
  )
}