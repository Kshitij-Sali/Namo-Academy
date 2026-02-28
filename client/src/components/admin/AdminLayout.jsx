import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BookOpenText,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Settings
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import BrandLogo from "../common/BrandLogo";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/students", label: "Students", icon: BookOpenText },
  { to: "/admin/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/admin/inquiries", label: "Inquiries", icon: Mail },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const navClasses = useMemo(
    () =>
      ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
          isActive
            ? "bg-brand-600 text-white"
            : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
        }`,
    []
  );

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f2f7f6]">
      <aside
        className={`fixed left-0 top-0 z-30 h-full w-72 border-r border-slate-200 bg-white p-5 shadow-soft transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-100 pb-4">
          <BrandLogo to="/admin/dashboard" />
          <p className="mt-1 text-xs text-slate-500">Admin Portal</p>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink key={link.to} to={link.to} className={navClasses} onClick={() => setOpen(false)}>
                <Icon size={16} />
                {link.label}
              </NavLink>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-sunrise-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sunrise-600"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      <div className="flex w-full flex-col lg:ml-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Welcome back</p>
            <h1 className="font-heading text-lg font-bold text-slate-900">{admin?.name}</h1>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
