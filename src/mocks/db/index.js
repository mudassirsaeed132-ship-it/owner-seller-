// src/mocks/db/index.js
import { SELLER_FIXTURE } from "./fixtures/seller";
import { LISTINGS_FIXTURE } from "./fixtures/listings";
import { BILLING_FIXTURE } from "./fixtures/billing";
import { MESSAGES_FIXTURE } from "./fixtures/messages";
import { CALENDAR_FIXTURE } from "./fixtures/calendar";
import { LEADS_FIXTURE } from "./fixtures/leads";
import { PROFILE_FIXTURE } from "./fixtures/profile";
import { PRIVACY_FIXTURE } from "./fixtures/privacy";

const state = {
  seller: structuredClone(SELLER_FIXTURE),
  listings: structuredClone(LISTINGS_FIXTURE),
  billing: structuredClone(BILLING_FIXTURE),

  // ✅ messages is array
  messages: structuredClone(MESSAGES_FIXTURE),

  // ✅ calendar fixture object
  calendar: structuredClone(CALENDAR_FIXTURE),

  // ✅ leads is array
  leads: structuredClone(LEADS_FIXTURE),

  // ✅ profile fixture object
  profile: structuredClone(PROFILE_FIXTURE),

  // ✅ privacy fixture object
  privacy: structuredClone(PRIVACY_FIXTURE),
};

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

// tiny safe deep merge for nested settings objects
function deepMerge(base, patch) {
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) return patch ?? base;
  const out = { ...(base || {}) };
  for (const k of Object.keys(patch)) {
    const bv = base?.[k];
    const pv = patch[k];
    out[k] =
      pv && typeof pv === "object" && !Array.isArray(pv)
        ? deepMerge(bv || {}, pv)
        : pv;
  }
  return out;
}

export const db = {
  seller: {
    getDashboard: () => state.seller.dashboard,
  },

  listings: {
    all: () => state.listings,
    remove: (id) => {
      const before = state.listings.length;
      state.listings = state.listings.filter((x) => x.id !== id);
      return state.listings.length !== before;
    },
    create: (payload) => {
      const id = `l_${Math.random().toString(16).slice(2)}`;
      const item = {
        id,
        title: payload?.title || "New Listing",
        status: payload?.status || "Rent",
        views: 0,
        leads: 0,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
        price: payload?.price || 0,
        image: payload?.image || state.listings?.[0]?.image,
      };
      state.listings = [item, ...state.listings];
      return item;
    },
  },

  // ✅ messaging API-ready DB
  messages: {
    list: (tab = "buying") =>
      state.messages
        .filter((c) => c.tab === tab)
        .map((c) => ({
          id: c.id,
          listingTitle: c.listingTitle,
          otherName: c.otherName,
          otherAvatar: c.otherAvatar,
          unread: c.unread,
          timeLabel: c.timeLabel,
        })),

    get: (id) => state.messages.find((c) => c.id === id) || null,

    markRead: (id) => {
      const conv = state.messages.find((c) => c.id === id);
      if (!conv) return null;
      conv.unread = 0;
      return conv;
    },

    send: (id, text) => {
      const conv = state.messages.find((c) => c.id === id);
      if (!conv) return null;

      const msg = { id: uid("m"), from: "me", kind: "text", text, ts: Date.now() };
      conv.messages = conv.messages || [];
      conv.messages.push(msg);

      conv.unread = 0;
      conv.timeLabel = "now";
      return msg;
    },
  },

  // ✅ calendar MUST be TOP-LEVEL
  calendar: {
    dashboard: () => ({
      upcoming: state.calendar.upcoming,
      overview: state.calendar.overview,
      properties: state.calendar.properties,
      settings: state.calendar.settings,
    }),

    updateBooking: (id, status) => {
      const item = state.calendar.upcoming.find((x) => x.id === id);
      if (!item) return false;

      const next = String(status || "").toLowerCase();
      if (!["confirmed", "declined", "pending"].includes(next)) return false;

      item.status = next;
      return true;
    },

    saveSettings: (payload) => {
      state.calendar.settings = deepMerge(state.calendar.settings || {}, payload || {});
      return true;
    },
  },

  leads: {
    list: (type = "rentals") => state.leads.filter((x) => x.type === type),

    updateStatus: (id, status) => {
      const item = state.leads.find((x) => x.id === id);
      if (!item) return false;
      item.status = status;
      return true;
    },

    submitBooking: (id, dateLabel) => {
      const item = state.leads.find((x) => x.id === id);
      if (!item) return false;
      item.status = "confirmed";
      item.footerLabel = `Viewing Confirmed: ${dateLabel}`;
      return true;
    },
  },

  profile: {
    get: () => state.profile,

    update: (payload) => {
      state.profile.profile = deepMerge(state.profile.profile || {}, payload || {});
      return true;
    },

    updateSettings: (payload) => {
      state.profile.profile = state.profile.profile || {};
      state.profile.profile.settings = deepMerge(state.profile.profile.settings || {}, payload || {});
      return true;
    },
  },

  // ✅ billing (single, merged module — removes duplicate billing blocks)
  billing: {
    plans: () => state.billing.plans,

    invoices: () => state.billing.invoices,

    receipt: (id) => {
      const inv = state.billing.invoices.find((x) => x.id === id);
      if (!inv) return null;

      return {
        id: inv.id,
        title: inv.property,
        tenant: inv.tenant,
        paidLabel: inv.paidLabel,
        amount: inv.amount,
        statusPill: inv.statusPill,
        lines: [
          { label: "Rent", value: `$${inv.amount}` },
          { label: "Service Fee", value: "$0" },
        ],
        total: `$${inv.amount}`,
      };
    },

    pdf: (id) => {
      const inv = state.billing.invoices.find((x) => x.id === id);
      if (!inv) return null;
      return {
        id: inv.id,
        fileName: `${inv.property.replace(/\s+/g, "_")}_${inv.id}.pdf`,
        url: "#",
      };
    },

    paymentMethods: () => state.billing.paymentMethods,

    setPrimaryMethod: (method) => {
      const options = state.billing.paymentMethods?.options || [];
      const allowed = options.some((x) => x.id === method);
      if (!allowed) return false;
      state.billing.paymentMethods.primary = method;
      return true;
    },

    subscription: () => state.billing.subscription,
  },

  // ✅ privacy
  privacy: {
    get: () => state.privacy,
    update: (patch) => {
      state.privacy = deepMerge(state.privacy || {}, patch || {});
      return state.privacy;
    },
  },
};