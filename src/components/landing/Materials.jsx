import { motion } from "framer-motion";

const MATERIALS = [
  {
    n: "01",
    title: "Tokens",
    desc: "The raw ore. We meter every input, every output, every reasoning hop — across nine providers — and reconcile them to the cent.",
    detail: "23 models · per-call granularity · 37 mo retention",
  },
  {
    n: "02",
    title: "Cache",
    desc: "Heat-treated. Prefix-cache hit rates ride alongside every spend curve so you can see efficiency, not just expense.",
    detail: "Target ≥ 50% · live drift detection",
  },
  {
    n: "03",
    title: "Reasoning",
    desc: "The alloy. Extended-thinking ratios surface where you're paying for thought you don't need — extraction, routing, classification.",
    detail: "o1 · o3 · extended-thinking visibility",
  },
  {
    n: "04",
    title: "Output",
    desc: "The finished part. Cost-per-thought, cost-per-task, cost-per-order — unit economics for the era of intelligence on tap.",
    detail: "Snowflake-ready · per-project rollups",
  },
];

export default function Materials() {
  return (
    <section id="materials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mb-16 flex items-baseline justify-between">
          <p className="pill">Materials</p>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">/ 04</span>
        </div>

        <div className="space-y-px">
          {MATERIALS.map((m, i) => (
            <motion.article
              key={m.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group relative grid grid-cols-1 items-baseline gap-6 border-t border-white/[0.08] py-12 md:grid-cols-12 md:gap-10 md:py-16"
            >
              <div className="md:col-span-1">
                <p className="font-mono text-sm text-ember">{m.n}</p>
              </div>

              <div className="md:col-span-4">
                <h3 className="display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95]">
                  {m.title}
                </h3>
              </div>

              <div className="md:col-span-6 md:col-start-7">
                <p className="text-base leading-relaxed text-white/65 md:text-lg">{m.desc}</p>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-white/40">{m.detail}</p>
              </div>

              <motion.div
                className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gradient-to-r from-ember via-copper to-transparent group-hover:scale-x-100"
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
