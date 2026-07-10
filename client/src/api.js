import * as data from "./data/fallback.js";

// All portfolio content ships with the bundle — no backend, no cold starts.
const resolve = (d) => Promise.resolve(d);

export const fetchProfile = () => resolve(data.profile);
export const fetchReleases = () => resolve(data.releases);
export const fetchProjects = () => resolve(data.projects);
export const fetchRequirements = () => resolve(data.requirements);

// Demo requests are delivered by FormSubmit straight to my inbox.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/nisargi3112@gmail.com";

export async function submitDemoRequest(payload) {
  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Portfolio demo request from ${payload.name}`,
      _template: "table",
      ...payload,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === "false") {
    throw new Error(body.message || "Request failed");
  }
  return { message: "Demo request received. SLA: reply within 24h." };
}
