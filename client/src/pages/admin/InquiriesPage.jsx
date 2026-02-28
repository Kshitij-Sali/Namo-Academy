import { useEffect, useState } from "react";
import http from "../../api/http";
import { formatDate } from "../../utils/format";

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInquiries = async () => {
    try {
      const { data } = await http.get("/inquiries");
      setInquiries(data.inquiries || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to fetch inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const resolveInquiry = async (id) => {
    try {
      await http.patch(`/inquiries/${id}/resolve`);
      setInquiries((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, resolved: true, resolvedAt: new Date().toISOString() } : item
        )
      );
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to resolve inquiry.");
    }
  };

  const removeInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) {
      return;
    }

    try {
      await http.delete(`/inquiries/${id}`);
      setInquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to delete inquiry.");
    }
  };

  if (loading) {
    return <div className="panel">Loading inquiries...</div>;
  }

  return (
    <section className="panel">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Contact Inquiries</h2>
        <button type="button" className="btn-outline" onClick={loadInquiries}>
          Refresh
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-2 py-2 font-semibold">Name</th>
              <th className="px-2 py-2 font-semibold">Contact</th>
              <th className="px-2 py-2 font-semibold">Message</th>
              <th className="px-2 py-2 font-semibold">Date</th>
              <th className="px-2 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry._id} className="border-b border-slate-100 align-top">
                <td className="px-2 py-3">
                  <p className="font-semibold text-slate-900">{inquiry.name}</p>
                  <p className="text-xs text-slate-500">
                    {inquiry.resolved ? "Resolved" : "Pending"}
                  </p>
                </td>
                <td className="px-2 py-3 text-slate-700">
                  {inquiry.email}
                  <br />
                  {inquiry.phone}
                </td>
                <td className="px-2 py-3 text-slate-700">{inquiry.message}</td>
                <td className="px-2 py-3">{formatDate(inquiry.createdAt)}</td>
                <td className="px-2 py-3">
                  <div className="flex flex-wrap gap-2">
                    {!inquiry.resolved ? (
                      <button
                        type="button"
                        onClick={() => resolveInquiry(inquiry._id)}
                        className="rounded-full bg-brand-100 px-3 py-1.5 text-xs font-semibold text-brand-700"
                      >
                        Mark Resolved
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removeInquiry(inquiry._id)}
                      className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!inquiries.length ? <p className="pt-3 text-sm text-slate-500">No inquiries found.</p> : null}
      </div>
    </section>
  );
};

export default InquiriesPage;
