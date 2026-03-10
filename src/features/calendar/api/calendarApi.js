import { ENDPOINTS } from "../../../services/api/endpoints";

const BASE = ENDPOINTS?.sellerCalendar || "/api/seller/calendar";

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

export const calendarApi = {
  dashboard: () => request(BASE),

  updateBooking: ({ id, status }) =>
    request(`${BASE}/bookings/${encodeURIComponent(id)}`, {
      method: "POST",
      body: JSON.stringify({ status }),
    }),

  saveSettings: (payload) =>
    request(`${BASE}/settings`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};