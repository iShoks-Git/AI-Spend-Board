// OpenAI Direct connector.
// Docs: https://platform.openai.com/docs/api-reference/usage
//
// The OpenAI usage endpoint requires an admin key and is not CORS-enabled —
// you must proxy via a backend route, e.g. /api/openai/usage.
export const openaiConnector = {
  id: "openai",
  label: "OpenAI Direct",
  provider: "OpenAI Direct",
  docs: "https://platform.openai.com/docs/api-reference/usage",
  isConfigured() {
    return Boolean(import.meta.env.VITE_OPENAI_PROXY_URL);
  },
  async fetchUsage({ start, end }) {
    const url = import.meta.env.VITE_OPENAI_PROXY_URL;
    if (!url) return [];
    const res = await fetch(`${url}?start=${start}&end=${end}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`OpenAI usage proxy failed: ${res.status}`);
    const json = await res.json();
    // Expected backend shape: [{ model, monthKey, spendUsd, tokens }]
    return json.map(r => ({ ...r, provider: "OpenAI Direct" }));
  },
};
