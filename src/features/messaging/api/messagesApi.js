import { ENDPOINTS } from "../../../services/api/endpoints";

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export const messagesApi = {
  list: ({ tab }) => request(`${ENDPOINTS.sellerMessages}?tab=${encodeURIComponent(tab)}`),

  thread: ({ id }) => request(`${ENDPOINTS.sellerMessages}/${encodeURIComponent(id)}`),

  send: ({ id, text }) =>
    request(`${ENDPOINTS.sellerMessages}/${encodeURIComponent(id)}`, {
      method: "POST",
      body: JSON.stringify({ text }),
    }),
};
