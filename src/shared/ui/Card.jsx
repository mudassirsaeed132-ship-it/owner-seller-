import { cn } from "../lib/cn";

export default function Card({ className, ...props }) {
  return (
    <div
      className={cn("rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]", className)}
      {...props}
    />
  );
}