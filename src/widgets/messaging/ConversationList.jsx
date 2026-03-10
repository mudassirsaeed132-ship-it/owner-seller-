import { cn } from "../../shared/lib/cn";

export default function ConversationList({ tab, onTabChange, items = [], activeId, onSelect }) {
  return (
    <div className="h-full">
      {/* Tabs */}
      <div className="border-b border-slate-200 px-6 pt-5">
        <div className="grid grid-cols-2">
          {[
            { key: "buying", label: "Buying" },
            { key: "renting", label: "Renting" },
          ].map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onTabChange?.(t.key)}
                className={cn(
                  "relative pb-4 text-sm font-semibold",
                  active ? "text-slate-900" : "text-slate-400"
                )}
              >
                {t.label}
                {active ? <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-200">
        {items.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect?.(c.id)}
              className={cn(
                "w-full px-6 py-5 text-left transition",
                isActive ? "bg-[#F6EAE8]" : "bg-white hover:bg-slate-50"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[#D06050]">{c.listingTitle}</div>

                  <div className="mt-4 flex items-center gap-3">
                    <img src={c.otherAvatar} alt="" className="h-7 w-7 rounded-full object-cover" loading="lazy" />
                    <div className="text-sm font-medium text-slate-900">{c.otherName}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 pt-1">
                  {c.unread ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D06050] text-[11px] font-semibold text-white">
                      {c.unread}
                    </div>
                  ) : (
                    <div className="h-5 w-5" />
                  )}
                  <div className="text-xs text-slate-400">{c.timeLabel}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
