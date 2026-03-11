import { cn } from "../lib/cn";

const BRAND = "#D06050";

export default function CounterInput({
  label,
  value = 0,
  onChange,
  className,
  min = 0,
}) {
  const currentValue = Number(value || 0);

  const dec = () => onChange?.(Math.max(min, currentValue - 1));
  const inc = () => onChange?.(currentValue + 1);

  return (
    <div
      className={cn(
        "flex min-h-[64px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:px-5",
        className
      )}
    >
      <div className="min-w-0 text-[15px] font-medium text-slate-700">
        {label}
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={dec}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-lg font-semibold text-white transition hover:brightness-95"
          style={{ backgroundColor: BRAND }}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>

        <div className="min-w-[20px] text-center text-[18px] font-semibold text-slate-900">
          {currentValue}
        </div>

        <button
          type="button"
          onClick={inc}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-lg font-semibold text-white transition hover:brightness-95"
          style={{ backgroundColor: BRAND }}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}