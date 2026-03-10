// src/widgets/billing/SubscriptionPanel.jsx
import { Check } from "lucide-react";
import logo from "../../assets/icons/logo/real-estate-logo.png";
import visaEnding from "../../assets/icons/payment & voices/visa-ending.svg";

export default function SubscriptionPanel({ subscription }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-10 lg:items-stretch">
      {/* LEFT */}
      <div className="h-full rounded-2xl bg-white p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.04)] lg:min-h-130">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="flex items-start justify-between bg-[#F6EAE8] px-7 py-5">
            <div>
              <div className="text-xs font-semibold text-slate-700">{subscription.headerLeft}</div>
              <div className="mt-2 text-[24px] font-semibold text-slate-900">{subscription.planName}</div>
            </div>
            <img src={logo} alt="Real Estate" className="h-10 w-auto" />
          </div>

          <div className="px-7 pb-7 pt-6">
            <div className="text-[34px] font-semibold text-slate-900">{subscription.priceLabel}</div>
            <div className="mt-4 text-sm text-slate-700">{subscription.includesLabel}</div>

            <div className="mt-5 space-y-4">
              {subscription.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-sm text-slate-800">
                  <Check size={18} className="mt-0.5 text-emerald-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="h-full rounded-2xl bg-white p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.04)] lg:min-h-130">
        <div className="flex h-full flex-col">
          <div className="text-[18px] font-medium text-slate-900">Payment Method</div>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4">
            <div className="flex items-start gap-3">
              <img src={visaEnding} alt="" className="h-6 w-6" />
              <div>
                <div className="text-[16px] font-semibold text-slate-900">
                  Visa Ending {subscription.paymentMethod.last4}
                </div>
                <div className="mt-1 text-sm text-slate-500">Expires:{subscription.paymentMethod.expires}</div>
              </div>
            </div>

            <button
              type="button"
              className="h-11 rounded-2xl border border-slate-200 bg-white px-8 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Update
            </button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <button
              type="button"
              className="h-11.5 rounded-xl bg-[#D06050] text-[16px] font-semibold text-white transition-colors hover:bg-[#C65648]"
            >
              Change Plan
            </button>

            <button
              type="button"
              className="h-11.5 rounded-xl border border-[#D06050] bg-white text-[16px] font-semibold text-[#D06050] transition-colors hover:bg-[rgba(208,96,80,0.06)]"
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
