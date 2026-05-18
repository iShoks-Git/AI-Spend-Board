import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const reveal = {
  hidden: { y: 32, opacity: 0 },
  show: (i = 0) => ({
    y: 0, opacity: 1,
    transition: { delay: 0.15 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y      = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale  = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity= useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      {/* atmosphere */}
      <div className="absolute inset-0 mesh" />
      <div className="absolute inset-0 grain opacity-40 mix-blend-overlay" />

      {/* sculpted shape — pure CSS / SVG, animated by scroll */}
      <motion.div style={{ y, scale }} className="pointer-events-none absolute inset-0 grid place-items-center">
        <motion.svg
          viewBox="0 0 800 800"
          className="h-[120vmin] w-[120vmin] max-w-none opacity-[0.55]"
          initial={{ rotate: -8 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <defs>
            <radialGradient id="metal" cx="50%" cy="40%" r="60%">
              <stop offset="0%"   stopColor="#ffd9b8" stopOpacity="0.95" />
              <stop offset="40%"  stopColor="#ff5b1f" stopOpacity="0.85" />
              <stop offset="80%"  stopColor="#5b1c08" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0b0b0f" stopOpacity="1"    />
            </radialGradient>
            <linearGradient id="ring" x1="0" x2="1">
              <stop offset="0"   stopColor="#ece8df" stopOpacity="0.85" />
              <stop offset="0.5" stopColor="#c97b3a" stopOpacity="0.4"  />
              <stop offset="1"   stopColor="#ece8df" stopOpacity="0"    />
            </linearGradient>
          </defs>
          <circle cx="400" cy="400" r="270" fill="url(#metal)" />
          {[...Array(11)].map((_, i) => (
            <motion.circle
              key={i}
              cx="400" cy="400" r={290 + i * 12}
              fill="none" stroke="url(#ring)" strokeWidth="0.8"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60 + i * 5, ease: "linear" }}
              style={{ transformOrigin: "400px 400px" }}
            />
          ))}
        </motion.svg>
      </motion.div>

      {/* type */}
      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <motion.div
          custom={0} variants={reveal} initial="hidden" animate="show"
          className="mb-8"
        >
          <span className="pill"><span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" /> Now live · 23 models, 9 providers</span>
        </motion.div>

        <h1 className="display text-[clamp(3.5rem,11vw,11.5rem)]">
          <motion.span custom={1} variants={reveal} initial="hidden" animate="show" className="block">Spend</motion.span>
          <motion.span custom={2} variants={reveal} initial="hidden" animate="show" className="block font-bold text-bone">sculpted.</motion.span>
        </h1>

        <motion.p
          custom={3} variants={reveal} initial="hidden" animate="show"
          className="mt-10 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
        >
          Forge turns AI cost into a material you can shape — every token,
          every provider, every cent, rendered with the precision of an instrument
          and the silence of a sculpture.
        </motion.p>

        <motion.div
          custom={4} variants={reveal} initial="hidden" animate="show"
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link to="/dashboard" className="btn-primary group">
            <span>Enter the dashboard</span>
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}
            ><path d="M5 12h14M13 5l7 7-7 7"/></motion.svg>
          </Link>
          <a href="#materials" className="btn-ghost">See the materials</a>
        </motion.div>

        <motion.div
          custom={5} variants={reveal} initial="hidden" animate="show"
          className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/40"
        >
          <span className="h-px w-10 bg-white/30" />
          <span>Scroll to inspect</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
