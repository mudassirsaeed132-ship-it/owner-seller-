import { Check } from "lucide-react";
import logo from "../../assets/icons/logo/real-estate-logo.png";
import visaEnding from "../../assets/icons/payment & voices/visa-ending.svg";

export default function SubscriptionPanel({ subscription }) {
  return (
    <div className="grid gap-5 lg:gap-6 xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] xl:gap-8">
      {/* LEFT */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-6 lg:p-7">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="flex items-start justify-between gap-4 bg-[#F6EAE8] px-5 py-5 sm:px-6">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.02em] text-slate-700 sm:text-xs">
                {subscription.headerLeft}
              </div>
              <div className="mt-2 text-[22px] font-semibold text-slate-900 sm:text-[24px]">
                {subscription.planName}
              </div>
            </div>

            <img
              src={logo}
              alt="Real Estate"
              className="h-9 w-auto shrink-0 sm:h-10"
            />
          </div>

          <div className="px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
            <div className="text-[32px] font-semibold leading-none text-slate-900 sm:text-[34px]">
              {subscription.priceLabel}
            </div>

            <div className="mt-4 text-sm leading-6 text-slate-700">
              {subscription.includesLabel}
            </div>

            <div className="mt-5 space-y-3.5 sm:space-y-4">
              {subscription.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-800">
                  <Check size={18} className="mt-1 shrink-0 text-emerald-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-6 lg:p-7">
        <div className="flex h-full flex-col">
          <div className="text-[18px] font-medium text-slate-900">Payment Method</div>

          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <img src={visaEnding} alt="" className="mt-0.5 h-6 w-6 shrink-0" />

              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold text-slate-900 sm:text-[16px]">
                  Visa Ending {subscription.paymentMethod.last4}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  Expires: {subscription.paymentMethod.expires}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-900 transition hover:bg-slate-50 sm:w-auto sm:min-w-[110px]"
            >
              Update
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-8 lg:gap-6">
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#D06050] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#C65648] sm:h-[46px] sm:text-[16px]"
            >
              Change Plan
            </button>

            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#D06050] bg-white px-5 text-center text-[15px] font-semibold text-[#D06050] transition-colors hover:bg-[rgba(208,96,80,0.06)] sm:h-[46px] sm:text-[16px]"
            >
              Add Payment Method
            </button>
          </div>

          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}