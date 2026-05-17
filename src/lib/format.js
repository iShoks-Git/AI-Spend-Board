export const fmt = (n) =>
  n >= 1e9 ? `${(n / 1e9).toFixed(1)}B` :
  n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` :
  n >= 1e3 ? `${(n / 1e3).toFixed(0)}k` :
  `${n}`;

export const fmtD = (n, short = false) =>
  short
    ? `$${n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(0) + "k" : n}`
    : `$${Number(n).toLocaleString()}`;
