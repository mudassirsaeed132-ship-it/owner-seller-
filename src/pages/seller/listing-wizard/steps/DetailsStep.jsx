import Card from "../../../../shared/ui/Card";
import Input from "../../../../shared/ui/Input";
import ChipGroup from "../../../../shared/ui/ChipGroup";
import Button from "../../../../shared/ui/Button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BRAND = "#D06050";

export default function DetailsStep() {
  const nav = useNavigate();

  return (
    <Card className="rounded-2xl border border-slate-100 bg-white p-8">
      <div className="text-sm font-semibold text-slate-800">
        Hi Jane, Fill in the detail of your <span className={`text-[${BRAND}]`}>real estate</span>
      </div>

      <div className="mt-4">
        <Input placeholder="Name your advertisement" endIcon={<Home size={18} />} />
      </div>

      <div className="mt-7 text-sm font-semibold text-slate-800">Listing Type</div>
      <div className="mt-4">
        <ChipGroup
          value="rent"
          onChange={() => {}}
          options={[
            { value: "rent", label: "Rent" },
            { value: "sell", label: "Sell" },
            { value: "short", label: "Short- Stay" },
          ]}
        />
      </div>

      <div className="mt-7 text-sm font-semibold text-slate-800">Property Category</div>
      <div className="mt-4">
        <ChipGroup
          value="house"
          onChange={() => {}}
          options={[
            { value: "house", label: "House" },
            { value: "apartment", label: "Apartment" },
            { value: "hotel", label: "Hotel" },
            { value: "commercial", label: "Commercial" },
            { value: "cottage", label: "Cottage" },
            { value: "studio", label: "Studio" },
            { value: "land", label: "Land" },
            { value: "short", label: "Short-Stay" },
            { value: "villa", label: "Villa" },
          ]}
        />
      </div>

      <div className="mt-7 text-sm font-semibold text-slate-800">Add Photos to your listing</div>

      <div className="mt-4 flex flex-wrap gap-4">
        {[
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=70",
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=400&q=70",
          "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=400&q=70",
        ].map((src, i) => (
          <div key={i} className="relative h-[120px] w-[160px] overflow-hidden rounded-2xl">
            <img src={src} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              className={`absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[${BRAND}] text-white`}
              aria-label="Remove"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          className="flex h-[120px] w-[120px] items-center justify-center rounded-2xl bg-slate-100 text-3xl text-slate-600"
        >
          +
        </button>
      </div>

      <Button className="mt-8 h-14 w-full rounded-2xl" onClick={() => nav("/seller/listings/new/location")}>
        Next
      </Button>
    </Card>
  );
}