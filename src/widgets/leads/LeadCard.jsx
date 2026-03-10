import Card from "../../shared/ui/Card";
import Badge from "../../shared/ui/Badge";
import { CalendarDays, FileText, MessageCircle } from "lucide-react";


function StatusPill({ status }) {
  if (status === "pending") {
    return <span className="rounded-lg bg-[#FFF3C7] px-3 py-1 text-xs font-medium text-[#9A6A00]">Pending</span>;
  }
  if (status === "approved") {
    return <span className="rounded-lg bg-[#E9F1FF] px-3 py-1 text-xs font-medium text-[#2B6EEB]">Approved</span>;
  }
  if (status === "paid") {
    return <span className="rounded-lg bg-[#D9FBE6] px-3 py-1 text-xs font-medium text-[#1E8E52]">Paid</span>;
  }
  return null;
}

function DocChip({ label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
      <FileText size={14} className="text-slate-500" />
      {label}
    </span>
  );
}

export default function LeadCard({ item, onAccept, onDecline, onViewBookings, onSchedule }) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* top */}
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
        {/* left info */}
        <div className="min-w-0">
          <div className="text-base font-semibold text-slate-900">{item.userName}</div>
          <div className="mt-2 text-sm text-slate-400">{item.propertyName}</div>
          <div className="mt-3 text-sm text-slate-700">
            Booking for <span className="text-[#D06050]">{item.bookingFor?.replace("Booking for ", "")}</span>
          </div>

          <div className="mt-7 text-sm font-semibold text-slate-900">Documents</div>
          <div className="mt-3 flex flex-wrap gap-3">
            {(item.docs || []).map((d) => (
              <DocChip key={d} label={d} />
            ))}
            {/* small extra icon chip */}
            <span className="inline-flex h-7 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white">
              <FileText size={14} className="text-slate-500" />
            </span>
          </div>
        </div>

        {/* right */}
        <div className="flex shrink-0 flex-col items-end gap-3">
          <div className="flex items-center gap-3">
            {item.showChatIcon ? (
  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6EAE8]">
    <MessageCircle size={18} className="text-[#D06050]" />
  </span>
) : null}
            <StatusPill status={item.status} />
          </div>

          <div className="text-base font-semibold text-slate-900">{item.price}</div>

          {item.showViewBookings ? (
            <button type="button" onClick={onViewBookings} className="text-sm text-[#D06050] hover:underline">
              View bookings
            </button>
          ) : null}
        </div>
      </div>

      {/* footer */}
      {item.type === "rentals" && item.status === "pending" ? (
        <div className="grid grid-cols-2 border-t border-slate-200">
          <button
            type="button"
            onClick={onAccept}
            className="h-14 text-sm font-semibold text-emerald-500 hover:bg-emerald-50"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="h-14 border-l border-slate-200 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            Decline
          </button>
        </div>
      ) : item.type === "buyers" && item.status === "schedule" ? (
        <button
          type="button"
          onClick={onSchedule}
          className="flex h-14 w-full items-center justify-center gap-2 border-t border-slate-200 text-sm font-semibold text-[#D06050] hover:bg-[#F6EAE8]"
        >
          <CalendarDays size={18} />
          Schedule Viewing
        </button>
      ) : item.type === "buyers" && item.status === "confirmed" ? (
        <div className="border-t border-slate-200 px-6 py-4 text-sm font-semibold text-emerald-500">
          {item.footerLabel}
        </div>
      ) : null}
    </Card>
  );
}
