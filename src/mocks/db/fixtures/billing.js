export const BILLING_FIXTURE = {
  invoices: Array.from({ length: 9 }).map((_, i) => ({
    id: `inv_${i + 1}`,
    property: "Marina Bay Apartment",
    tenant: "John Jones",
    paidLabel: "Paid: Jan 20,2025",
    statusPill: "Rented",
    amount: 2800,
  })),

  paymentMethods: {
    primary: "gpay",
    options: [
      { id: "gpay", label: "G Pay" },
      { id: "stripe", label: "stripe" },
      { id: "applepay", label: "Pay" },
    ],
  },

  subscription: {
    planName: "PRO",
    priceLabel: "$2.99/mo",
    headerLeft: "PLAYER & FAN +",
    includesLabel: "Includes everything in FREE, plus:",
    features: [
      "AI Chatbot Access",
      "Tournament & Tryout Tracker",
      "Event Reminders & Notifications",
      "Calendar Invites",
      "Advanced Filters & Search",
    ],
    paymentMethod: {
      brand: "Visa",
      last4: "4242",
      expires: "12/2027",
    },
  },
};