import { http, HttpResponse, delay } from "msw";
import { db } from "../db";

const BASE = /\/api\/seller\/calendar$/;
const BOOKING = /\/api\/seller\/calendar\/bookings\/([^/]+)$/;
const SETTINGS = /\/api\/seller\/calendar\/settings$/;

export const calendarHandlers = [
  http.get(BASE, async () => {
    await delay(250);
    return HttpResponse.json(db.calendar.dashboard());
  }),

  http.post(BOOKING, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json().catch(() => ({}));
    const status = String(body?.status || "").trim();
    const ok = db.calendar.updateBooking(id, status);
    if (!ok) return HttpResponse.json({ message: "Booking not found" }, { status: 404 });
    return HttpResponse.json({ ok: true });
  }),

  http.post(SETTINGS, async ({ request }) => {
    await delay(250);
    const body = await request.json().catch(() => ({}));
    db.calendar.saveSettings(body);
    return HttpResponse.json({ ok: true });
  }),
];
