export const queryKeys = {
  sellerDashboard: ["sellerDashboard"],
  sellerListings: ["sellerListings"],
  sellerPlans: ["sellerPlans"],
  paymentMethods: ["paymentMethods"],
   messages: {
    list: (tab) => ["messages", "list", tab],
    thread: (id) => ["messages", "thread", id],
  },
  calendar: {
    dashboard: () => ["calendar", "dashboard"],
  },
  leads: {
    list: (type) => ["leads", "list", type],
  },
  profile: {
    me: () => ["profile", "me"],
  },
   billing: {
    invoices: () => ["billing", "invoices"],
    paymentMethods: () => ["billing", "paymentMethods"],
    subscription: () => ["billing", "subscription"],
    receipt: (id) => ["billing", "receipt", id],
    pdf: (id) => ["billing", "pdf", id],
  },
};

