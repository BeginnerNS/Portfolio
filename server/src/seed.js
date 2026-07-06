import "dotenv/config";
import mongoose from "mongoose";
import { Profile, Release, Project, Requirement } from "./models.js";
import { profile, releases, projects, requirements } from "./data/seedData.js";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

try {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB.");

  await Promise.all([
    Profile.deleteMany({}),
    Release.deleteMany({}),
    Project.deleteMany({}),
    Requirement.deleteMany({}),
  ]);

  await Profile.create(profile);
  await Release.insertMany(releases);
  await Project.insertMany(projects);
  await Requirement.insertMany(requirements);

  console.log(
    `Seeded: 1 profile, ${releases.length} releases, ${projects.length} projects, ${requirements.length} requirements.`
  );
} catch (err) {
  console.error("Seed failed:", err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
