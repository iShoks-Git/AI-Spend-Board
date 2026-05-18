import { motion } from "framer-motion";

export const TABS = ["Overview", "Models", "Projects", "Efficiency", "Recommendations"];

export default function Tabs({ tab, setTab }) {
  return (
    <div className="no-scrollbar -mx-2 flex gap-1 overflow-x-auto px-2">
      {TABS.map((t) => {
        const active = tab === t;
        return (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            whileTap={{ scale: 0.97 }}
            className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              active ? "text-ink-950" : "text-white/60 hover:text-bone"
            }`}
          >
            {active && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 -z-0 rounded-full bg-gradient-to-br from-bone to-white/70"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{t}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
