# Career Anchors

A bilingual (Polish / English) questionnaire exploring Edgar Schein's eight career anchors, with individual results and population statistics.

> **Historical project — development and maintenance have ended.** Its responsibilities have been absorbed by [aptido.io](https://aptido.io). This repository preserves the standalone application for reference and portfolio purposes. It is not the source code of the Aptido platform.

## What it includes

- A four-step questionnaire: demographics, 40 statement ratings, three priorities, and results.
- Scores and descriptions for eight career anchors, including the effect of the selected priorities.
- Polish and English interfaces, responsive charts, and locally saved progress.
- Optional Supabase persistence and statistical views with demographic filters.
- Academic analysis and presentation in Polish in [`public/docs`](public/docs).

This is a self-reflection and research application. Its scoring is project-specific, not a claim of a standardized or validated diagnostic instrument. See [`src/lib/calculations.js`](src/lib/calculations.js) for the implemented formula.

## Run locally

Use Node.js 22.12 or newer (Node 22 is pinned in `.nvmrc`) and npm.

```sh
nvm use
npm ci
npm run dev
```

Open the URL printed by Vite. **No credentials are needed for the questionnaire and local scoring.** Without Supabase configuration, responses are not sent to a database and the statistics page reports that the database is not configured. Progress remains in the browser's local storage.

To inspect the optional integration, copy `.env.example` to `.env.local` and use your own isolated Supabase development project with synthetic data. Empty values keep the integration disabled. Do not connect a local checkout or a fork to the production database. The old database schema is intentionally not offered as a deployment recipe: its anonymous read policy exposed individual response rows. See [security notes](SECURITY.md).

```sh
npm run lint
npm test
npm run build
npm run preview
```

`preview` serves the compiled frontend; it does not emulate Vercel's serverless API or cron scheduler. Vite may report a large bundle warning because of the charting dependencies.

## Architecture

| Path | Responsibility |
| --- | --- |
| `src/steps/` | Questionnaire and result screens |
| `src/data/` | Anchor definitions and translations |
| `src/lib/` | Scoring, language context, browser persistence, optional Supabase client |
| `src/stats/` | Statistical aggregation and charts |
| `src/pages/` | About, privacy, terms, and routing pages |
| `api/keep-alive.js` | Legacy authenticated Supabase health check for Vercel Cron |
| `public/docs/` | Historical academic materials |

Built with React 19, Vite 8, Tailwind CSS 4, React Router, Recharts, Framer Motion, and Supabase. The historical app also includes Vercel Analytics and Speed Insights.

## Deployment status

Automatic Git deployments are disabled in `vercel.json`. The original repository has also been disconnected from Vercel, leaving the existing production deployment in place. GitHub Actions only checks the source; it does not deploy.

Publishing or updating this repository must not replace the running legacy application. Manual Vercel CLI deployments, deploy hooks, and reconnecting infrastructure are separate operations. See [deployment notes](docs/DEPLOYMENT.md).

## Project status and reuse

No new features, routine dependency updates, or support commitments are planned. See [contribution policy](CONTRIBUTING.md) and [security notes](SECURITY.md).

No open-source license has been granted in this repository. Public availability does not grant a general permission to reuse or redistribute its code, questionnaire text, academic documents, or other assets. Third-party dependencies retain their own licenses. Contact the repository owner through [their GitHub profile](https://github.com/drolewski) about permissions.
