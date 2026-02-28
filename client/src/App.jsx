import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import CoursesPage from "./pages/public/CoursesPage";
import ContactPage from "./pages/public/ContactPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import StudentsPage from "./pages/admin/StudentsPage";
import AttendancePage from "./pages/admin/AttendancePage";
import InquiriesPage from "./pages/admin/InquiriesPage";
import TestimonialsPage from "./pages/admin/TestimonialsPage";
import SettingsPage from "./pages/admin/SettingsPage";

const App = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Route>

    <Route path="/admin/login" element={<AdminLoginPage />} />

    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="students" element={<StudentsPage />} />
      <Route path="attendance" element={<AttendancePage />} />
      <Route path="inquiries" element={<InquiriesPage />} />
      <Route path="testimonials" element={<TestimonialsPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
