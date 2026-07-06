# Nisargi Shah — portfolio, built like a product

A portfolio website where the career is the product: the About page is a **PRD**, Experience is a **Roadmap with release notes and Gherkin acceptance criteria**, Projects is a **Sprint board**, and Contact is **Book a demo** (with a working demo-request form that writes to MongoDB).

**Stack:** MongoDB · Express · React (Vite) · Node.js

```
portfolio website/
├── client/            React front end (Vite + React Router)
├── server/            Express API + Mongoose models + seed script
├── static-version/    Original zero-dependency HTML version (backup)
└── package.json       Convenience scripts
```

## Setup

Prerequisites: Node.js 18+ and a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

**1. Install dependencies**

```bash
npm run install:all
```

**2. Configure the database**

```bash
cd server
copy .env.example .env      # Windows (use `cp` on macOS/Linux)
```

Edit `server/.env` and paste your Atlas connection string into `MONGODB_URI`
(Atlas → Database → Connect → Drivers). Make sure your IP is allowed under
Network Access (or allow `0.0.0.0/0` while developing).

**3. Seed the database with resume data**

```bash
npm run seed        # from the repo root
```

**4. Run it (two terminals)**

```bash
npm run dev:server   # API on http://localhost:5000
npm run dev:client   # site on http://localhost:5173
```

Open http://localhost:5173.

> No database yet? The API serves the same content from in-memory seed data,
> so the site works before Atlas is configured — only the demo-request form
> needs a live database.

## API

| Method | Route                | Purpose                          |
| ------ | -------------------- | -------------------------------- |
| GET    | `/api/health`        | Status + DB connection state     |
| GET    | `/api/profile`       | Hero content and stats           |
| GET    | `/api/releases`      | Roadmap (career as releases)     |
| GET    | `/api/projects`      | Sprint-board cards               |
| GET    | `/api/requirements`  | PRD requirements table           |
| POST   | `/api/demo-requests` | Store a recruiter demo request   |

## Production build

```bash
npm run build        # outputs client/dist
```

Deploy the API (Render/Railway/Fly) and the client (Vercel/Netlify), or serve
`client/dist` from Express. Set `MONGODB_URI` in your host's environment
variables — never commit `.env`.
