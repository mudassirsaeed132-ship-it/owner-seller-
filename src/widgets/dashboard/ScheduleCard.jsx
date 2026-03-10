import Card from "../../shared/ui/Card";

export default function ScheduleCard({ items = [], className }) {
  return (
    <Card className={`rounded-2xl p-5 ${className || ""}`}>
      <div className="text-xs text-slate-500">Today</div>

      <div className="mt-4 space-y-4">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#D06050]" />
              <div className="min-w-0">
                <div className="truncate text-xs font-medium text-slate-700">{it.label}</div>
              </div>
            </div>

            {it.avatar ? (
              <img className="h-7 w-7 rounded-full object-cover" src={it.avatar} alt="" loading="lazy" />
            ) : null}
          </div>
        ))}
      </div>

      <button type="button" className="mt-6 w-full text-center text-xs font-medium text-[#D06050] hover:underline">
        View Full Schedule <span className="ml-1">›</span>
      </button>
    </Card>
  );
}