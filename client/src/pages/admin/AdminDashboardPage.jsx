import { useEffect, useState } from "react";
import http from "../../api/http";
import StatCard from "../../components/admin/StatCard";
import { formatDate } from "../../utils/format";

const AdminDashboardPage = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const { data } = await http.get("/dashboard/overview");
        setOverview(data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  if (loading) {
    return <div className="panel">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="panel text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={overview?.totalStudents || 0} />
        <StatCard label="Active Batches" value={overview?.activeBatches || 0} />
        <StatCard
          label="Present Today"
          value={overview?.attendanceSummary?.present || 0}
          hint={`Absent: ${overview?.attendanceSummary?.absent || 0}`}
        />
        <StatCard
          label="Pending Testimonials"
          value={overview?.pendingTestimonials || 0}
          hint={`Attendance marked: ${overview?.attendanceSummary?.total || 0}`}
        />
      </section>

      <section className="panel">
        <h2 className="text-xl font-semibold text-slate-900">Recent Inquiries</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-2 py-2 font-semibold">Name</th>
                <th className="px-2 py-2 font-semibold">Email</th>
                <th className="px-2 py-2 font-semibold">Date</th>
                <th className="px-2 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {(overview?.recentInquiries || []).map((inquiry) => (
                <tr key={inquiry._id} className="border-b border-slate-100">
                  <td className="px-2 py-3">{inquiry.name}</td>
                  <td className="px-2 py-3">{inquiry.email}</td>
                  <td className="px-2 py-3">{formatDate(inquiry.createdAt)}</td>
                  <td className="px-2 py-3">
                    {inquiry.resolved ? (
                      <span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-semibold text-brand-700">
                        Resolved
                      </span>
                    ) : (
                      <span className="rounded-full bg-sunrise-100 px-2 py-1 text-xs font-semibold text-sunrise-700">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!overview?.recentInquiries?.length ? (
            <p className="pt-4 text-sm text-slate-500">No inquiries yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
