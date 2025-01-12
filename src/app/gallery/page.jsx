import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GalleryPage from "@/app/gallery/GalleryPage"

export const metadata = {
  title: "Riya Industry | Gallery "
}

export default function Home() {
  return (
    <>
      <Navbar/>
      <GalleryPage/>
      <Footer />
    </>
  )
}