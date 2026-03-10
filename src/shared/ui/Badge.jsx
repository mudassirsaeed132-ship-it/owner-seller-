import { cn } from "../lib/cn";

export default function Badge({ className, variant = "brand", ...props }) {
  const variants = {
    brand: "bg-[#D06050] text-white",
    soft: "bg-[rgba(208,96,80,0.12)] text-[#D06050]",
    gray: "bg-slate-100 text-slate-600",
    outline: "border border-[#D06050] text-[#D06050] bg-white",
  };

  return (
    <span
      className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", variants[variant], className)}
      {...props}
    />
  );
}