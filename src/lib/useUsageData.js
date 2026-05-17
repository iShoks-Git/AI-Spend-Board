import { useEffect, useMemo, useState } from "react";
import { ALL_MONTHS } from "../data/timeseries.js";
import { MODEL_CATALOGUE } from "../data/models.js";
import { loadAllUsage, listConnectorStatus } from "../connectors/index.js";

// Merges live connector records into the deterministic baseline series
// so the dashboard works out of the box and improves as connectors come
// online. Live records replace the matching (provider, model, month) cell.
function mergeLive(baseline, liveRecords) {
  if (!liveRecords?.length) return baseline;
  const idx = new Map();
  liveRecords.forEach(r => {
    idx.set(`${r.monthKey}|${r.provider}|${r.model}`, r);
  });
  return baseline.map(month => {
    let totalSpend = 0, totalTokens = 0;
    const models = month.models.map(m => {
      const hit = idx.get(`${month.key}|${m.p}|${m.n}`);
      const next = hit
        ? { ...m, spend: hit.spendUsd ?? m.spend, tokens: hit.tokens ?? m.tokens,
            cacheHit: hit.cacheHit ?? m.cacheHit, errRate: hit.errRate ?? m.errRate }
        : m;
      totalSpend  += next.spend;
      totalTokens += next.tokens;
      return next;
    });
    return { ...month, models, totalSpend, totalTokens };
  });
}

export function useUsageData({ start, end }) {
  const [live, setLive] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: null });
  const connectorStatus = useMemo(listConnectorStatus, []);
  const anyConfigured = connectorStatus.some(c => c.configured);

  useEffect(() => {
    if (!anyConfigured) return;
    let cancelled = false;
    setStatus({ loading: true, error: null });
    loadAllUsage({ start, end })
      .then(records => { if (!cancelled) { setLive(records); setStatus({ loading: false, error: null }); }})
      .catch(err     => { if (!cancelled) setStatus({ loading: false, error: err.message }); });
    return () => { cancelled = true; };
  }, [start, end, anyConfigured]);

  const months = useMemo(() => mergeLive(ALL_MONTHS, live), [live]);
  return { months, catalogue: MODEL_CATALOGUE, status, connectorStatus, isLive: anyConfigured };
}
