import { cn } from "../lib/cn";

const BRAND = "#D06050";

export default function Stepper({ steps = [], activeIndex = 0, className }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-[#D06050]"
          style={{ width: `${(activeIndex / Math.max(steps.length - 1, 1)) * 100}%` }}
        />

        <div className="relative flex items-start justify-between">
          {steps.map((s, idx) => {
            const done = idx < activeIndex;
            const active = idx === activeIndex;
            return (
              <div key={s.key || s.label} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold",
                    active || done ? `border-[${BRAND}] bg-[${BRAND}] text-white` : "border-slate-200 bg-white text-slate-500"
                  )}
                >
                  {idx + 1}
                </div>
                <div className={cn("text-xs font-medium", active ? "text-slate-900" : "text-slate-500")}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}