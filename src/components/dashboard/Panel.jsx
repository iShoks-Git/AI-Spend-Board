import { motion } from "framer-motion";

export default function Panel({ title, hint, children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-xl md:p-5 ${className}`}
    >
      {(title || hint) && (
        <header className="mb-4 flex items-baseline justify-between gap-3">
          {title && <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">{title}</h2>}
          {hint  && <span className="text-[10px] text-white/35">{hint}</span>}
        </header>
      )}
      {children}
    </motion.section>
  );
}
