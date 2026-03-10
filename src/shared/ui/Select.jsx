// src/shared/ui/Select.jsx
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

export default function Select({
  className,
  selectClassName,
  iconClassName,
  options,
  placeholder,
  children,
  ...props
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        {...props}
        className={cn(
          //  no forced width here — parent wrapper controls width
          "h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-[14px] font-medium text-slate-700 shadow-sm outline-none",
          "focus:border-[#D06050]/50 focus:ring-2 focus:ring-[#D06050]/15",
          selectClassName
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}

        {Array.isArray(options)
          ? options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))
          : children}
      </select>

      <ChevronDown
        size={18}
        className={cn(
          "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400",
          iconClassName
        )}
      />
    </div>
  );
}
