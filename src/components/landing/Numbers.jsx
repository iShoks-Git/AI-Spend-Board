import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

function Counter({ to, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    const unsub = mv.on("change", n => setVal(Number(n.toFixed(decimals))));
    return () => { ctrl.stop(); unsub(); };
  }, [inView, to, mv, decimals]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const STATS = [
  { label: "Avg savings unlocked",  to: 32, suffix: "%" },
  { label: "Models tracked",        to: 23 },
  { label: "Providers connected",   to: 9  },
  { label: "Time-to-first-insight", to: 7,  suffix: " min" },
];

export default function Numbers() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="border-t border-white/[0.08] pt-6"
            >
              <div className="display text-5xl text-bone md:text-7xl">
                <Counter to={s.to} suffix={s.suffix || ""} />
              </div>
              <p className="mt-3 max-w-[14ch] text-xs uppercase tracking-[0.2em] text-white/45">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
