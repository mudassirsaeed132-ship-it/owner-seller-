import { cn } from "../lib/cn";

const BRAND = "#D06050";

export default function ChipGroup({ value, onChange, options = [], className, multiple = false }) {
  function toggle(val) {
    if (!multiple) return onChange?.(val);
    const set = new Set(Array.isArray(value) ? value : []);
    if (set.has(val)) set.delete(val);
    else set.add(val);
    onChange?.([...set]);
  }

  const selected = multiple ? new Set(value || []) : null;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {options.map((o) => {
        const isActive = multiple ? selected?.has(o.value) : value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            className={cn(
              "h-11 rounded-2xl px-5 text-sm font-medium transition",
              isActive ? `bg-[${BRAND}] text-white` : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}