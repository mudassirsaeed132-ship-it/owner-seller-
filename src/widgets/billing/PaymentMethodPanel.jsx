// src/widgets/billing/PaymentMethodPanel.jsx
import { ChevronUp } from "lucide-react";
import { AppleFilled, GoogleG } from "../../shared/ui/BrandMarks";

function Panel({ title, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-7 py-5">
        <div className="text-[18px] font-medium text-slate-900">{title}</div>
        <ChevronUp className="text-slate-400" size={18} />
      </div>
      <div className="h-px bg-slate-200" />
      <div className="px-7 py-8">{children}</div>
    </div>
  );
}

function Radio({ checked }) {
  return (
    <span
      className={[
        "relative inline-flex h-4 w-4 items-center justify-center rounded-full border",
        checked ? "border-[#D06050]" : "border-slate-300",
      ].join(" ")}
    >
      {checked ? <span className="h-2 w-2 rounded-full bg-[#D06050]" /> : null}
    </span>
  );
}

export default function PaymentMethodPanel({ primary = "gpay", onSelectPrimary }) {
  return (
    <div className="space-y-6">
      {/* Primary */}
      <Panel title="Primary Payment Method">
        <div className="flex items-center gap-3 text-[18px] font-medium text-slate-900">
          <GoogleG className="h-6 w-6" />
          <span>Pay</span>
        </div>
      </Panel>

      {/* Other options */}
      <Panel title="Other Options">
        <div className="space-y-8">
          <button
            type="button"
            onClick={() => onSelectPrimary?.("stripe")}
            className="flex w-full items-center gap-5 text-left"
          >
            <Radio checked={primary === "stripe"} />
            <span className="text-[20px] font-bold text-[#635BFF]">stripe</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectPrimary?.("applepay")}
            className="flex w-full items-center gap-5 text-left"
          >
            <Radio checked={primary === "applepay"} />
            <span className="inline-flex items-center gap-2 text-[20px] font-semibold text-slate-900">
              <span className="text-black">
                <AppleFilled className="h-5 w-5" />
              </span>
              <span>Pay</span>
            </span>
          </button>
        </div>
      </Panel>

      {/* Button */}
      <button
        type="button"
        className="h-16 w-full rounded-2xl bg-[#D06050] text-[16px] font-semibold text-white hover:bg-[#C65648]"
      >
        Add Payment Method
      </button>
    </div>
  );
}