import { useMemo, useState } from "react";
import ListingCard from "../../entities/listing/ui/ListingCard";

const BRAND = "#D06050";

export default function ListingsPage() {
  const [items, setItems] = useState(() => [
    {
      id: "l1",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70",
    },
    {
      id: "l2",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=70",
    },
    {
      id: "l3",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=70",
    },
    {
      id: "l4",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image:
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=70",
    },
    {
      id: "l5",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=70",
    },
    {
      id: "l6",
      title: "Modern Luxury Apartment",
      type: "Rent",
      views: 400,
      leads: 12,
      date: "17 August,2024",
      price: "5000",
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=70",
    },
  ]);

  const onDelete = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <h1 className={`text-4xl font-semibold text-[${BRAND}]`}>Listings</h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((it) => (
            <ListingCard key={it.id} item={it} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}