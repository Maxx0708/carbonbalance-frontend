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
    // Persist token AND user so pages can know current user id
    if (out?.access_token) {
      setToken(out.access_token);
      setAuth(out);                     // <--- store {access_token, user}
    }
    return out; // { access_token, user }
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

  // List projects by explicit user id (backend route you already have)
  async listProjectsByUser(userId) {
    const data = await request(`/users/${userId}/projects`);
    return data.projects; // array
  },
  // Convenience wrapper that uses the logged-in user
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

  // METRICS & RECOs
  async sendBuildingMetrics(projectId, metrics, { dryRun = false } = {}) {
    const q = dryRun ? "?dry_run=1" : "";
    // Your backend accepts {metrics:{...}} (and we kept that shape)
    return request(`/projects/${projectId}/metrics${q}`, { method: "POST", body: { metrics } });
  },
  async getRecommendations(projectId) {
    const res = await fetch(`/api/projects/${projectId}/recommendations`);
    if (!res.ok) throw new Error(`Recommendations failed: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data?.recommendations) ? data.recommendations : data;
  },
};

// hydrate in case token existed before refresh
if (_token) setToken(_token);
