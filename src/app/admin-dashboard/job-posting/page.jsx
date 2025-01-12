import Footer from "@/components/Footer";
import Admin_Navbar from "@/app/admin-dashboard/AdminNavbar";
import JobPosting from "@/app/admin-dashboard/job-posting/JobPosting";

export const metadata = {
  title: "Riya | Job Posting "
}

export default function Home() {
  return (
    <>
      <Admin_Navbar/>
      <JobPosting/>
      <Footer />
    </>
  )
}