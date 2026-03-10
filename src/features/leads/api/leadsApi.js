import { ENDPOINTS } from "../../../services/api/endpoints";

const BASE = ENDPOINTS?.sellerLeads || "/api/seller/leads";

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

export const leadsApi = {
  list: ({ type }) => request(`${BASE}?type=${encodeURIComponent(type)}`),

  updateStatus: ({ id, status }) =>
    request(`${BASE}/${encodeURIComponent(id)}/status`, {
      method: "POST",
      body: JSON.stringify({ status }),
    }),

  submitBooking: ({ id, dateLabel }) =>
    request(`${BASE}/${encodeURIComponent(id)}/booking`, {
      method: "POST",
      body: JSON.stringify({ dateLabel }),
    }),
};