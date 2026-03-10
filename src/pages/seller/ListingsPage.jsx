import { useState } from "react";
import ListingCard from "../../entities/listing/ui/ListingCard";

export default function ListingsPage() {
  const BEDROOM_IMAGE = "/images/properties/bedroom.png";

  const [items, setItems] = useState(() => [
    {
      id: "l1",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image: BEDROOM_IMAGE,
    },
    {
      id: "l2",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image: BEDROOM_IMAGE,
    },
    {
      id: "l3",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image: BEDROOM_IMAGE,
    },
    {
      id: "l4",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image: BEDROOM_IMAGE,
    },
    {
      id: "l5",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image: BEDROOM_IMAGE,
    },
    {
      id: "l6",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image: BEDROOM_IMAGE,
    },
  ]);

  const onDelete = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="text-4xl font-semibold text-[#D06050]">Listings</h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((it) => (
            <ListingCard key={it.id} item={it} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}