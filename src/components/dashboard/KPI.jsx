import { motion } from "framer-motion";

export default function KPI({ label, val, sub, col, warn, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-xl"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p
        className="mt-2 font-display text-3xl leading-none"
        style={{ color: warn ? "#f59e0b" : col || "#ece8df" }}
      >
        {val}
      </p>
      {sub && <p className="mt-2 text-[11px] text-white/45">{sub}</p>}
      <div
        className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: warn ? "#f59e0b" : col || "#ece8df" }}
      />
    </motion.div>
  );
}
