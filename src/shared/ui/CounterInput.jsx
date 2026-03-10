import Button from "./Button";
import { cn } from "../lib/cn";

const BRAND = "#D06050";

export default function CounterInput({ label, value = 0, onChange, className }) {
  const dec = () => onChange?.(Math.max(0, Number(value || 0) - 1));
  const inc = () => onChange?.(Number(value || 0) + 1);

  return (
    <div className={cn("flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4", className)}>
      <div className="text-sm text-slate-600">{label}</div>
      <div className="flex items-center gap-3">
        <Button variant="soft" className={`h-9 w-9 rounded-xl p-0 text-[${BRAND}]`} onClick={dec}>
          –
        </Button>
        <div className="w-6 text-center text-sm font-semibold text-slate-800">{value}</div>
        <Button variant="soft" className={`h-9 w-9 rounded-xl p-0 text-[${BRAND}]`} onClick={inc}>
          +
        </Button>
      </div>
    </div>
  );
}