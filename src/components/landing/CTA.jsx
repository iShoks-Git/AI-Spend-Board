import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="pricing" className="relative isolate overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 mesh opacity-90" />
      <div className="absolute inset-0 grain opacity-30 mix-blend-overlay" />
      <div className="relative mx-auto max-w-[1400px] px-5 text-center md:px-8">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display mx-auto max-w-[18ch] text-[clamp(3rem,9vw,9rem)]"
        >
          Shape your <span className="font-bold text-bone">spend</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-8 max-w-md text-white/60"
        >
          The dashboard ships pre-loaded with a deterministic baseline. Plug in
          a single connector and watch your data take its place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/dashboard" className="btn-primary">Open the dashboard</Link>
          <a href="#providers" className="btn-ghost">Browse connectors</a>
        </motion.div>
      </div>
    </section>
  );
}
