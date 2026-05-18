# Forge — AI Spend, Sculpted

A production React app for visualising and optimising AI spend across nine providers and twenty-plus models. Built like an instrument: silent chrome, sculpted motion, and a data layer designed to swap mock for live without touching the UI.

## Stack

- **Vite + React 18** — SPA scaffold, fast HMR, code-splitting via routes
- **Tailwind CSS** — design tokens (`ember`, `bone`, `ink`) + custom display / serif type
- **Framer Motion** — all animation: scroll-driven sculpture, layout-id pills, micro-interactions
- **Lenis** — smooth scroll (respects `prefers-reduced-motion`)
- **Recharts** — every chart in the dashboard
- **React Router** — `/` landing, `/dashboard` instrument

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Architecture

```
src/
  pages/                    Landing + DashboardPage
  components/
    shell/                  Nav, Footer
    landing/                Hero · Marquee · Sculpture · Materials · Engineering
                            Providers · Numbers · CTA
    dashboard/
      Dashboard.jsx         orchestrator
      Header · RangeBar · Tabs · KPI · Panel · Badge
      tabs/                 Overview · Models · Projects · Efficiency · Recommendations
  data/
    models.js               23-model catalogue (single source of truth)
    providers.js            provider → colour map
    timeseries.js           37-month deterministic baseline generator
  connectors/
    index.js                CONNECTORS[] + loadAllUsage({start,end})
    openai · anthropic · azure · gcp · aws · databricks
  lib/
    useLenis.js             smooth-scroll bootstrap
    useUsageData.js         merges live connector records into baseline
    format.js
```

## Connecting real data

Each connector calls a **backend proxy** (provider billing APIs are not CORS-enabled and require admin credentials — never ship secrets in the browser). Copy `.env.example` to `.env.local`:

```
VITE_OPENAI_PROXY_URL=https://api.yourbackend.com/ai-spend/openai
VITE_ANTHROPIC_PROXY_URL=...
```

Your backend returns `UsageRecord[]`:

```ts
type UsageRecord = {
  provider: "OpenAI Direct" | "Anthropic Direct" | "Azure OpenAI" | ...,
  model:    string,    // must match a name in src/data/models.js
  monthKey: string,    // "YYYY-MM"
  spendUsd: number,
  tokens:   number,
  cacheHit?: number,   // 0-100
  errRate?:  number,   // percent
};
```

The dashboard merges live records into the baseline by `(month, provider, model)` — partially-configured connectors degrade gracefully. The `RangeBar` shows a green pulse when live data is active.

### Provider docs

| Connector  | API surface                            | Docs |
| ---------- | -------------------------------------- | ---- |
| OpenAI     | `/v1/organization/usage`               | https://platform.openai.com/docs/api-reference/usage |
| Anthropic  | Admin API — cost report                | https://docs.anthropic.com/en/api/admin-api/usage-cost/get-cost-report |
| Azure      | Cost Management export                 | https://learn.microsoft.com/azure/cost-management-billing/costs/api-export-data |
| GCP        | BigQuery billing export (Vertex+Gemini)| https://cloud.google.com/billing/docs/how-to/export-data-bigquery |
| AWS        | Cost Explorer + Bedrock CloudWatch     | https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html |
| Databricks | System tables · `billing.usage`        | https://docs.databricks.com/en/admin/system-tables/billing.html |

## Design language

- **Type** — Instrument Serif for display, Inter for UI, JetBrains Mono for numerics.
- **Palette** — `ink` (near-black), `bone` (warm off-white), `ember` (signature `#ff5b1f`), `copper`.
- **Motion** — every transition uses the curve `[0.22, 1, 0.36, 1]`; tabs and range presets use Framer `layoutId` for shared-element flow; the hero sculpture parallaxes on scroll; the Sculpture section is cursor-driven 3D parallax tied to real spend data.
- **Responsive** — fluid type via `clamp()`, mobile layouts on every section.

## Production checklist

- [ ] Stand up backend proxies for the connectors you use
- [ ] Add auth in front of `/dashboard`
- [ ] Replace the baseline with cached Snowflake materialisations
- [ ] Wire `Cost per Task` / `Cost per Order` into Efficiency
