import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";
import Panel from "../Panel.jsx";
import Badge from "../Badge.jsx";
import { PROVIDER_COLORS } from "../../../data/providers.js";
import { fmt, fmtD } from "../../../lib/format.js";

const DRIFT = [
  { m: "GPT-4o",                       d: "+8%",  f: "Spend growing faster than tokens — check retry loops in Internal Copilot." },
  { m: "o3 (Azure)",                   d: "+19%", f: "Reasoning token ratio 41% — audit task suitability before next billing cycle." },
  { m: "Claude Sonnet GCP (Agents)",   d: "+31%", f: "Token growth outpacing expected utility — orchestration routing review needed." },
];

export default function Models({ agg }) {
  return (
    <div className="space-y-4">
      <Panel title="Period spend — top 12 models">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={agg.models.slice(0, 12)} layout="vertical" barSize={14}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
            <XAxis type="number" tickFormatter={(v) => fmtD(v, true)} tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false}/>
            <YAxis dataKey="n" type="category" tick={{ fill: "#9ca3af", fontSize: 10 }} width={140} tickLine={false} axisLine={false}/>
            <Tooltip formatter={(v) => fmtD(v)} contentStyle={{ background: "rgba(11,11,15,0.92)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 11 }}/>
            <Bar dataKey="spend" name="Spend" radius={[0, 4, 4, 0]}>
              {agg.models.slice(0, 12).map((m, i) => (
                <Cell key={i} fill={PROVIDER_COLORS[m.p] || "#6366f1"}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel className="overflow-x-auto p-0">
        <table className="w-full min-w-max text-xs">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Model","Provider","Period Spend","Tokens","Blended $/1k","Avg Cache","Avg Err"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agg.models.map((m, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.015 }}
                className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.025]"
              >
                <td className="px-4 py-2.5 font-medium text-bone whitespace-nowrap">{m.n}</td>
                <td className="px-4 py-2.5"><Badge text={m.p} col={PROVIDER_COLORS[m.p] || "#6366f1"}/></td>
                <td className="px-4 py-2.5 font-mono text-ember">{fmtD(m.spend, true)}</td>
                <td className="px-4 py-2.5 font-mono text-white/70">{fmt(m.tokens)}</td>
                <td className="px-4 py-2.5 font-mono text-white/70">${m.blendC1k}</td>
                <td className="px-4 py-2.5"><span className={m.avgCache >= 50 ? "text-emerald-400" : "text-amber-400"}>{m.avgCache}%</span></td>
                <td className="px-4 py-2.5"><span className={m.avgErr > 1.5 ? "text-rose-400" : m.avgErr > 1 ? "text-amber-400" : "text-emerald-400"}>{m.avgErr}%</span></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Token-to-spend drift — flagged" hint="check pricing anomalies, retries, reasoning overhead">
        <div className="grid gap-3 md:grid-cols-3">
          {DRIFT.map((d, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-amber-500/25 bg-amber-500/[0.04] p-4"
            >
              <p className="text-xs font-semibold text-amber-300">{d.m} · {d.d}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/55">{d.f}</p>
            </motion.div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
