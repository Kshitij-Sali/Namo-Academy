import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../api/http";

const statsFallback = {
  yearsExperience: 8,
  studentsTaught: 1200,
  successRate: 95
};

const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [testimonialStatus, setTestimonialStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await http.get("/settings/public-profile");
        setProfile(data.profile);
      } catch (error) {
        setProfile(null);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const { data } = await http.get("/testimonials/public");
        setTestimonials(data.testimonials || []);
      } catch (error) {
        setTestimonials([]);
      } finally {
        setTestimonialsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const handleTestimonialChange = (event) => {
    const { name, value } = event.target;
    setTestimonialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonialSubmit = async (event) => {
    event.preventDefault();
    setTestimonialStatus({ type: "", message: "" });

    try {
      await http.post("/testimonials/public", testimonialForm);
      setTestimonialForm({ name: "", email: "", message: "" });
      setShowTestimonialForm(false);
      setTestimonialStatus({
        type: "success",
        message: "Submitted successfully. It will appear after admin approval."
      });
    } catch (error) {
      setTestimonialStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to submit testimonial."
      });
    }
  };

  const stats = profile || statsFallback;

  return (
    <div>
      <section className="bg-hero-grid">
        <div className="section-shell py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="inline-flex rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              English Tuition Institute
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              {profile?.heroTitle || "Master English with Confidence at Namo Academy"}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-700">
              Structured Spoken English, Grammar Mastery, and Phonics Reading through interactive
              sessions designed for measurable progress.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Enroll Now
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell mt-14 grid gap-4 md:grid-cols-3">
        {[
          { label: "Years of Experience", value: `${stats.yearsExperience}+` },
          { label: "Students Trained", value: `${stats.studentsTaught}+` },
          { label: "Success Rate", value: `${stats.successRate}%` }
        ].map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="panel"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 font-heading text-4xl font-bold text-brand-700">{item.value}</p>
          </motion.article>
        ))}
      </section>

      <section className="section-shell mt-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Programs</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Courses Built for Real Results</h2>
          </div>
          <Link to="/courses" className="btn-outline inline-flex self-start sm:self-auto">
            View All Courses
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Grammar Foundation",
            "Spoken English Mastery",
            "Phonics Reading Program"
          ].map((course, index) => (
            <motion.div
              key={course}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="group rounded-2xl border border-brand-100 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <h3 className="text-xl font-semibold text-slate-900">{course}</h3>
              <p className="mt-3 text-sm text-slate-600">
                Practical tasks, guided mentoring, and weekly progress tracking for every learner.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-700">
                Learn more -&gt;
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold text-slate-900">Student Testimonials</h2>
          <button
            type="button"
            onClick={() => setShowTestimonialForm((prev) => !prev)}
            className="btn-outline inline-flex self-start sm:self-auto"
          >
            {showTestimonialForm ? "Close" : "Add Testimonial"}
          </button>
        </div>

        {showTestimonialForm ? (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            onSubmit={handleTestimonialSubmit}
            className="panel mt-6 grid gap-4 md:grid-cols-2"
          >
            <div>
              <label htmlFor="testimonialName" className="mb-1 block text-sm font-semibold text-slate-700">
                Your Name
              </label>
              <input
                id="testimonialName"
                name="name"
                type="text"
                value={testimonialForm.name}
                onChange={handleTestimonialChange}
                placeholder="Enter your name"
                className="field"
                required
              />
            </div>
            <div>
              <label htmlFor="testimonialEmail" className="mb-1 block text-sm font-semibold text-slate-700">
                Your Email
              </label>
              <input
                id="testimonialEmail"
                name="email"
                type="email"
                value={testimonialForm.email}
                onChange={handleTestimonialChange}
                placeholder="Enter your email"
                className="field"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="testimonialMessage" className="mb-1 block text-sm font-semibold text-slate-700">
                Testimonial
              </label>
              <textarea
                id="testimonialMessage"
                name="message"
                value={testimonialForm.message}
                onChange={handleTestimonialChange}
                placeholder="Share your learning experience at Namo Academy"
                className="field"
                rows={4}
                required
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary">
                Submit for Approval
              </button>
            </div>
          </motion.form>
        ) : null}

        {testimonialStatus.message ? (
          <p
            className={`mt-4 text-sm ${
              testimonialStatus.type === "success" ? "text-brand-700" : "text-red-600"
            }`}
          >
            {testimonialStatus.message}
          </p>
        ) : null}

        {testimonialsLoading ? <p className="mt-8 text-sm text-slate-500">Loading testimonials...</p> : null}

        {!testimonialsLoading && testimonials.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={testimonial._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="panel border-l-4 border-l-sunrise-400"
              >
                <p className="text-sm text-slate-700">"{testimonial.message}"</p>
                <footer className="mt-3 text-sm font-semibold text-brand-700">{testimonial.name}</footer>
              </motion.blockquote>
            ))}
          </div>
        ) : null}

        {!testimonialsLoading && !testimonials.length ? (
          <div className="panel mt-8">
            <p className="text-sm text-slate-600">
              No approved testimonials yet. Submit one and it will appear after admin approval.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default HomePage;
