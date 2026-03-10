import { ENDPOINTS } from "../../../services/api/endpoints";

const BASE = ENDPOINTS?.sellerProfile || "/api/seller/profile";

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);
  return data;
}

export const profileApi = {
  get: () => request(BASE),

  update: (payload) =>
    request(BASE, {
      method: "POST",
      body: JSON.stringify(payload || {}),
    }),

  updateSettings: (payload) =>
    request(`${BASE}/settings`, {
      method: "POST",
      body: JSON.stringify(payload || {}),
    }),
};
