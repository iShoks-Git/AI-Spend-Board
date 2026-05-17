import { MODEL_CATALOGUE } from "./models.js";

// Deterministic pseudo-random in [0,1) — fully reproducible across renders.
const dr = (s) => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };

// 37 monthly snapshots: May 2023 → May 2026.
export function generateMonthlySeries() {
  const out = [];
  for (let i = 0; i <= 36; i++) {
    const tm = 4 + i;
    const yr = 2023 + Math.floor(tm / 12);
    const mo = (tm % 12) + 1;
    const key = `${yr}-${String(mo).padStart(2, "0")}`;
    const lbl = new Date(yr, mo - 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const g = 0.08 + (i / 36) * 0.92;
    const budget = Math.round(18000 + (i / 36) * (120000 - 18000));
    let totalSpend = 0;
    let totalTokens = 0;
    const models = [];
    MODEL_CATALOGUE.forEach((m, mi) => {
      if (i < m.av) return;
      const mat   = Math.min(1, (i - m.av) / 8);
      const noise = 0.92 + dr(i * 31 + mi * 7) * 0.16;
      const spend  = Math.round(m.bs * g * mat * noise);
      const tokens = Math.round((spend / m.c) * 1000);
      totalSpend  += spend;
      totalTokens += tokens;
      models.push({
        ...m, spend, tokens,
        cacheHit: Math.min(65, Math.round(14 + i * 0.72 + dr(i * 13 + mi) * 6)),
        errRate:  parseFloat(Math.max(0.3, 2.6 - i * 0.055 + dr(i * 17 + mi) * 0.3 - 0.3).toFixed(1)),
      });
    });
    out.push({
      key, lbl, yr, mo, models, totalSpend, totalTokens, budget,
      cacheHit: Math.min(65, Math.round(14 + i * 0.72)),
      errRate:  parseFloat(Math.max(0.4, 2.6 - i * 0.055).toFixed(1)),
      cpt:      parseFloat(Math.max(0.018, 0.065 - i * 0.0013).toFixed(3)),
    });
  }
  return out;
}

export const ALL_MONTHS = generateMonthlySeries();
