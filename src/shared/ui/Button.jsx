// PATH: src/shared/ui/Button.jsx
import { forwardRef } from "react";
import { cn } from "../lib/cn";

const styles = {
  base:
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(208,96,80,0.35)]",
  primary: "bg-[#D06050] text-white hover:opacity-95",
  outline: "border border-[#D06050] text-[#D06050] bg-white hover:bg-[rgba(208,96,80,0.06)]",
  soft: "bg-[rgba(208,96,80,0.10)] text-[#D06050] hover:bg-[rgba(208,96,80,0.14)]",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  icon: "h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  xl: "h-14 px-6 text-base",
};

const Button = forwardRef(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref
) {
  const isIcon = variant === "icon";
  return (
    <button
      ref={ref}
      type={type}
      className={cn(styles.base, styles[variant], isIcon ? "" : sizes[size], className)}
      {...props}
    />
  );
});

export default Button;