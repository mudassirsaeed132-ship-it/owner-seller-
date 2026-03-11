import { cn } from "../lib/cn";

export default function Input({
  className,
  wrapperClassName,
  inputClassName,
  label,
  startIcon,
  endIcon,
  rightSlot,
  ...props
}) {
  const end = rightSlot ?? endIcon;
  const isInteractiveEnd = Boolean(rightSlot);

  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      {label ? (
        <span className="absolute -top-2 left-4 z-[1] bg-white px-1 text-[12px] text-slate-600">
          {label}
        </span>
      ) : null}

      {startIcon ? (
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
          {startIcon}
        </div>
      ) : null}

      <input
        className={cn(
          "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition",
          "placeholder:text-slate-400 focus:border-[rgba(208,96,80,0.55)] focus:ring-2 focus:ring-[rgba(208,96,80,0.18)]",
          startIcon ? "pl-11" : "",
          end ? "pr-12" : "",
          className,
          inputClassName
        )}
        {...props}
      />

      {end ? (
        <div
          className={cn(
            "absolute inset-y-0 right-4 flex items-center",
            isInteractiveEnd ? "" : "pointer-events-none"
          )}
        >
          <span className="flex items-center justify-center text-[#D06050]">
            {end}
          </span>
        </div>
      ) : null}
    </div>
  );
}