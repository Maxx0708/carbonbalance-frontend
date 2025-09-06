// src/api.js
const API_BASE = process.env.REACT_APP_API_BASE || "/api";

let _token = localStorage.getItem("token");
export function setToken(t) {
  _token = t || null;
  if (t) localStorage.setItem("token", t);
  else localStorage.removeItem("token");
}
export function getToken() { return _token; }
export function clearToken() { setToken(null); }

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const h = { "Content-Type": "application/json", ...headers };
  if (_token) h.Authorization = `Bearer ${_token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = {};
  try { data = await res.json(); } catch { }
  if (!res.ok) {
    if (res.status === 401) clearToken();
    const msg = data.error || data.message || res.statusText || "request_failed";
    throw new Error(msg);
  }
  return data;
}

export const api = {
  // AUTH
  async login(email, password) {
    const out = await request("/auth/login", { method: "POST", body: { email, password } });
    if (out.access_token) setToken(out.access_token);
    return out; // { access_token, user }
  },

  // Alias for convenience (so Dashboard can call api.getProjects)
  async getProjects(userId) {
       return this.listProjectsByUser(userId);
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
  return data.project; // { id, ... }
},
  async getProject(projectId) { return request(`/projects/${projectId}`); },
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

  // METRICS + RECOMMENDATIONS
  async sendBuildingMetrics(projectId, metrics, { dryRun = false } = {}) {
  const q = dryRun ? "?dry_run=1" : "";
  return request(`/projects/${projectId}/metrics${q}`, { method: "POST", body: { metrics } });
},
  async getRecommendations(projectId) {
  const data = await request(`/projects/${projectId}/recommendations`);
  return data.recommendations;
},
};

if (_token) setToken(_token);
