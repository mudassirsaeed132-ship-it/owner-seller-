import { cn } from "../lib/cn";

export default function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(208,96,80,0.55)]",
        className
      )}
      {...props}
    />
  );
}
