import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import http from "../../api/http";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

const ContactPage = () => {
  const [form, setForm] = useState(initialState);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await http.get("/settings/public-profile");
        setProfile(data.profile || null);
      } catch (error) {
        setProfile(null);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await http.post("/inquiries/public", form);
      setStatus({
        type: "success",
        message: "Thank you. Your message has been submitted successfully."
      });
      setForm(initialState);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to submit inquiry."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-shell py-14">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Contact Us</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Start Your English Journey Today</h1>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="panel space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-slate-700">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="field"
              required
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Submitting..." : "Send Message"}
          </button>
          {status.message ? (
            <p className={`text-sm ${status.type === "success" ? "text-brand-700" : "text-red-600"}`}>
              {status.message}
            </p>
          ) : null}
        </form>

        <div className="panel">
          <h2 className="text-2xl font-semibold text-slate-900">Visit Namo Academy</h2>
          <p className="mt-3 text-sm text-slate-600">
            {profile?.address || "21 Brightstone Avenue, Learning District"}
            <br />
            Phone: {profile?.phone || "+91 7058932710"}
            <br />
            Email: {profile?.email || "namo.academy1027@gmail.com"}
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <iframe
              title="Namo Academy Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d383.52883422525383!2d74.25584573168004!3d21.38877150291794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1772258863191!5m2!1sen!2sin"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
