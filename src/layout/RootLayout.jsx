import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default RootLayout