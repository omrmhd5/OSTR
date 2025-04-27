import { Outlet } from "react-router";
import Footer from "./components/ui/Footer";
import NavBar from "./components/ui/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
