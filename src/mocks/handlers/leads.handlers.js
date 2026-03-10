import { http, HttpResponse, delay } from "msw";
import { db } from "../db";

const LIST = /\/api\/seller\/leads$/;
const STATUS = /\/api\/seller\/leads\/([^/]+)\/status$/;
const BOOKING = /\/api\/seller\/leads\/([^/]+)\/booking$/;

export const leadsHandlers = [
  http.get(LIST, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "rentals";
    return HttpResponse.json({ type, items: db.leads.list(type) });
  }),

  http.post(STATUS, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const id = url.pathname.split("/").slice(-2)[0]; // .../leads/:id/status
    const body = await request.json().catch(() => ({}));
    const status = String(body?.status || "").trim();
    const ok = db.leads.updateStatus(id, status);
    if (!ok) return HttpResponse.json({ message: "Lead not found" }, { status: 404 });
    return HttpResponse.json({ ok: true });
  }),

  http.post(BOOKING, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const id = url.pathname.split("/").slice(-2)[0]; // .../leads/:id/booking
    const body = await request.json().catch(() => ({}));
    const dateLabel = String(body?.dateLabel || "Jan 7,2026 - 2PM").trim();
    const ok = db.leads.submitBooking(id, dateLabel);
    if (!ok) return HttpResponse.json({ message: "Lead not found" }, { status: 404 });
    return HttpResponse.json({ ok: true });
  }),
];
