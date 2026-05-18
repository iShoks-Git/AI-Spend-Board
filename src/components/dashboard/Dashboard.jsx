import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUsageData } from "../../lib/useUsageData.js";
import { PROVIDER_COLORS } from "../../data/providers.js";
import Header   from "./Header.jsx";
import RangeBar from "./RangeBar.jsx";
import Tabs     from "./Tabs.jsx";
import Overview        from "./tabs/Overview.jsx";
import Models          from "./tabs/Models.jsx";
import Projects        from "./tabs/Projects.jsx";
import Efficiency      from "./tabs/Efficiency.jsx";
import Recommendations from "./tabs/Recommendations.jsx";

export default function Dashboard() {
  const [tab,    setTab]    = useState("Overview");
  const [start,  setStart]  = useState("2025-11");
  const [end,    setEnd]    = useState("2026-05");
  const [preset, setPreset] = useState("6M");

  const { months: allMonths, isLive, status } = useUsageData({ start, end });

  const filtered = useMemo(
    () => allMonths.filter((m) => m.key >= start && m.key <= end),
    [allMonths, start, end]
  );

  const agg = useMemo(() => {
    const mm = {}, pm = {};
    let ts = 0, tt = 0, tb = 0, cs = 0, es = 0, cps = 0;
    filtered.forEach((m) => {
      ts += m.totalSpend; tt += m.totalTokens; tb += m.budget;
      cs += m.cacheHit;   es += m.errRate;     cps += m.cpt;
      m.models.forEach((md) => {
        if (!mm[md.n]) mm[md.n] = { ...md, spend: 0, tokens: 0, cacheSum: 0, errSum: 0, cnt: 0 };
        mm[md.n].spend += md.spend; mm[md.n].tokens += md.tokens;
        mm[md.n].cacheSum += md.cacheHit; mm[md.n].errSum += md.errRate; mm[md.n].cnt++;
        pm[md.p] = (pm[md.p] || 0) + md.spend;
      });
    });
    const n = filtered.length || 1;
    const models = Object.values(mm).map((m) => ({
      ...m,
      avgCache: Math.round(m.cacheSum / m.cnt),
      avgErr:   parseFloat((m.errSum / m.cnt).toFixed(1)),
      blendC1k: parseFloat(((m.spend / m.tokens) * 1e6).toFixed(3)),
    })).sort((a, b) => b.spend - a.spend);
    return {
      ts, tt, tb, n,
      avgCache: Math.round(cs / n),
      avgErr:   parseFloat((es / n).toFixed(1)),
      avgCpt:   parseFloat((cps / n).toFixed(3)),
      models,
      providers: Object.entries(pm).sort((a, b) => b[1] - a[1]),
    };
  }, [filtered]);

  const timeline = useMemo(() => filtered.map((m) => {
    const row = { lbl: m.lbl, spend: m.totalSpend, budget: m.budget };
    Object.keys(PROVIDER_COLORS).forEach((p) => {
      row[p] = m.models.filter((md) => md.p === p).reduce((a, md) => a + md.spend, 0);
    });
    return row;
  }), [filtered]);

  const effLine = useMemo(() => filtered.map((m) => ({
    lbl: m.lbl, cache: m.cacheHit, err: m.errRate, cpt: m.cpt,
  })), [filtered]);

  const exportCSV = () => {
    const pKeys = Object.keys(PROVIDER_COLORS);
    const hdr  = ["Month","Total Spend ($)","Budget ($)","Variance ($)","Tokens (M)","Cache Hit %","Error Rate %","Cost per Thought", ...pKeys];
    const rows = filtered.map((m) => {
      const ps = {};
      pKeys.forEach((p) => { ps[p] = m.models.filter((md) => md.p === p).reduce((a, md) => a + md.spend, 0); });
      return [m.lbl, m.totalSpend, m.budget, m.totalSpend - m.budget,
        (m.totalTokens / 1e6).toFixed(1), m.cacheHit, m.errRate, m.cpt,
        ...pKeys.map((p) => ps[p] || 0)].join(",");
    });
    const csv = [hdr.join(","), ...rows].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `ai-spend-${start}-to-${end}.csv`;
    a.click();
  };

  const tabs = {
    Overview:        <Overview        agg={agg} timeline={timeline}/>,
    Models:          <Models          agg={agg}/>,
    Projects:        <Projects        n={agg.n}/>,
    Efficiency:      <Efficiency      agg={agg} effLine={effLine}/>,
    Recommendations: <Recommendations/>,
  };

  return (
    <div className="relative mx-auto max-w-[1400px] px-4 pb-32 md:px-8">
      <Header months={agg.n} start={start} end={end} onExport={exportCSV}/>

      <div className="mb-4">
        <RangeBar
          start={start} end={end} setStart={setStart} setEnd={setEnd}
          preset={preset} setPreset={setPreset}
          count={filtered.length} isLive={isLive}
        />
      </div>

      <div className="mb-6 border-b border-white/[0.06] pb-3">
        <Tabs tab={tab} setTab={setTab}/>
      </div>

      {status.error && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-3 text-xs text-amber-200">
          Connector error: {status.error} — falling back to baseline data.
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {tabs[tab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
