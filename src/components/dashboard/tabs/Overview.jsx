import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import KPI   from "../KPI.jsx";
import Panel from "../Panel.jsx";
import { PROVIDER_COLORS } from "../../../data/providers.js";
import { fmt, fmtD } from "../../../lib/format.js";

export default function Overview({ agg, timeline }) {
  const over = agg.ts > agg.tb;
  const bPct = agg.tb ? Math.round((agg.ts / agg.tb) * 100) : 0;
  const thinTimeline = timeline.length > 18 ? timeline.filter((_, i) => i % 2 === 0) : timeline;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPI label="Period Spend"    val={fmtD(agg.ts, true)}                       sub={`vs ${fmtD(agg.tb, true)} budget`}          col="#ff5b1f" warn={over} delay={0.00}/>
        <KPI label="Budget Variance" val={over ? `+${fmtD(agg.ts - agg.tb, true)}` : fmtD(agg.tb - agg.ts, true)} sub={over ? "Over budget" : `${100 - bPct}% remaining`} warn={over} delay={0.05}/>
        <KPI label="Avg Monthly"     val={fmtD(Math.round(agg.ts / agg.n), true)}    sub={`${agg.n} months`}                          col="#22d3ee" delay={0.10}/>
        <KPI label="Total Tokens"    val={fmt(agg.tt)}                               sub="all providers"                              col="#a78bfa" delay={0.15}/>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPI label="Avg Cache Hit"  val={`${agg.avgCache}%`}     sub="Target ≥ 50%"      col={agg.avgCache >= 50 ? "#10b981" : "#f59e0b"} warn={agg.avgCache < 50} delay={0.20}/>
        <KPI label="Avg Error Rate" val={`${agg.avgErr}%`}       sub="baseline 1.2%"      col={agg.avgErr < 1.5 ? "#10b981" : "#f59e0b"} warn={agg.avgErr >= 1.5} delay={0.25}/>
        <KPI label="Cost / Thought" val={`$${agg.avgCpt}`}       sub="all root traces"    col="#10b981" delay={0.30}/>
        <KPI label="Providers"      val={agg.providers.length}   sub="active in period"   col="#22d3ee" delay={0.35}/>
      </div>

      <Panel title="Spend by provider over time" hint="stacked area">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={timeline}>
            <defs>
              {Object.entries(PROVIDER_COLORS).map(([p, col]) => (
                <linearGradient key={p} id={`g-${p}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%"   stopColor={col} stopOpacity={0.85}/>
                  <stop offset="100%" stopColor={col} stopOpacity={0.25}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
            <XAxis dataKey="lbl" tick={{ fill: "#9ca3af", fontSize: 10 }} interval="preserveStartEnd" tickLine={false} axisLine={false}/>
            <YAxis tickFormatter={(v) => fmtD(v, true)} tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false}/>
            <Tooltip formatter={(v) => fmtD(v)} contentStyle={{ background: "rgba(11,11,15,0.92)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 11 }}/>
            <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} iconSize={8}/>
            {Object.entries(PROVIDER_COLORS).map(([p, col]) => (
              <Area key={p} type="monotone" dataKey={p} stackId="1" stroke={col} fill={`url(#g-${p})`} name={p}/>
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel title="Provider breakdown">
          <div className="space-y-3">
            {agg.providers.map(([p, s], i) => {
              const pct = Math.round((s / agg.ts) * 100);
              return (
                <div key={i}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span style={{ color: PROVIDER_COLORS[p] }}>{p}</span>
                    <span className="font-mono text-bone">{fmtD(s, true)}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, background: PROVIDER_COLORS[p] }}
                    />
                  </div>
                  <p className="mt-1 text-right font-mono text-[10px] text-white/35">{pct}%</p>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel title="Spend vs budget">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={thinTimeline} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)"/>
              <XAxis dataKey="lbl" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false}/>
              <YAxis tickFormatter={(v) => fmtD(v, true)} tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false}/>
              <Tooltip formatter={(v) => fmtD(v)} contentStyle={{ background: "rgba(11,11,15,0.92)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 11 }}/>
              <Legend wrapperStyle={{ fontSize: 10 }}/>
              <Bar dataKey="budget" fill="rgba(255,255,255,0.12)" name="Budget" radius={[3,3,0,0]}/>
              <Bar dataKey="spend"  fill="#ff5b1f"                name="Spend"  radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </div>
  );
}
