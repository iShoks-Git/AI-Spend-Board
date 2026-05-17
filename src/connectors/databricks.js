// Databricks Foundation Model APIs.
// Docs: https://docs.databricks.com/en/admin/system-tables/billing.html
export const databricksConnector = {
  id: "databricks",
  label: "Databricks",
  provider: "Databricks",
  docs: "https://docs.databricks.com/en/admin/system-tables/billing.html",
  isConfigured() {
    return Boolean(import.meta.env.VITE_DATABRICKS_PROXY_URL);
  },
  async fetchUsage({ start, end }) {
    const url = import.meta.env.VITE_DATABRICKS_PROXY_URL;
    if (!url) return [];
    const res = await fetch(`${url}?start=${start}&end=${end}`);
    if (!res.ok) throw new Error(`Databricks proxy failed: ${res.status}`);
    const json = await res.json();
    return json.map(r => ({ ...r, provider: "Databricks" }));
  },
};
