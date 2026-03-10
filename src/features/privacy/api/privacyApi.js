// FRONTEND-ONLY API (MSW + real backend friendly)

const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const PRIVACY_URL = `${BASE}/api/seller/privacy`;

async function parseJson(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

export async function getPrivacyControls() {
  const res = await fetch(PRIVACY_URL, { method: "GET" });
  return parseJson(res);
}

export async function updatePrivacyControls(payload) {
  const res = await fetch(PRIVACY_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });
  return parseJson(res);
}
