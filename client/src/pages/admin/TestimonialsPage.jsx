import { useEffect, useState } from "react";
import http from "../../api/http";
import { formatDate } from "../../utils/format";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTestimonials = async (status = statusFilter) => {
    try {
      const { data } = await http.get("/testimonials", {
        params: status ? { status } : {}
      });
      setTestimonials(data.testimonials || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials(statusFilter);
  }, [statusFilter]);

  const approveTestimonial = async (id) => {
    try {
      await http.patch(`/testimonials/${id}/approve`);
      setTestimonials((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, approved: true, approvedAt: new Date().toISOString() } : item
        )
      );
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to approve testimonial.");
    }
  };

  const removeTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) {
      return;
    }

    try {
      await http.delete(`/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((item) => item._id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to delete testimonial.");
    }
  };

  if (loading) {
    return <div className="panel">Loading testimonials...</div>;
  }

  return (
    <section className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">Student Testimonials Approval</h2>
        <div className="flex items-end gap-2">
          <div>
            <label htmlFor="testimonialStatusFilter" className="mb-1 block text-xs font-semibold text-slate-600">
              Filter Status
            </label>
            <select
              id="testimonialStatusFilter"
              value={statusFilter}
              onChange={(event) => {
                setLoading(true);
                setStatusFilter(event.target.value);
              }}
              className="field w-36"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <button type="button" className="btn-outline" onClick={() => loadTestimonials(statusFilter)}>
            Refresh
          </button>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-2 py-2 font-semibold">Student</th>
              <th className="px-2 py-2 font-semibold">Email</th>
              <th className="px-2 py-2 font-semibold">Message</th>
              <th className="px-2 py-2 font-semibold">Submitted</th>
              <th className="px-2 py-2 font-semibold">Status</th>
              <th className="px-2 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial._id} className="border-b border-slate-100 align-top">
                <td className="px-2 py-3 font-semibold text-slate-900">{testimonial.name}</td>
                <td className="px-2 py-3 text-slate-700">{testimonial.email}</td>
                <td className="px-2 py-3 text-slate-700">{testimonial.message}</td>
                <td className="px-2 py-3">{formatDate(testimonial.createdAt)}</td>
                <td className="px-2 py-3">
                  {testimonial.approved ? (
                    <span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-semibold text-brand-700">
                      Approved
                    </span>
                  ) : (
                    <span className="rounded-full bg-sunrise-100 px-2 py-1 text-xs font-semibold text-sunrise-700">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-wrap gap-2">
                    {!testimonial.approved ? (
                      <button
                        type="button"
                        onClick={() => approveTestimonial(testimonial._id)}
                        className="rounded-full bg-brand-100 px-3 py-1.5 text-xs font-semibold text-brand-700"
                      >
                        Approve
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removeTestimonial(testimonial._id)}
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
        {!testimonials.length ? <p className="pt-3 text-sm text-slate-500">No testimonials found.</p> : null}
      </div>
    </section>
  );
};

export default TestimonialsPage;
