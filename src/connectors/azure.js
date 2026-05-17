// Azure OpenAI connector — backed by Azure Cost Management.
// Docs: https://learn.microsoft.com/azure/cost-management-billing/costs/api-export-data
export const azureConnector = {
  id: "azure",
  label: "Azure OpenAI",
  provider: "Azure OpenAI",
  docs: "https://learn.microsoft.com/azure/cost-management-billing/costs/api-export-data",
  isConfigured() {
    return Boolean(import.meta.env.VITE_AZURE_COSTMGMT_PROXY_URL);
  },
  async fetchUsage({ start, end }) {
    const url = import.meta.env.VITE_AZURE_COSTMGMT_PROXY_URL;
    if (!url) return [];
    const res = await fetch(`${url}?start=${start}&end=${end}`);
    if (!res.ok) throw new Error(`Azure usage proxy failed: ${res.status}`);
    const json = await res.json();
    return json.map(r => ({ ...r, provider: "Azure OpenAI" }));
  },
};
