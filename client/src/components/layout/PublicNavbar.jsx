import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandLogo from "../common/BrandLogo";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Contact", to: "/contact" }
];

const baseNavClass =
  "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200";

const PublicNavbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `${baseNavClass} ${
      isActive ? "bg-brand-600 text-white" : "text-slate-700 hover:bg-brand-100"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-[#f8f5ee]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <BrandLogo />

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg border border-brand-200 p-2 text-brand-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/admin/login"
            className="ml-2 rounded-full bg-sunrise-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sunrise-600"
          >
            Admin Login
          </Link>
        </div>
      </nav>

      {open && (
        <div className="mx-4 mb-4 rounded-2xl border border-brand-100 bg-white p-4 shadow-soft md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-sunrise-500 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
