import { motion } from "framer-motion";

const PRESETS = [["3M","3 Mo"],["6M","6 Mo"],["1Y","1 Year"],["2Y","2 Years"],["3Y","3 Years"]];
const PS = { "3M":"2026-02", "6M":"2025-11", "1Y":"2025-05", "2Y":"2024-05", "3Y":"2023-05" };

export default function RangeBar({ start, end, setStart, setEnd, preset, setPreset, count, isLive }) {
  const apply = (p) => { setPreset(p); setStart(PS[p]); setEnd("2026-05"); };
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-2">
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Range</span>
        {PRESETS.map(([p, l]) => {
          const active = preset === p;
          return (
            <motion.button
              key={p}
              onClick={() => apply(p)}
              whileTap={{ scale: 0.96 }}
              className={`relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active ? "text-ink-950" : "text-white/65 hover:text-bone"
              }`}
            >
              {active && (
                <motion.span layoutId="rangePill" className="absolute inset-0 -z-0 rounded-full bg-bone" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative z-10">{l}</span>
            </motion.button>
          );
        })}
        <span className="text-white/20">·</span>
        <input
          type="month" value={start} min="2023-05" max={end}
          onChange={(e) => { setStart(e.target.value); setPreset("custom"); }}
          className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-bone outline-none transition-colors focus:border-ember"
        />
        <span className="text-white/35">→</span>
        <input
          type="month" value={end} min={start} max="2026-05"
          onChange={(e) => { setEnd(e.target.value); setPreset("custom"); }}
          className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-bone outline-none transition-colors focus:border-ember"
        />
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 md:flex md:items-center md:gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-400 animate-pulse" : "bg-white/30"}`} />
          {isLive ? "live data" : "mock baseline"} · {count} pt{count !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
