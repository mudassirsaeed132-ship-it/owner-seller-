export const LEADS_FIXTURE = [
  // ✅ Rentals tab
  {
    id: "l1",
    type: "rentals",
    userName: "Sarah Johnson",
    propertyName: "Marina Bay Luxury Apartment",
    bookingFor: "Booking for Jan 4, 2025",
    price: "$3600/ month",
    status: "pending", // pending | approved
    showViewBookings: true,
    docs: ["ID", "Proof of Income"],
  },
  {
    id: "l2",
    type: "rentals",
    userName: "Sarah Johnson",
    propertyName: "Marina Bay Luxury Apartment",
    bookingFor: "Booking for Jan 4, 2025",
    price: "$3600/ month",
    status: "approved",
    showViewBookings: true,
    docs: ["ID", "Proof of Income"],
  },

  // ✅ Buyers tab
  {
    id: "b1",
    type: "buyers",
    userName: "Sarah Johnson",
    propertyName: "Marina Bay Luxury Apartment",
    bookingFor: "Booking for Jan 4, 2025",
    price: "$3600/ month",
    status: "schedule", // schedule | confirmed
    showChatIcon: true,
    docs: ["ID", "Proof of Income"],
    footerLabel: "Schedule Viewing",
  },
  {
    id: "b2",
    type: "buyers",
    userName: "Sarah Johnson",
    propertyName: "Marina Bay Luxury Apartment",
    bookingFor: "Booking for Jan 4, 2025",
    price: "$3600/ month",
    status: "confirmed",
    showChatIcon: true,
    docs: ["ID", "Proof of Income"],
    footerLabel: "Viewing Confirmed: Jan 7,2026 - 2PM",
  },

  // ✅ Short bookings tab (popup shown by view bookings)
  {
    id: "s1",
    type: "short-bookings",
    userName: "Sarah Johnson",
    propertyName: "Marina Bay Luxury Apartment",
    bookingFor: "Booking for Jan 4, 2025",
    price: "$360",
    status: "paid",
    showViewBookings: true,
    docs: ["ID", "Proof of Income"],
  },
];
