import { motion } from "framer-motion";
import { GraduationCap, Users, Speech } from "lucide-react";

const courses = [
  {
    title: "Grammar Foundation",
    level: "Beginner to Intermediate",
    duration: "12 weeks",
    batch: "Weekends",
    icon: GraduationCap
  },
  {
    title: "Spoken English Mastery",
    level: "Intermediate",
    duration: "10 weeks",
    batch: "Weekdays",
    icon: Users
  },
  {
    title: "Phonics Reading Program",
    level: "School + Competitive",
    duration: "14 weeks",
    batch: "Weekday + Weekends",
    icon: Speech
  }
];

const CoursesPage = () => (
  <div className="section-shell py-14">
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Programs & Batches</p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">Courses for Every Learning Stage</h1>
      <p className="mt-4 max-w-3xl text-slate-700">
        Age-wise and goal-oriented programs to help students build confidence, clarity, and exam
        readiness.
      </p>
    </motion.div>

    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {courses.map((course, index) => {
        const Icon = course.icon;
        return (
          <motion.article
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="group rounded-3xl border border-brand-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <span className="inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
              <Icon size={22} />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">{course.title}</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Level:</span> {course.level}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Duration:</span> {course.duration}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Batch:</span> {course.batch}
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  </div>
);

export default CoursesPage;
