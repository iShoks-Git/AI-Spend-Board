import { motion } from "framer-motion";

export default function Header({ months, start, end, onExport }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="pill mb-3">Live dashboard</p>
        <h1 className="display text-[clamp(2rem,4.5vw,3.6rem)]">
          AI Spend & <span className="italic text-ember">Efficiency</span>
        </h1>
        <p className="mt-2 text-xs text-white/45">
          9 providers · {months} month{months !== 1 ? "s" : ""} selected · <span className="font-mono">{start} → {end}</span>
        </p>
      </div>
      <motion.button
        onClick={onExport}
        whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
        className="btn-primary"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>
        </svg>
        <span>Export CSV</span>
      </motion.button>
    </div>
  );
}
