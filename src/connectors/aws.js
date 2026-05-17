// AWS Bedrock connector — backed by Cost Explorer + CloudWatch.
// Docs: https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html
export const awsConnector = {
  id: "aws",
  label: "AWS Bedrock",
  provider: "AWS Bedrock",
  docs: "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html",
  isConfigured() {
    return Boolean(import.meta.env.VITE_AWS_BEDROCK_PROXY_URL);
  },
  async fetchUsage({ start, end }) {
    const url = import.meta.env.VITE_AWS_BEDROCK_PROXY_URL;
    if (!url) return [];
    const res = await fetch(`${url}?start=${start}&end=${end}`);
    if (!res.ok) throw new Error(`AWS Bedrock proxy failed: ${res.status}`);
    const json = await res.json();
    return json.map(r => ({ ...r, provider: "AWS Bedrock" }));
  },
};
