import { cn } from "../lib/cn";

const BRAND = "#D06050";

export default function Tabs({ value, onChange, items = [], className }) {
  return (
    <div className={cn("inline-flex rounded-2xl border border-slate-200 bg-white p-1", className)}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            onClick={() => onChange?.(it.value)}
            className={cn(
              "h-10 min-w-[110px] rounded-xl px-4 text-sm font-medium transition",
              active ? `bg-[${BRAND}] text-white` : "text-slate-600 hover:bg-slate-50"
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}