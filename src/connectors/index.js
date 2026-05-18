// Unified provider connector layer.
//
// Each connector normalises raw billing/usage data into UsageRecord:
//   { provider, model, monthKey, spendUsd, tokens, cacheHit?, errRate? }
//
// The dashboard consumes the merged stream via `loadAllUsage({ start, end })`.
// If no credentials are configured, connectors return [] and the UI falls
// back to the deterministic mock series in src/data/timeseries.js.
//
// Credentials are read from import.meta.env (Vite). For browser deployments
// you should proxy calls through a backend — most provider billing APIs
// disallow direct CORS access. The connector signatures are designed so
// you can swap `fetch("/api/openai/usage")` for the real endpoint without
// changing the dashboard.

import { openaiConnector }     from "./openai.js";
import { anthropicConnector }  from "./anthropic.js";
import { azureConnector }      from "./azure.js";
import { gcpConnector }        from "./gcp.js";
import { awsConnector }        from "./aws.js";
import { databricksConnector } from "./databricks.js";

export const CONNECTORS = [
  openaiConnector,
  anthropicConnector,
  azureConnector,
  gcpConnector,
  awsConnector,
  databricksConnector,
];

export async function loadAllUsage(range) {
  const results = await Promise.allSettled(
    CONNECTORS.filter(c => c.isConfigured()).map(c => c.fetchUsage(range))
  );
  return results
    .filter(r => r.status === "fulfilled")
    .flatMap(r => r.value);
}

export function listConnectorStatus() {
  return CONNECTORS.map(c => ({
    id: c.id,
    label: c.label,
    provider: c.provider,
    configured: c.isConfigured(),
    docs: c.docs,
  }));
}
