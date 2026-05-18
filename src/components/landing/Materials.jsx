import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(MATERIALS.length - 1) * 100}%`]);

  return (
    <section id="materials" ref={ref} className="relative" style={{ height: `${MATERIALS.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 px-5 md:px-8">
          <div className="mx-auto flex max-w-[1400px] items-baseline justify-between text-xs uppercase tracking-[0.25em] text-white/35">
            <span>Materials</span><span className="font-mono">/ 04</span>
          </div>
        </div>
        <motion.div style={{ x }} className="flex h-full">
          {MATERIALS.map((m, i) => (
            <article key={m.n} className="flex h-full w-screen shrink-0 items-center px-5 md:px-8">
              <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 md:grid-cols-12">
                <div className="md:col-span-5">
                  <p className="font-mono text-sm text-ember">{m.n}</p>
                  <h3 className="display mt-3 text-[clamp(3rem,7vw,6.5rem)]">{m.title}</h3>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <p className="text-lg leading-relaxed text-white/70 md:text-xl">{m.desc}</p>
                  <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/40">{m.detail}</p>
                  <div className="mt-10 h-px w-32 bg-gradient-to-r from-ember to-transparent" />
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
