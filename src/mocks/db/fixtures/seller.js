export const SELLER_FIXTURE = {
  dashboard: {
    quickActions: [
      { id: "qa_add", label: "Add Listings", asset: "qa-add-listings.png" },
      { id: "qa_booking", label: "Booking Applications", asset: "qa-booking-applications.png" },
      { id: "qa_tenant", label: "Tenant Applications", asset: "qa-tenant-applications.png" },
    ],

    recommended: [
      {
        id: "r1",
        title: "Sky Dandelions Apartment",
        address: "Jakarta, Indonesia",
        tag: "Apartment",
        status: "Rent",
        priceText: "Rs 450,000",
        metaText: "32 Views . 2 chats",
        thumb:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=60",
      },
      {
        id: "r2",
        title: "Sky Dandelions Apartment",
        address: "Jakarta, Indonesia",
        tag: "Apartment",
        status: "Rent",
        priceText: "Rs 450,000",
        metaText: "32 Views . 2 chats",
        thumb:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=60",
      },
    ],

    schedule: {
      title: "Upcoming Schedule",
      dayLabel: "Today",
      items: [
        { id: "s1", time: "2:00 PM", label: "Viewing: Loft Studio Tour", avatar: true },
        { id: "s2", time: "", label: "Confirm Lease Agreement with Anna", avatar: true },
        { id: "s3", time: "4:00 PM", label: "Bank Transfer to Angelo", avatar: true },
      ],
    },

    transactions: [
      { id: "t1", title: "Sky Dandelions Apartment", user: "Jordan Smith", meta: "Apr 10 - Google pay", amount: "$600,000", status: "Paid" },
      { id: "t2", title: "Sky Dandelions Apartment", user: "Jordan Smith", meta: "Apr 10 - Google pay", amount: "$600,000", status: "Pending" },
      { id: "t3", title: "Sky Dandelions Apartment", user: "Jordan Smith", meta: "Apr 10 - Google pay", amount: "$600,000", status: "Paid" },
    ],
  },
};