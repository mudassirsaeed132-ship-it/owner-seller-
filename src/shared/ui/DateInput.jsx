import { CalendarDays } from "lucide-react";
import { cn } from "../lib/cn";

const BRAND = "#D06050";

export default function DateInput({
  placeholder = "Available from",
  value = "",
  onChange,
  className,
  ...props
}) {
  return (
    <div className={cn("relative", className)}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-16 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
        {...props}
      />

      <CalendarDays
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        style={{ color: BRAND }}
      />
    </div>
  );
}