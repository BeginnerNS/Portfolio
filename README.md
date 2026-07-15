# Nisargi Shah — portfolio, built like a product

**Live site:** [nisargi-portfolio.vercel.app](https://nisargi-portfolio.vercel.app)

A portfolio where the career is the product: the About page is a **PRD**, Experience is a **Roadmap with release notes and Gherkin acceptance criteria**, Projects is a **Sprint board**, and Contact is **Book a demo** — with a working demo-request form backed by MongoDB.

**Stack:** MongoDB · Express · React (Vite) · Node.js — deployed on Vercel.

## Pages

| Route      | PM artifact                             | Replaces        |
| ---------- | --------------------------------------- | --------------- |
| `/`        | Product launch page with live metrics   | Home            |
| `/prd`     | Product requirements document           | About           |
| `/roadmap` | Version releases + BDD acceptance tests | Experience      |
| `/board`   | Kanban sprint board                     | Projects        |
| `/contact` | Book a demo + demo-request form         | Contact         |

## Project structure

```
├── api/               Vercel serverless function — Express app (all /api/* routes)
├── client/            React front end (Vite + React Router, custom motion hooks)
├── server/            Mongoose models, seed script, local-dev entry point
├── static-version/    Zero-dependency HTML version (backup)
├── vercel.json        Vercel config (build + routing)
└── package.json       Root scripts + server dependencies
```

## Run locally

Prerequisites: Node.js 18+.

```bash
npm run install:all      # installs client + server deps
npm run dev:server       # API on http://localhost:5000
npm run dev:client       # site on http://localhost:5173 (separate terminal)
```

Works out of the box with no database — the API serves in-memory seed data.

### Optional: connect MongoDB Atlas

1. Create a free M0 cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas); add a database user and allow your IP (or `0.0.0.0/0`).
2. `cd server` → copy `.env.example` to `.env` → paste your connection string into `MONGODB_URI`.
3. `npm run seed` (from the repo root) to load resume data into the database.

With Atlas connected, `POST /api/demo-requests` persists recruiter demo requests to the `demorequests` collection.

## API

| Method | Route                | Purpose                        |
| ------ | -------------------- | ------------------------------ |
| GET    | `/api/health`        | Status + DB connection state   |
| GET    | `/api/profile`       | Hero content and stats         |
| GET    | `/api/releases`      | Roadmap (career as releases)   |
| GET    | `/api/projects`      | Sprint-board cards             |
| GET    | `/api/requirements`  | PRD requirements table         |
| POST   | `/api/demo-requests` | Store a recruiter demo request |

All GET routes fall back to in-memory seed data when no database is connected. Any non-`/api` GET serves the built React app (SPA catch-all).

## Deployment (Vercel)

Deployed on Vercel — static frontend + Express API as a serverless function.

**Architecture on Vercel:**
- `client/dist` — Vite build, served as static assets (instant, global CDN)
- `api/index.js` — Express app as a serverless function handling all `/api/*` routes
- `vercel.json` — routes `/api/*` to the function, SPA catch-all for client-side routing

**Required environment variable** (set in Vercel dashboard → Settings → Environment Variables):

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your Atlas connection string |

Without `MONGODB_URI` the API falls back to in-memory seed data — the site still works.

**To deploy from scratch:**
1. Import the repo at [vercel.com/new](https://vercel.com/new) — pick `beginnerNS/portfolio`
2. Vercel auto-detects `vercel.json`; no framework override needed
3. Add `MONGODB_URI` in Settings → Environment Variables
4. Deploy — Vercel runs `npm install` then `cd client && npm install && npm run build`

Pushes to `main` auto-deploy. Preview deployments are created for every PR.

## Contact

**Nisargi Shah** · [nisargi3112@gmail.com](mailto:nisargi3112@gmail.com) · [LinkedIn](https://www.linkedin.com/in/nisargi-shah/)
