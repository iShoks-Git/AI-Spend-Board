import { motion } from "framer-motion";

const RECS = [
  { sev: "high",   title: "Agent Orchestration — Model Mismatch",       body: "Claude 3.5 Sonnet used for routing/classification hops. Migrating to Claude Haiku or Gemini Flash could cut ~60% of project cost." },
  { sev: "high",   title: "o3 Reasoning Ratio 41% on Extraction Tasks", body: "Contract Extraction uses o3 for structured extraction — not genuine reasoning. Switch to GPT-4o mini with structured output. Est. ~$6k/mo saving." },
  { sev: "medium", title: "Cache Hit Rate Below 50% Target",            body: "Internal Copilot and Support RAG have repetitive system prompts with no prefix caching enabled. Fixing both pushes rate past 50%." },
  { sev: "medium", title: "GPT-4.5 — High Cost, Low Justification",     body: "$0.75/1k vs $0.13/1k for GPT-4o. Audit whether tasks require the capability delta or can be routed to cheaper models." },
  { sev: "low",    title: "Claude Haiku + Gemini Flash — Benchmarks",   body: "Both under $0.015/1k, >50% cache hit, <0.5% error rate. Use as internal standards for new pipeline design reviews." },
  { sev: "low",    title: "Databricks Models Underutilised",            body: "DBRX and Llama 3.1 70B show strong batch economics. Audit classification/enrichment jobs on GPT-4o mini for migration candidates." },
];

const SEV = {
  high:   { ring: "border-rose-500/40",    dot: "bg-rose-400",     label: "High" },
  medium: { ring: "border-amber-500/30",   dot: "bg-amber-400",    label: "Medium" },
  low:    { ring: "border-emerald-500/25", dot: "bg-emerald-400",  label: "Low" },
};

export default function Recommendations() {
  return (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.02] to-transparent p-5"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300">Estimated impact</p>
        <p className="mt-2 font-display text-4xl text-bone">~$14,200<span className="text-white/40 text-2xl"> / month</span></p>
        <p className="mt-2 text-xs text-white/55">If high + medium items below are actioned this cycle.</p>
      </motion.div>

      {RECS.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ x: 4 }}
          className={`flex gap-4 rounded-2xl border bg-white/[0.02] p-4 backdrop-blur-xl ${SEV[r.sev].ring}`}
        >
          <div className="mt-1.5 flex flex-col items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${SEV[r.sev].dot}`}/>
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">{SEV[r.sev].label}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-bone">{r.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-white/55">{r.body}</p>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.04] p-4"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">Next step</p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Once cost + business metrics land in Snowflake, surface{" "}
          <strong className="text-bone">Cost per Task</strong> and{" "}
          <strong className="text-bone">Cost per Order</strong> as KPIs alongside Cost per Thought —
          completing the full AI unit-economics loop: input efficiency → model efficiency → business output.
        </p>
      </motion.div>
    </div>
  );
}
