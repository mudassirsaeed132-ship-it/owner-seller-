// PATH: src/services/api/client.js
async function parse(res) {
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = typeof data === "string" ? data : data?.message || "Request failed";
    throw new Error(msg);
  }
  return data;
}

export async function apiGet(url) {
  const res = await fetch(url);
  return parse(res);
}

export async function apiPost(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return parse(res);
}

export async function apiDelete(url) {
  const res = await fetch(url, { method: "DELETE" });
  return parse(res);
}