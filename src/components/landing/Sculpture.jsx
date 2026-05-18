import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ALL_MONTHS } from "../../data/timeseries.js";
import { fmtD } from "../../lib/format.js";

// Cost-and-AI made visual: interactive sculpture you can rotate with your cursor,
// driven by real timeseries data. The bars are the months of spend.
export default function Sculpture() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotZ = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 18 });

  const [hover, setHover] = useState(null);

  const months = ALL_MONTHS.slice(-30);
  const max = Math.max(...months.map(m => m.totalSpend));

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); setHover(null); }

  return (
    <section className="relative isolate py-24 md:py-40" ref={ref}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8">
        <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
          <p className="pill mb-6">01 — Sculpture</p>
          <h2 className="display text-[clamp(2.4rem,5vw,4.2rem)]">
            Cost, rendered in <span className="font-bold text-bone">three dimensions</span>.
          </h2>
          <p className="mt-6 max-w-md text-white/60">
            Move your cursor. Every bar is a month; every height a cheque written
            to a model. The shape of your AI bill, sculpted from your own data —
            not a metaphor, the thing itself.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-white/40">
            <span>30 mo · live</span>
            <span>·</span>
            <span>cursor-driven parallax</span>
          </div>
        </div>

        <div className="md:col-span-8">
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateZ: rotZ, perspective: 1200 }}
            className="relative aspect-[4/3] w-full rounded-[28px] border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-6 md:p-10"
          >
            <motion.div
              style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
              className="relative grid h-full grid-cols-[repeat(30,1fr)] items-end gap-1 md:gap-1.5"
            >
              {months.map((m, i) => {
                const h = (m.totalSpend / max) * 100;
                const isHot = hover === i;
                return (
                  <motion.div
                    key={m.key}
                    className="group relative"
                    onMouseEnter={() => setHover(i)}
                    style={{ height: "100%" }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.1, delay: i * 0.018, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-0 left-0 right-0 origin-bottom rounded-t-[3px]"
                      style={{
                        background: isHot
                          ? "linear-gradient(180deg, #ff5b1f, #c97b3a 60%, #5b1c08)"
                          : "linear-gradient(180deg, rgba(236,232,223,0.92), rgba(236,232,223,0.25))",
                        boxShadow: isHot ? "0 0 24px rgba(255,91,31,0.45)" : "none",
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* readout */}
            <div className="pointer-events-none absolute left-6 top-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 md:left-10 md:top-10">
              monthly spend · sculpture
            </div>
            <motion.div
              key={hover ?? "idle"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none absolute bottom-6 right-6 text-right md:bottom-10 md:right-10"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                {hover != null ? months[hover].lbl : "hover to inspect"}
              </div>
              <div className="font-display text-4xl text-bone md:text-5xl">
                {hover != null ? fmtD(months[hover].totalSpend, true) : fmtD(months.at(-1).totalSpend, true)}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
