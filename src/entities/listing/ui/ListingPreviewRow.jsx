import Card from "../../../shared/ui/Card";
import Badge from "../../../shared/ui/Badge";
import { MapPin } from "lucide-react";

export default function ListingPreviewRow({ item }) {
  return (
    <Card className="rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
      {/*  important: sm:items-stretch so right pill can sit at bottom like figma */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
        {/* image */}
        <div className="relative h-30 w-full overflow-hidden rounded-2xl sm:h-27.5 sm:w-43.75 sm:shrink-0">
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute bottom-2 left-2">
            <Badge variant="brand" className="rounded-xl px-3 py-1 text-[11px]">
              {item.badge}
            </Badge>
          </div>
        </div>

        {/* content + rent pill */}
        <div className="flex min-w-0 flex-1 items-stretch justify-between gap-4">
          {/* text block */}
          <div className="min-w-0 pt-1">
            <div className="truncate text-sm font-semibold text-[#D06050]">{item.title}</div>

            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <MapPin size={14} className="text-[#D06050]" />
              <span className="truncate">{item.location}</span>
            </div>

            <div className="mt-2 text-xs text-slate-600">{item.price}</div>
            <div className="mt-1 text-xs text-slate-500">{item.meta}</div>

            {/*  Mobile: show pill below text */}
            <div className="mt-3 sm:hidden">
              <span className="inline-flex h-9 items-center rounded-xl bg-slate-100 px-5 text-xs font-medium text-slate-700">
                {item.type}
              </span>
            </div>
          </div>

          {/*  Desktop/Tablet: Rent bottom-right like figma */}
          <div className="hidden sm:flex flex-col justify-end pb-1">
            <span className="inline-flex h-9 items-center rounded-xl bg-slate-100 px-5 text-xs font-medium text-slate-700">
              {item.type}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}