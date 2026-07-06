import * as fallback from "./data/fallback.js";

const cache = new Map();

async function get(path, fallbackData) {
  if (cache.has(path)) return cache.get(path);
  try {
    const res = await fetch(`/api/${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cache.set(path, data);
    return data;
  } catch {
    cache.set(path, fallbackData);
    return fallbackData;
  }
}

export const fetchProfile = () => get("profile", fallback.profile);
export const fetchReleases = () => get("releases", fallback.releases);
export const fetchProjects = () => get("projects", fallback.projects);
export const fetchRequirements = () => get("requirements", fallback.requirements);

export async function submitDemoRequest(payload) {
  const res = await fetch("/api/demo-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}
