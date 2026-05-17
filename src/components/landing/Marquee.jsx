import { motion } from "framer-motion";
import { PROVIDERS } from "../../data/providers.js";

export default function Marquee() {
  const items = [...PROVIDERS, ...PROVIDERS];
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] py-8">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {items.map((p, i) => (
          <span key={i} className="flex items-center gap-3 font-display text-3xl text-white/40 md:text-4xl">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            {p}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
