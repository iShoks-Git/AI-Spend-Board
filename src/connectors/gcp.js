// GCP Vertex AI + Gemini connector — backed by BigQuery billing export.
// Docs: https://cloud.google.com/billing/docs/how-to/export-data-bigquery
export const gcpConnector = {
  id: "gcp",
  label: "GCP Vertex AI & Gemini",
  provider: "GCP Vertex AI",
  docs: "https://cloud.google.com/billing/docs/how-to/export-data-bigquery",
  isConfigured() {
    return Boolean(import.meta.env.VITE_GCP_BILLING_PROXY_URL);
  },
  async fetchUsage({ start, end }) {
    const url = import.meta.env.VITE_GCP_BILLING_PROXY_URL;
    if (!url) return [];
    const res = await fetch(`${url}?start=${start}&end=${end}`);
    if (!res.ok) throw new Error(`GCP billing proxy failed: ${res.status}`);
    const json = await res.json();
    // Backend should tag rows with the right provider label
    // ("GCP Vertex AI" or "Google Gemini").
    return json;
  },
};
