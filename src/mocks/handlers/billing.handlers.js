import { http, HttpResponse, delay } from "msw";
import { db } from "../db";

const INVOICES = /\/api\/seller\/billing\/invoices$/;
const RECEIPT = /\/api\/seller\/billing\/invoices\/([^/]+)\/receipt$/;
const PDF = /\/api\/seller\/billing\/invoices\/([^/]+)\/pdf$/;

const METHODS = /\/api\/seller\/billing\/payment-methods$/;
const SUBSCRIPTION = /\/api\/seller\/billing\/subscription$/;

export const billingHandlers = [
  http.get(INVOICES, async () => {
    await delay(250);
    return HttpResponse.json({ items: db.billing.invoices() });
  }),

  http.get(RECEIPT, async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const id = url.pathname.split("/").slice(-2)[0];
    const data = db.billing.receipt(id);
    if (!data) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(data);
  }),

  http.get(PDF, async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const id = url.pathname.split("/").slice(-2)[0];
    const data = db.billing.pdf(id);
    if (!data) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(data);
  }),

  http.get(METHODS, async () => {
    await delay(250);
    return HttpResponse.json(db.billing.paymentMethods());
  }),

  http.post(METHODS, async ({ request }) => {
    await delay(250);
    const body = await request.json().catch(() => ({}));
    const ok = db.billing.setPrimaryMethod(String(body?.method || ""));
    if (!ok) return HttpResponse.json({ message: "Invalid method" }, { status: 400 });
    return HttpResponse.json({ ok: true });
  }),

  http.get(SUBSCRIPTION, async () => {
    await delay(250);
    return HttpResponse.json(db.billing.subscription());
  }),
];