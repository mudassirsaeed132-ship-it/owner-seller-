import { http, HttpResponse, delay } from "msw";
import { db } from "../db";

const PRIVACY = /\/api\/seller\/privacy$/;

export const privacyHandlers = [
  http.get(PRIVACY, async () => {
    await delay(250);
    return HttpResponse.json(db.privacy.get());
  }),

  http.put(PRIVACY, async ({ request }) => {
    await delay(250);
    const body = await request.json().catch(() => ({}));
    const next = db.privacy.update(body);
    return HttpResponse.json(next);
  }),
];
