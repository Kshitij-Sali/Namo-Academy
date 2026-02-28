import { motion } from "framer-motion";
import FounderSection from "../../components/public/FounderSection";

const timeline = [
  {
    year: "2024",
    title: "Academy Founded",
    detail: "Namo Academy started with a mission to make English learning practical and confidence-driven."
  },
  {
    year: "2025",
    title: "Program Expansion",
    detail: "Introduced structured Phonics Reading Program tracks for multiple age groups."
  },
  {
    year: "2025",
    title: "Digital Learning Support",
    detail: "Added hybrid resources, progress dashboards, and regular parent updates."
  }
];

const AboutPage = () => (
  <div className="section-shell py-14">
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">About Namo Academy</p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">Our Vision and Teaching Approach</h1>
      <p className="mt-4 max-w-3xl text-slate-700">
        We focus on fluency, grammar clarity, and communication confidence through activity-based
        sessions, speaking labs, and performance-focused mentoring.
      </p>
    </motion.div>

    <section className="mt-10 grid gap-6 md:grid-cols-2">
      <article className="panel">
        <h2 className="text-2xl font-semibold text-slate-900">Teaching Methodology</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li>Level-wise classroom planning with diagnostic assessments.</li>
          <li>Daily speaking tasks and guided pronunciation drills.</li>
          <li>Weekly grammar practice sheets and writing reviews.</li>
          <li>Monthly performance reports for students and parents.</li>
        </ul>
      </article>
      <article className="panel">
        <h2 className="text-2xl font-semibold text-slate-900">Faculty Highlights</h2>
        <p className="mt-4 text-sm text-slate-700">
          Our trainers are experienced English educators with a student-centric teaching style.
          Sessions are interactive, adaptive, and aligned to student goals.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-brand-50 p-3">
            <p className="font-semibold text-brand-700">Senior Language Trainer</p>
            <p className="text-xs text-slate-600">Spoken English & Communication Skills</p>
          </div>
          <div className="rounded-xl bg-sunrise-50 p-3">
            <p className="font-semibold text-sunrise-700">Exam Coach</p>
            <p className="text-xs text-slate-600">School and Competitive Exam Preparation</p>
          </div>
        </div>
      </article>
    </section>

    <FounderSection />

    <section className="mt-12">
      <h2 className="text-3xl font-bold text-slate-900">Journey Timeline</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {timeline.map((item, index) => (
          <motion.article
            key={item.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="panel"
          >
            <p className="text-sm font-bold text-brand-700">{item.year}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  </div>
);

export default AboutPage;
