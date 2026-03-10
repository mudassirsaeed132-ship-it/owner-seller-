import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";
import { CalendarDays, Eye, MessageCircle, Clock3, User2 } from "lucide-react";

export default function BookingRequestCard({ item, onAccept, onDecline, isBusy }) {
  const status = item.status; // pending | confirmed | declined

  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-6">
        {/* image */}
        <div className="relative h-37.5 w-full overflow-hidden rounded-2xl sm:h-35 sm:w-47.5 sm:shrink-0">
          <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute bottom-3 left-3">
            <Badge variant="brand" className="rounded-xl px-3 py-1 text-[11px]">
              {item.badge}
            </Badge>
          </div>
        </div>

        {/* content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-[#D06050]">{item.title}</div>

            <div className="mt-2 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#D06050]" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User2 size={16} className="text-[#D06050]" />
                <span>{item.withPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-[#D06050]" />
                <span>{item.viewsChats}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-[#D06050]" />
                <span>{item.timeRange}</span>
              </div>
            </div>
          </div>

          {/* rent pill (right aligned like figma) */}
          <div className="mt-4 flex justify-end sm:mt-0 sm:justify-end">
            <span className="inline-flex h-9 items-center rounded-xl bg-slate-100 px-5 text-xs font-medium text-slate-700">
              {item.type}
            </span>
          </div>
        </div>
      </div>

      {/* footer actions/status */}
      {status === "pending" ? (
        <div className="grid grid-cols-2 border-t border-slate-200">
          <button
            type="button"
            disabled={Boolean(isBusy)}
            onClick={onAccept}
            className="h-13 text-sm font-semibold text-emerald-500 hover:bg-emerald-50 disabled:opacity-60"
          >
            Accept
          </button>
          <button
            type="button"
            disabled={Boolean(isBusy)}
            onClick={onDecline}
            className="h-13 border-l border-slate-200 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-60"
          >
            Decline
          </button>
        </div>
      ) : (
        <div className="border-t border-slate-200">
          <div
            className={[
              "flex h-13 items-center justify-center text-sm font-semibold",
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
