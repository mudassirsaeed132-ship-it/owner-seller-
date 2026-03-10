import { CalendarDays, User2 } from "lucide-react";

export default function PropertiesOverviewCard({ items = [] }) {
  return (
    <div className="space-y-4">
      {items.map((x) => (
        <div key={x.id} className="flex items-start gap-4">
          <img
            src={x.image}
            alt=""
            className="h-[56px] w-[70px] rounded-xl object-cover"
            loading="lazy"
          />

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-[#D06050]">{x.title}</div>

            <div className="mt-2 space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CalendarDays size={15} className="text-[#D06050]" />
                <span>{x.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User2 size={15} className="text-[#D06050]" />
                <span>{x.person}</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
            <div className="text-xs text-slate-700">
              <span className="text-slate-900">Black out:</span>{" "}
              <span className="font-semibold text-[#D06050]">{x.blackout}</span>
            </div>
            <div className="text-xs text-slate-500">{x.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
