import { http, HttpResponse, delay } from "msw";
import { db } from "../db";

export const sellerHandlers = [
  http.get("/api/seller/dashboard", async () => {
    await delay(250);
    return HttpResponse.json(db.seller.getDashboard());
  }),
];
