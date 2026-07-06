import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { Profile, Release, Project, Requirement, DemoRequest } from "./models.js";
import * as fallback from "./data/seedData.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50kb" }));

const PORT = process.env.PORT || 5000;
let dbReady = false;

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      dbReady = true;
      console.log("MongoDB connected.");
    })
    .catch((err) => {
      console.warn("MongoDB connection failed — serving seed data from memory.");
      console.warn(" ", err.message);
    });
} else {
  console.warn("MONGODB_URI not set — serving seed data from memory.");
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", db: dbReady ? "connected" : "fallback", uptime: process.uptime() });
});

app.get("/api/profile", async (_req, res, next) => {
  try {
    const doc = dbReady ? await Profile.findOne().lean() : null;
    res.json(doc || fallback.profile);
  } catch (err) { next(err); }
});

app.get("/api/releases", async (_req, res, next) => {
  try {
    const docs = dbReady ? await Release.find().sort({ order: 1 }).lean() : [];
    res.json(docs.length ? docs : fallback.releases);
  } catch (err) { next(err); }
});

app.get("/api/projects", async (_req, res, next) => {
  try {
    const docs = dbReady ? await Project.find().sort({ order: 1 }).lean() : [];
    res.json(docs.length ? docs : fallback.projects);
  } catch (err) { next(err); }
});

app.get("/api/requirements", async (_req, res, next) => {
  try {
    const docs = dbReady ? await Requirement.find().sort({ order: 1 }).lean() : [];
    res.json(docs.length ? docs : fallback.requirements);
  } catch (err) { next(err); }
});

app.post("/api/demo-requests", async (req, res, next) => {
  try {
    const { name, email, company, message } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: "name and email are required" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "invalid email" });
    if (!dbReady) return res.status(503).json({ error: "Database not connected — email nisargi3112@gmail.com directly." });
    const doc = await DemoRequest.create({ name, email, company, message });
    res.status(201).json({ ok: true, id: doc._id, message: "Demo request received. SLA: reply within 24h." });
  } catch (err) { next(err); }
});

const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
  console.log("Serving React build from client/dist.");
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
