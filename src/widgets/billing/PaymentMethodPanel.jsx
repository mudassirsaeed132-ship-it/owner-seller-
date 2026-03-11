import { ChevronUp } from "lucide-react";
import { AppleFilled, GoogleG } from "../../shared/ui/BrandMarks";

function Panel({ title, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 lg:px-7">
        <div className="text-[16px] font-medium text-slate-900 sm:text-[18px]">{title}</div>
        <ChevronUp className="shrink-0 text-slate-400" size={18} />
      </div>

      <div className="h-px bg-slate-200" />
      <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-8">{children}</div>
    </div>
  );
}

function Radio({ checked }) {
  return (
    <span
      className={[
        "relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
        checked ? "border-[#D06050]" : "border-slate-300",
      ].join(" ")}
    >
      {checked ? <span className="h-2 w-2 rounded-full bg-[#D06050]" /> : null}
    </span>
  );
}

export default function PaymentMethodPanel({ primary = "gpay", onSelectPrimary }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <Panel title="Primary Payment Method">
        <div className="flex items-center gap-3 text-[17px] font-medium text-slate-900 sm:text-[18px]">
          <GoogleG className="h-6 w-6 shrink-0" />
          <span>Pay</span>
        </div>
      </Panel>

      <Panel title="Other Options">
        <div className="space-y-5 sm:space-y-6 lg:space-y-8">
          <button
            type="button"
            onClick={() => onSelectPrimary?.("stripe")}
            className="flex w-full items-center gap-4 text-left sm:gap-5"
          >
            <Radio checked={primary === "stripe"} />
            <span className="text-[18px] font-bold leading-none text-[#635BFF] sm:text-[20px]">
              stripe
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectPrimary?.("applepay")}
            className="flex w-full items-center gap-4 text-left sm:gap-5"
          >
            <Radio checked={primary === "applepay"} />
            <span className="inline-flex items-center gap-2 text-[18px] font-semibold leading-none text-slate-900 sm:text-[20px]">
              <span className="text-black">
                <AppleFilled className="h-5 w-5" />
              </span>
              <span>Pay</span>
            </span>
          </button>
        </div>
      </Panel>

      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#D06050] px-5 text-[15px] font-semibold text-white transition hover:bg-[#C65648] sm:h-14 sm:text-[16px] lg:h-16"
      >
        Add Payment Method
      </button>
    </div>
  );
}