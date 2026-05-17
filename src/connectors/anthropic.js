// Anthropic Direct connector.
// Docs: https://docs.anthropic.com/en/api/admin-api/usage-cost/get-cost-report
export const anthropicConnector = {
  id: "anthropic",
  label: "Anthropic Direct",
  provider: "Anthropic Direct",
  docs: "https://docs.anthropic.com/en/api/admin-api/usage-cost/get-cost-report",
  isConfigured() {
    return Boolean(import.meta.env.VITE_ANTHROPIC_PROXY_URL);
  },
  async fetchUsage({ start, end }) {
    const url = import.meta.env.VITE_ANTHROPIC_PROXY_URL;
    if (!url) return [];
    const res = await fetch(`${url}?start=${start}&end=${end}`);
    if (!res.ok) throw new Error(`Anthropic usage proxy failed: ${res.status}`);
    const json = await res.json();
    return json.map(r => ({ ...r, provider: "Anthropic Direct" }));
  },
};
