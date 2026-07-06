import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
  name: String,
  tagline: String,
  summary: String,
  location: String,
  timezone: String,
  email: String,
  linkedin: String,
  version: String,
  status: String,
  stats: [{ label: String, value: String, accent: String }],
});

const ReleaseSchema = new Schema({
  version: String,
  label: String,
  kind: { type: String, enum: ["future", "current", "past"], default: "past" },
  dateRange: String,
  title: String,
  role: String,
  notes: [{ heading: String, body: String }],
  gherkin: {
    feature: String,
    lines: [{ keyword: String, text: String }],
  },
  tags: [String],
  order: Number,
});

const ProjectSchema = new Schema({
  title: String,
  description: String,
  column: { type: String, enum: ["production", "shipped", "backlog"] },
  tags: [{ label: String, tone: String }],
  points: String,
  dashed: { type: Boolean, default: false },
  order: Number,
});

const RequirementSchema = new Schema({
  priority: { type: String, enum: ["P0", "P1", "P2"] },
  text: String,
  status: String,
  order: Number,
});

const DemoRequestSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    company: { type: String, trim: true, maxlength: 200 },
    message: { type: String, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

export const Profile = model("Profile", ProfileSchema);
export const Release = model("Release", ReleaseSchema);
export const Project = model("Project", ProjectSchema);
export const Requirement = model("Requirement", RequirementSchema);
export const DemoRequest = model("DemoRequest", DemoRequestSchema);
