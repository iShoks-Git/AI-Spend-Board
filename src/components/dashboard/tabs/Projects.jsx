import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";
import Panel from "../Panel.jsx";
import { fmt, fmtD } from "../../../lib/format.js";

const COLS = ["#ff5b1f","#22d3ee","#f59e0b","#10b981","#f43f5e","#a78bfa","#fb923c","#e11d48","#0ea5e9","#84cc16"];

const PROJ_BASE = [
  { n: "Customer Support RAG",   m: "GPT-4o",            s: 14200, t: 198e6, trend: "+12%" },
  { n: "Order Summarisation",    m: "Gemini 1.5 Pro",    s: 9870,  t: 142e6, trend: "+4%"  },
  { n: "Internal Copilot",       m: "GPT-4o",            s: 8310,  t: 118e6, trend: "+22%" },
  { n: "Contract Extraction",    m: "o3 (Azure)",        s: 5640,  t: 94e6,  trend: "-3%"  },
  { n: "Agent Orchestration",    m: "Claude Sonnet GCP", s: 7890,  t: 71e6,  trend: "+31%" },
  { n: "Data Enrichment",        m: "Llama 3.1 70B DB",  s: 2100,  t: 58e6,  trend: "+7%"  },
  { n: "Doc Intelligence",       m: "Claude 3.5 Sonnet", s: 3400,  t: 44e6,  trend: "+15%" },
  { n: "Search Reranking",       m: "Gemini 2.0 Flash",  s: 1800,  t: 82e6,  trend: "-2%"  },
  { n: "Embeddings Pipeline",    m: "Gemini Flash 1.5",  s: 1230,  t: 88e6,  trend: "+1%"  },
  { n: "Classification Batch",   m: "Claude 3.5 Haiku",  s: 560,   t: 43e6,  trend: "-8%"  },
];

export default function Projects({ n }) {
  const g = n / 6;
  const projs = PROJ_BASE.map((p) => ({ ...p, s: Math.round(p.s * g), t: Math.round(p.t * g) }))
                          .sort((a, b) => b.s - a.s);

  return (
    <div className="space-y-4">
      <Panel title="Token consumption by project">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={projs} layout="vertical" barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
            <XAxis type="number" tickFormatter={(v) => fmt(v)} tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false}/>
            <YAxis dataKey="n" type="category" tick={{ fill: "#9ca3af", fontSize: 10 }} width={155} tickLine={false} axisLine={false}/>
            <Tooltip formatter={(v) => fmt(v) + " tokens"} contentStyle={{ background: "rgba(11,11,15,0.92)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 11 }}/>
            <Bar dataKey="t" name="Tokens" radius={[0, 4, 4, 0]}>
              {projs.map((_, i) => <Cell key={i} fill={COLS[i % 10]}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel className="overflow-x-auto p-0">
        <table className="w-full min-w-max text-xs">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Project","Model","Tokens","Spend","$/1k Tokens","MoM Trend","Signal"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projs.map((p, i) => {
              const c1k = ((p.s / p.t) * 1e6).toFixed(3);
              const isUp = p.trend.startsWith("+");
              const warn = isUp && parseInt(p.trend) > 15;
              return (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-white/[0.04] hover:bg-white/[0.025]"
                >
                  <td className="px-4 py-2.5 font-medium text-bone whitespace-nowrap">{p.n}</td>
                  <td className="px-4 py-2.5 text-white/55 whitespace-nowrap">{p.m}</td>
                  <td className="px-4 py-2.5 font-mono text-white/70">{fmt(p.t)}</td>
                  <td className="px-4 py-2.5 font-mono text-ember">{fmtD(p.s, true)}</td>
                  <td className="px-4 py-2.5 font-mono text-white/70">${c1k}</td>
                  <td className="px-4 py-2.5"><span className={isUp ? "text-rose-400" : "text-emerald-400"}>{p.trend}</span></td>
                  <td className="px-4 py-2.5"><span className={warn ? "text-amber-400" : "text-emerald-400"}>{warn ? "⚠ Review" : "✓ OK"}</span></td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
