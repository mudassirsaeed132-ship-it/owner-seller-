import Card from "../../../shared/ui/Card";
import Badge from "../../../shared/ui/Badge";
import { CalendarDays, Eye, MoreVertical, Trash2, Users2 } from "lucide-react";

const BRAND = "#D06050";

export default function ListingCard({ item, onDelete }) {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="relative">
        <img src={item.image} alt={item.title} className="h-47.5 w-full object-cover" loading="lazy" />

        <button
          type="button"
          onClick={() => onDelete?.(item.id)}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow"
          aria-label="Delete"
        >
          <Trash2 size={18} className={`text-[${BRAND}]`} />
        </button>

        <div className="absolute bottom-4 right-4">
          <Badge variant="brand" className="rounded-xl px-4 py-1.5 text-xs">
            {item.type}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="text-lg font-semibold text-slate-900">{item.title}</div>
          <button type="button" className="text-slate-400 hover:text-slate-600" aria-label="More">
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Eye size={16} className={`text-[${BRAND}]`} />
            <span>Views:{item.views}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Users2 size={16} className={`text-[${BRAND}]`} />
            <span>leads:{item.leads}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} className={`text-[${BRAND}]`} />
            <span>{item.date}</span>
          </div>
          <div className={`flex items-center justify-end font-semibold text-[${BRAND}]`}>${item.price}</div>
        </div>
      </div>
    </Card>
  );
}