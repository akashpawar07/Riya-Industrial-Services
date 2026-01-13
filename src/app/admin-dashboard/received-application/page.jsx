import Footer from "@/components/Footer";
import Admin_Navbar from "@/app/admin-dashboard/AdminNavbar";
import AllApplicantsPage from "@/app/admin-dashboard/received-application/AllApplicantsPage";

export const metadata = {
    title: "Riya | Job Application "    
}

export default function Home() {
    return (
        <>
            <Admin_Navbar />
            <AllApplicantsPage/>
            <Footer />
        </>
    )
}