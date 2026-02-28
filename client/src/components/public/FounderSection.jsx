import { motion } from "framer-motion";
import founderImage from "../../assets/profile.jpg";

const founderInfo = {
  name: "Mrs. Rajshri Kshirsagar",
  qualification: "M.A. (English), M. Ed., NET & SET, DSM",
  experience: "10+ Years of Teaching Experience",
  specialization: ["Phonics", "Spoken English", "Grammar"],
  message:
    "Language is not just a subject, but a powerful tool for confidence and self-expression. At Namo Academy, my mission is to nurture strong communication skills and a deep understanding of English through structured learning, personal attention, and a supportive environment for every student."
};

const FounderSection = () => (
  <section
    aria-labelledby="founder-heading"
    className="mt-14 rounded-3xl border border-sky-100 bg-gradient-to-br from-[#f9fcff] via-white to-[#eef6fb] p-6 shadow-soft md:p-8"
  >
    {/* <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Founder of Namo Academy</p> */}
    <div className="mt-4 grid items-center gap-8 lg:grid-cols-[320px_1fr]">
      <motion.figure
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-[320px]"
      >
        <img
          src={founderImage}
          alt="Mrs. Rajshri Kshirsagar – Founder of Namo Academy"
          className="h-[320px] w-full rounded-3xl border-4 border-white object-cover shadow-[0_14px_40px_rgba(14,68,102,0.16)]"
          loading="lazy"
        />
      </motion.figure>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="space-y-4"
      >
        <h2 id="founder-heading" className="text-3xl font-bold text-slate-900">
          Founder of Namo Academy
        </h2>
        <div className="space-y-2 text-slate-700">
          <p className="text-2xl font-semibold text-sky-800">{founderInfo.name}</p>
          <p className="text-sm md:text-base">
            <span className="font-semibold text-slate-900">Qualifications:</span>{" "}
            {founderInfo.qualification}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold text-slate-900">Experience:</span> {founderInfo.experience}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-semibold text-slate-900">Specialization:</span>{" "}
            {founderInfo.specialization.join(" • ")}
          </p>
        </div>

        <blockquote className="rounded-2xl border-l-4 border-sky-600 bg-white/90 p-4 text-sm italic leading-relaxed text-slate-700 md:text-base">
          "{founderInfo.message}"
        </blockquote>
      </motion.div>
    </div>
  </section>
);

export default FounderSection;
