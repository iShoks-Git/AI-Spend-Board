import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import KPI   from "../KPI.jsx";
import Panel from "../Panel.jsx";

const REASONING = [
  { proj: "Contract Extraction (o3)",         ratio: 41, v: "⚠ Wasteful — structured extraction, not reasoning" },
  { proj: "Agent Orchestration (Claude 3.5)", ratio: 28, v: "⚠ Routing hops don't justify extended thinking" },
  { proj: "Internal Copilot (GPT-4o)",        ratio: 12, v: "✓ Acceptable — mixed Q&A workload" },
];

export default function Efficiency({ agg, effLine }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPI label="Avg Cache Hit"   val={`${agg.avgCache}%`} sub="Target ≥ 50%"   col={agg.avgCache >= 50 ? "#10b981" : "#f59e0b"} warn={agg.avgCache < 50}/>
        <KPI label="Avg Error Rate"  val={`${agg.avgErr}%`}   sub="Baseline 1.2%"   col={agg.avgErr < 1.5 ? "#10b981" : "#f59e0b"} warn={agg.avgErr >= 1.5}/>
        <KPI label="Cost / Thought"  val={`$${agg.avgCpt}`}   sub="Avg over period" col="#10b981"/>
        <KPI label="Reasoning Ratio" val="19%"                sub="o3 + extended thinking" col="#a78bfa"/>
      </div>

      <Panel title="Cache hit & error rate">
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={effLine}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
            <XAxis dataKey="lbl" tick={{ fill: "#9ca3af", fontSize: 10 }} interval="preserveStartEnd" tickLine={false} axisLine={false}/>
            <YAxis yAxisId="l" tickFormatter={(v) => `${v}%`} tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false}/>
            <YAxis yAxisId="r" orientation="right" tickFormatter={(v) => `${v}%`} tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{ background: "rgba(11,11,15,0.92)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 11 }}/>
            <Legend wrapperStyle={{ fontSize: 10 }}/>
            <Line yAxisId="l" type="monotone" dataKey="cache" name="Cache Hit %"  stroke="#22d3ee" strokeWidth={2} dot={false} activeDot={{ r: 4 }}/>
            <Line yAxisId="r" type="monotone" dataKey="err"   name="Error Rate %" stroke="#f43f5e" strokeWidth={2} dot={false} activeDot={{ r: 4 }}/>
          </LineChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Cost per thought — trend">
        <ResponsiveContainer width="100%" height={170}>
          <LineChart data={effLine}>
            <defs>
              <linearGradient id="cptStroke" x1="0" x2="1">
                <stop offset="0%" stopColor="#10b981"/>
                <stop offset="100%" stopColor="#ff5b1f"/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
            <XAxis dataKey="lbl" tick={{ fill: "#9ca3af", fontSize: 10 }} interval="preserveStartEnd" tickLine={false} axisLine={false}/>
            <YAxis tickFormatter={(v) => `$${v}`} tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false}/>
            <Tooltip formatter={(v) => `$${v}`} contentStyle={{ background: "rgba(11,11,15,0.92)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 11 }}/>
            <Line type="monotone" dataKey="cpt" name="Cost/Thought" stroke="url(#cptStroke)" strokeWidth={2.5} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Reasoning token ratio — by project" hint="flagged when applied to classification, extraction, or routing">
        <div className="space-y-4">
          {REASONING.map((r, i) => (
            <div key={i}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-white/75">{r.proj}</span>
                <span className="font-mono text-bone">{r.ratio}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${r.ratio}%`, background: r.ratio > 30 ? "#f59e0b" : "#6366f1" }}
                />
              </div>
              <p className={`mt-1.5 text-[11px] ${r.v.startsWith("⚠") ? "text-amber-400" : "text-emerald-400"}`}>{r.v}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
