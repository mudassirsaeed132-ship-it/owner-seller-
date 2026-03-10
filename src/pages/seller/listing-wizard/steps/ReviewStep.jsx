import Card from "../../../../shared/ui/Card";
import Button from "../../../../shared/ui/Button";
import DateInput from "../../../../shared/ui/DateInput";
import ListingPreviewRow from "../../../../entities/listing/ui/ListingPreviewRow";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReviewStep() {
  const nav = useNavigate();

  const item = {
    title: "Sky Dandelions Apartment",
    location: "Jakarta, Indonesia",
    price: "Rs 450,000",
    meta: "32 Views . 2 chats",
    type: "Rent",
    badge: "Apartment",
    image: "/images/properties/p-1.png",
  };

  return (
    <div>
      <h2 className="mb-5 text-left text-4xl font-semibold text-[#D06050]">
        Advertisement Review
      </h2>

      <ListingPreviewRow item={item} />

      <Card className="mt-5 rounded-2xl p-8">
        <div className="text-sm font-semibold text-slate-900">Period</div>

        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <DateInput placeholder="From" />
          <DateInput placeholder="To" />
        </div>

        <div className="mt-6 text-sm font-semibold text-slate-600">
          Choose a Plan for posting this ad
        </div>

        <div className="mt-3 space-y-3">
          {["Subscription", "Featured Advertisement"].map((x) => (
            <button
              key={x}
              type="button"
              className="flex h-14 w-full items-center justify-between rounded-2xl bg-slate-100 px-5 text-sm text-slate-700 hover:bg-slate-200"
            >
              <span>{x}</span>
              <ChevronRight className="text-slate-400" />
            </button>
          ))}
        </div>

        <Button
          className="mt-8 h-14 w-full rounded-2xl"
          onClick={() => nav("/seller/listings/new/plan")}
        >
          Next
        </Button>
      </Card>
    </div>
  );
}