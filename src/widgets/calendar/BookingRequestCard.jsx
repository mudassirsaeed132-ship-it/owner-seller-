import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";
import { CalendarDays, Clock3 } from "lucide-react";

function EyeFilledIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 5C6.7 5 2.6 8.3 1 12c1.6 3.7 5.7 7 11 7s9.4-3.3 11-7c-1.6-3.7-5.7-7-11-7Z"
        fill="#D06050"
      />
      <circle cx="12" cy="12" r="3.2" fill="white" />
      <circle cx="12" cy="12" r="1.6" fill="#D06050" />
    </svg>
  );
}

export default function BookingRequestCard({ item, onAccept, onDecline, isBusy }) {
  const status = item.status;

  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-start lg:gap-6">
        <div className="relative h-[180px] w-full overflow-hidden rounded-2xl sm:h-[210px] lg:h-[140px] lg:w-[190px] lg:shrink-0">
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute bottom-3 left-3">
            <Badge variant="brand" className="rounded-xl px-3 py-1 text-[11px]">
              {item.badge}
            </Badge>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:min-h-[140px] lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="text-[14px] font-semibold leading-5 text-[#D06050] sm:text-[15px]">
              {item.title}
            </div>

            <div className="mt-2 space-y-2 text-[12px] text-slate-600 sm:text-[13px]">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="shrink-0 text-[#D06050]" />
                <span>{item.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <EyeFilledIcon className="h-4 w-4 shrink-0" />
                <span>{item.withPerson}</span>
              </div>

              <div className="text-[12px] text-slate-600 sm:text-[13px]">{item.viewsChats}</div>

              <div className="flex items-center gap-2">
                <Clock3 size={16} className="shrink-0 text-[#D06050]" />
                <span>{item.timeRange}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end lg:mt-auto">
            <span className="inline-flex h-9 items-center rounded-xl bg-slate-100 px-5 text-[12px] font-medium text-slate-700">
              {item.type}
            </span>
          </div>
        </div>
      </div>

      {status === "pending" ? (
        <div className="grid grid-cols-2 border-t border-slate-200">
          <button
            type="button"
            disabled={Boolean(isBusy)}
            onClick={onAccept}
            className="h-12 text-[14px] font-semibold text-emerald-500 transition hover:bg-emerald-50 disabled:opacity-60 sm:h-13"
          >
            Accept
          </button>
          <button
            type="button"
            disabled={Boolean(isBusy)}
            onClick={onDecline}
            className="h-12 border-l border-slate-200 text-[14px] font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60 sm:h-13"
          >
            Decline
          </button>
        </div>
      ) : (
        <div className="border-t border-slate-200">
          <div
            className={[
              "flex h-12 items-center justify-center text-[14px] font-semibold sm:h-13",
              status === "confirmed" ? "text-emerald-500" : "text-red-500",
            ].join(" ")}
          >
            {status === "confirmed" ? "Confirmed" : "Declined"}
          </div>
        </div>
      )}
    </Card>
  );
}