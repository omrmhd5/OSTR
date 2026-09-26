import { Outlet } from "react-router";
import Footer from "./components/ui/Footer";
import NavBar from "./components/ui/NavBar";
import DemoBanner from "./components/DemoBanner";

export default function Layout() {
  return (
    <>
      <DemoBanner />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
