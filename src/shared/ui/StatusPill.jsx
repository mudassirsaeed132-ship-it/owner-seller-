import { cn } from "../lib/cn";

export default function StatusPill({ status, variant, className = "" }) {
  const value = status ?? variant;
  const isVerified = value === "verified";

  return (
    <span
      className={cn(
        "inline-flex h-[30px] items-center justify-center rounded-[10px] px-3 text-[12px] font-medium leading-none",
        isVerified ? "bg-[#F6EAE8] text-[#D06050]" : "border border-[#D06050] bg-white text-[#D06050]",
        className
      )}
    >
      {isVerified ? "Verified" : "Pending"}
    </span>
  );
}
