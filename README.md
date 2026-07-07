# Nisargi Shah — portfolio, built like a product

**Live site:** [nisargi-portfolio.onrender.com](https://nisargi-portfolio.onrender.com)

A portfolio where the career is the product: the About page is a **PRD**, Experience is a **Roadmap with release notes and Gherkin acceptance criteria**, Projects is a **Sprint board**, and Contact is **Book a demo** — with a working demo-request form backed by MongoDB.

**Stack:** MongoDB · Express · React (Vite) · Node.js — deployed on Render.

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
├── client/            React front end (Vite + React Router, custom motion hooks)
├── server/            Express API + Mongoose models + seed script
├── static-version/    Zero-dependency HTML version (backup)
├── render.yaml        Render Blueprint (one-service deploy)
└── package.json       Root convenience scripts
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

## Deployment (Render)

Deployed as a single Render web service via `render.yaml` (Blueprint):

- **Build:** `npm run render-build` — builds the React client, installs server deps
- **Start:** `npm start` — Express serves both the API and `client/dist`
- **Env:** set `MONGODB_URI` in the service's Environment settings to enable the database (a placeholder keeps the site running on seed data)

The service deploys from the public repo, so pushes don't auto-deploy — after committing changes, use **Manual Deploy → Deploy latest commit** in the Render dashboard.

> Free-tier note: the instance sleeps after inactivity; the first request after a while takes ~30–50 s to wake.

## Contact

**Nisargi Shah** · [nisargi3112@gmail.com](mailto:nisargi3112@gmail.com) · [LinkedIn](https://www.linkedin.com/in/nisargi-shah/)
