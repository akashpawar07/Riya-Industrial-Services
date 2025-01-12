
import Link from "next/link";
import HomePage from "@/app/homePage"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Riya Industry"
}

export default function Home() {
  return (
    <>
      <Navbar/>
      <HomePage/>
      <Footer />
    </>
  )
}
