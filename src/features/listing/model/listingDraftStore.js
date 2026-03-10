import { create } from "zustand";

const initial = {
  title: "",
  listingType: "rent", // rent | sell | short-stay
  category: "house",
  photos: [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=60",
  ],
  locationLabel: "Jl. Cisangkuy, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115",
  sellPrice: "180,000",
  rentPrice: "3000/Month",
  rentPeriod: "monthly", // monthly | per-night
  size: "1250 sq feet",
  rooms: 3,
  bathrooms: 3,
  availableFrom: "",
  description:
    "Welcome to your dream home! This elegant two-story residence offers timeless architecture and modern comfort, nestled in a serene neighborhood surrounded by mature trees and lush greenery",
  planId: "free",
  billingPeriod: "monthly",
};

export const useListingDraftStore = create((set) => ({
  draft: initial,

  setField: (key, value) =>
    set((s) => ({ draft: { ...s.draft, [key]: value } })),

  addPhoto: (url) =>
    set((s) => ({ draft: { ...s.draft, photos: [...s.draft.photos, url] } })),

  removePhoto: (idx) =>
    set((s) => ({
      draft: { ...s.draft, photos: s.draft.photos.filter((_, i) => i !== idx) },
    })),

  reset: () => set({ draft: initial }),
}));
