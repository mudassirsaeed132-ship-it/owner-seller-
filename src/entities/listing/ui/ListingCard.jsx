import Card from "../../../shared/ui/Card";
import Badge from "../../../shared/ui/Badge";
import { MoreVertical, Trash2 } from "lucide-react";

const BRAND = "#D06050";
const LEADS_ICON = "/images/icons/leads-1.svg";

function EyeFilledIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 5C6.7 5 2.6 8.3 1 12c1.6 3.7 5.7 7 11 7s9.4-3.3 11-7c-1.6-3.7-5.7-7-11-7Z"
        fill={BRAND}
      />
      <circle cx="12" cy="12" r="3.2" fill="white" />
      <circle cx="12" cy="12" r="1.6" fill={BRAND} />
    </svg>
  );
}

function ClockFilledIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill={BRAND} />
      <path
        d="M12 7.4v4.9l3.2 1.9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ListingCard({ item, onDelete }) {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="h-[180px] w-full object-cover sm:h-[200px] lg:h-[210px]"
          loading="lazy"
          draggable={false}
        />

        <button
          type="button"
          onClick={() => onDelete?.(item.id)}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm sm:right-4 sm:top-4"
          aria-label="Delete"
        >
          <Trash2 size={18} style={{ color: BRAND }} />
        </button>

        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
          <Badge
            variant="brand"
            className="rounded-[14px] px-4 py-1.5 text-xs font-medium sm:px-5 sm:py-2"
          >
            {item.type}
          </Badge>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 text-[18px] font-semibold leading-tight text-slate-900 sm:text-[19px] lg:text-[20px]">
            {item.title}
          </h3>

          <button
            type="button"
            className="shrink-0 rounded-md p-1 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            aria-label="More"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-[12px] text-slate-500 sm:text-[13px]">
          <div className="flex min-w-0 items-center gap-2">
            <EyeFilledIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">Views:{item.views}</span>
          </div>

          <div className="flex min-w-0 items-center justify-end gap-2">
            <img
              src={LEADS_ICON}
              alt=""
              className="h-4 w-4 shrink-0 object-contain"
              loading="lazy"
              draggable={false}
            />
            <span className="truncate">leads:{item.leads}</span>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <ClockFilledIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.date}</span>
          </div>

          <div
            className="flex items-center justify-end text-[12px] font-semibold sm:text-[12px]"
            style={{ color: BRAND }}
          >
            ${item.price}
          </div>
        </div>
      </div>
    </Card>
  );
}