import { motion } from "framer-motion";

const StatCard = ({ label, value, hint }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
  >
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-3 font-heading text-3xl font-bold text-slate-900">{value}</p>
    {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
  </motion.article>
);

export default StatCard;
