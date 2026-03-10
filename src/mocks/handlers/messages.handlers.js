import { http, HttpResponse, delay } from "msw";
import { db } from "../db";

const dbMessages = db.messages;

const LIST = /\/api\/seller\/messages$/;
const THREAD = /\/api\/seller\/messages\/([^/]+)$/;

export const messagesHandlers = [
  // list
  http.get(LIST, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const tab = url.searchParams.get("tab") || "buying";
    return HttpResponse.json({ tab, items: dbMessages.list(tab) });
  }),

  // thread
  http.get(THREAD, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const conv = dbMessages.get(id);

    if (!conv) return HttpResponse.json({ message: "Conversation not found" }, { status: 404 });

    dbMessages.markRead(id);

    return HttpResponse.json({
      id: conv.id,
      headerName: conv.headerName,
      headerAvatar: conv.headerAvatar,
      threadTitle: conv.threadTitle,
      messages: conv.messages,
    });
  }),

  // send message
  http.post(THREAD, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json().catch(() => ({}));

    const text = String(body?.text || "").trim();
    if (!text) return HttpResponse.json({ message: "Message text is required" }, { status: 400 });

    const msg = dbMessages.send(id, text);
    if (!msg) return HttpResponse.json({ message: "Conversation not found" }, { status: 404 });

    return HttpResponse.json({ message: msg });
  }),
];
