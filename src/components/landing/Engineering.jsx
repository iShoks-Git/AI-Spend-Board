import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STAGES = [
  { k: "Connect",    v: "Six native connectors. OpenAI, Anthropic, Azure, GCP, AWS Bedrock, Databricks. One normalised stream." },
  { k: "Reconcile",  v: "Provider invoices, gateway logs, and trace data join on a single grain — model, project, month." },
  { k: "Surface",    v: "KPIs that map to engineering decisions: cache hit, error rate, blended $/1k, cost-per-thought." },
  { k: "Recommend",  v: "Flags model mismatches, runaway reasoning ratios, and orchestration leaks — before the bill lands." },
];

export default function Engineering() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dy = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="engineering" ref={ref} className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="pill mb-6">02 — Engineering</p>
            <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)]">
              Built like an <span className="italic text-ember">instrument</span>,<br/>not a dashboard.
            </h2>
          </div>
          <motion.p style={{ y: dy }} className="max-w-sm text-white/55">
            Twelve-row CSV exports next to scroll-driven storytelling. The numbers
            are the deliverable. Everything around them is silent on purpose.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-4">
          {STAGES.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden p-6 md:p-8"
            >
              <span className="font-mono text-xs text-white/40">0{i+1}</span>
              <h3 className="display mt-5 text-3xl">{s.k}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{s.v}</p>
              <div className="absolute -bottom-1 -right-1 h-24 w-24 rounded-full bg-ember/0 transition-all duration-700 group-hover:bg-ember/10 group-hover:blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
