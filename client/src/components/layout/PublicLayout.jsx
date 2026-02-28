import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";

const PublicLayout = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#f8f5ee] via-[#f4fdf9] to-[#f7f3eb] text-slate-900">
    <PublicNavbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
