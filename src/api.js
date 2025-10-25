// src/api.js
const API_BASE = process.env.REACT_APP_API_BASE || "/api";

// --- token & auth helpers -------------------------------------------------
let _token = localStorage.getItem("token") || null;

export function setToken(t) {
  _token = t || null;
  if (t) localStorage.setItem("token", t);
  else localStorage.removeItem("token");
}

export function getToken() { return _token; }
export function clearToken() { setToken(null); }

export function setAuth(authObj) {
  if (authObj) localStorage.setItem("auth", JSON.stringify(authObj));
  else localStorage.removeItem("auth");
}
export function getAuth() {
  try { return JSON.parse(localStorage.getItem("auth")); } catch { return null; }
}
export function getUserId() {
  const a = getAuth();
  return a?.user?.id ?? null;
}

// --- low-level request ----------------------------------------------------
async function request(path, { method = "GET", body, headers = {} } = {}) {
  const h = { "Content-Type": "application/json", ...headers };
  if (_token) h.Authorization = `Bearer ${_token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    if (res.status === 401) clearToken();
    const msg = data.error || data.message || res.statusText || "request_failed";
    throw new Error(msg);
  }
  return data;
}

// --- high-level API -------------------------------------------------------
export const api = {
  // AUTH
  async login(email, password) {
    const out = await request("/auth/login", { method: "POST", body: { email, password } });
    if (out?.access_token) {
      setToken(out.access_token);
      setAuth(out);
    }
    return out;
  },

  // ADMIN USERS
  async createUser({ name, email, password, role, default_access_level }) {
    const data = await request("/admin/users", {
      method: "POST",
      body: { name, email, password, role, default_access_level },
    });
    return data.user;
  },

  // PROJECTS
  async createProject(payload) {
    const data = await request("/projects", { method: "POST", body: payload });
    return data.project;
  },
  async getProject(projectId) {
    return request(`/projects/${projectId}`);
  },
  async patchProject(projectId, partial) {
    return request(`/projects/${projectId}`, { method: "PATCH", body: partial });
  },
  async deleteProject(projectId) {
    return request(`/projects/${projectId}`, { method: "DELETE" });
  },

  async listProjectsByUser(userId) {
    const data = await request(`/users/${userId}/projects`);
    return data.projects;
  },
  async listMyProjects() {
    const uid = getUserId();
    if (!uid) throw new Error("no_user");
    return this.listProjectsByUser(uid);
  },

  // THEMES & WEIGHTS
  async listThemes() {
    const data = await request("/themes");
    return data.themes;
  },
  async getProjectThemeScores(projectId) {
    return request(`/projects/${projectId}/theme-scores`);
  },
  async saveProjectThemes(projectId, weights, { dryRun = false } = {}) {
    const q = dryRun ? "?dry_run=1" : "";
    return request(`/projects/${projectId}/themes${q}`, { method: "POST", body: { weights } });
  },

  // METRICS
  async sendBuildingMetrics(projectId, metrics, { dryRun = false } = {}) {
    const q = dryRun ? "?dry_run=1" : "";
    return request(`/projects/${projectId}/metrics${q}`, { method: "POST", body: { metrics } });
  },

  // INTERVENTIONS - Single (keep for backwards compat)
  async applyIntervention(projectId, interventionId, { dryRun = false } = {}) {
    const q = dryRun ? "?dry_run=1" : "";
    return request(`/projects/${projectId}/apply${q}`, {
      method: "POST",
      body: { intervention_id: interventionId },
    });
  },

  // INTERVENTIONS - Batch (NEW - use this for the loop!)
  async applyInterventionsBatch(projectId, interventionIds, { dryRun = false } = {}) {
    const q = dryRun ? "?dry_run=1" : "";
    return request(`/projects/${projectId}/apply-batch${q}`, {
      method: "POST",
      body: { intervention_ids: interventionIds },
    });
  },

  // RECOMMENDATIONS
  async getRecommendations(projectId) {
    const data = await request(`/projects/${projectId}/recommendations`);
    return data.recommendations;
  },

  // IMPLEMENTED INTERVENTIONS (NEW - for report page)
  async getImplementedInterventions(projectId) {
    const data = await request(`/projects/${projectId}/implemented-with-scores`);
    return (
      data?.implemented_interventions ||
      data?.interventions ||
      []
    );
  },
};

// hydrate token on load
if (_token) setToken(_token);