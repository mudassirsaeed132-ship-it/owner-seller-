import { http, HttpResponse, delay } from "msw";
import { db } from "../db";

const LIST = /\/api\/seller\/listings$/;
const ITEM = /\/api\/seller\/listings\/([^/]+)$/;

export const listingsHandlers = [
  http.get(LIST, async () => {
    await delay(250);
    return HttpResponse.json(db.listings.all());
  }),

  http.post(LIST, async ({ request }) => {
    await delay(250);
    const body = await request.json();
    const created = db.listings.create(body);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.delete(ITEM, async ({ params }) => {
    await delay(200);
    const ok = db.listings.remove(params[0] || params.id);
    return HttpResponse.json({ ok });
  }),
];
