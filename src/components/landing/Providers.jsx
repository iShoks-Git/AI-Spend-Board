import { motion } from "framer-motion";
import { PROVIDER_COLORS } from "../../data/providers.js";
import { listConnectorStatus } from "../../connectors/index.js";

export default function Providers() {
  const conns = listConnectorStatus();
  return (
    <section id="providers" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="pill mb-6">03 — Providers</p>
            <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)]">
              Nine sources of truth.<br/><span className="font-bold text-bone">One shape.</span>
            </h2>
          </div>
          <p className="max-w-sm text-white/55">
            Each connector ships with a normalised schema. Plug in credentials,
            point at a backend proxy, and the dashboard rewrites itself from
            your data.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {conns.map((c, i) => (
            <motion.a
              key={c.id}
              href={c.docs}
              target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group glass relative overflow-hidden p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: PROVIDER_COLORS[c.provider] || "#6366f1" }}
                  />
                  <span className="font-display text-2xl">{c.label}</span>
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${c.configured ? "text-emerald-300" : "text-white/40"}`}>
                  {c.configured ? "● live" : "○ mock"}
                </span>
              </div>
              <p className="mt-4 font-mono text-xs text-white/45">{c.id}</p>
              <p className="mt-1 truncate text-xs text-white/35 transition-colors group-hover:text-white/65">
                {c.docs}
              </p>
              <motion.div
                className="absolute inset-x-0 bottom-0 h-px origin-left"
                style={{ background: PROVIDER_COLORS[c.provider] || "#6366f1" }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
