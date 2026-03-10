import { http, HttpResponse, delay } from "msw";
import { db } from "../db";

const BASE = /\/api\/seller\/profile$/;
const SETTINGS = /\/api\/seller\/profile\/settings$/;

export const profileHandlers = [
  http.get(BASE, async () => {
    await delay(200);
    return HttpResponse.json(db.profile.get());
  }),

  http.post(BASE, async ({ request }) => {
    await delay(200);
    const body = await request.json().catch(() => ({}));
    db.profile.update(body);
    return HttpResponse.json(db.profile.get());
  }),

  http.post(SETTINGS, async ({ request }) => {
    await delay(200);
    const body = await request.json().catch(() => ({}));
    db.profile.updateSettings(body);
    return HttpResponse.json(db.profile.get());
  }),
];
