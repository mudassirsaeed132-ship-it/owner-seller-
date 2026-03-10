// PATH: src/shared/ui/Textarea.jsx
import { cn } from "../lib/cn";

export default function Textarea({ className, label, wrapperClassName, ...props }) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      {label ? (
        <span className="absolute -top-2 left-4 bg-white px-1 text-[12px] text-slate-600">
          {label}
        </span>
      ) : null}

      <textarea
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition",
          "placeholder:text-slate-400 focus:border-[rgba(208,96,80,0.55)] focus:ring-2 focus:ring-[rgba(208,96,80,0.18)]",
          className
        )}
        {...props}
      />
    </div>
  );
}