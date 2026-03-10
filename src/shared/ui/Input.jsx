// PATH: src/shared/ui/Input.jsx
import { cn } from "../lib/cn";

/**
 * Backward compatible:
 * - startIcon / endIcon works as before
 * Added for Auth pixel UI:
 * - label (top small label)
 * - rightSlot (alias of endIcon, supports button icons)
 * - inputClassName / wrapperClassName
 */
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

  return (
    <div className={cn("relative", wrapperClassName, className)}>
      {label ? (
        <span className="absolute -top-2 left-4 bg-white px-1 text-[12px] text-slate-600">
          {label}
        </span>
      ) : null}

      {startIcon ? (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {startIcon}
        </div>
      ) : null}

      <input
        className={cn(
          "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition",
          "placeholder:text-slate-400 focus:border-[rgba(208,96,80,0.55)] focus:ring-2 focus:ring-[rgba(208,96,80,0.18)]",
          startIcon ? "pl-11" : "",
          end ? "pr-11" : "",
          inputClassName
        )}
        {...props}
      />

      {end ? (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D06050]">
          {end}
        </div>
      ) : null}
    </div>
  );
}