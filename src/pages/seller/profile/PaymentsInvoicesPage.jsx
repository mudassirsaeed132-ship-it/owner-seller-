// src/pages/seller/profile/PaymentsInvoicesPage.jsx
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft } from "lucide-react";

import { billingApi } from "../../../features/billing/api/billingApi";
import { queryKeys } from "../../../services/api/queryKeys";
import Skeleton from "../../../shared/ui/Skeleton";

import InvoiceGrid from "../../../widgets/billing/InvoiceGrid";
import PaymentMethodPanel from "../../../widgets/billing/PaymentMethodPanel";
import SubscriptionPanel from "../../../widgets/billing/SubscriptionPanel";

const TABS = [
  { key: "invoices", label: "Invoices" },
  { key: "methods", label: "payment Method" },
  { key: "subscription", label: "Subscription" },
];

export default function PaymentsInvoicesPage() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [sp, setSp] = useSearchParams();

  const tab = sp.get("tab") || "invoices";
  const isSubscription = tab === "subscription";

  const invoicesQ = useQuery({
    queryKey: queryKeys.billing.invoices(),
    queryFn: () => billingApi.invoices(),
    staleTime: 30_000,
  });

  const methodsQ = useQuery({
    queryKey: queryKeys.billing.paymentMethods(),
    queryFn: () => billingApi.paymentMethods(),
    staleTime: 30_000,
  });

  const subQ = useQuery({
    queryKey: queryKeys.billing.subscription(),
    queryFn: () => billingApi.subscription(),
    staleTime: 30_000,
  });

  const setPrimaryM = useMutation({
    mutationFn: (method) => billingApi.setPrimaryMethod(method),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.billing.paymentMethods() }),
  });

  const invoices = useMemo(() => invoicesQ.data?.items || [], [invoicesQ.data]);
  const primary = methodsQ.data?.primary || "gpay";
  const subscription = subQ.data;

  //  Subscription tab pe outer rounded container NAHI
  const bodyWrapClass = isSubscription
    ? "mt-6"
    : "mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-7 sm:px-8 sm:py-8";

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      {/* width ko figma jaisa tight */}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => nav("/seller/profile")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-50"
              aria-label="Back"
            >
              <ChevronLeft size={26} className="text-[#D06050]" />
            </button>
            <h1 className="text-4xl font-semibold text-[#D06050]">Payment &amp; Invoices</h1>
          </div>

          <div className="relative w-55">
            <select
              value={tab}
              onChange={(e) => setSp({ tab: e.target.value })}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-5 pr-10 text-sm font-medium text-[#D06050] outline-none"
            >
              {TABS.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#D06050]" />
          </div>
        </div>

        <div className={bodyWrapClass}>
          {tab === "invoices" ? (
            invoicesQ.isLoading ? (
              <Skeleton className="h-130 rounded-2xl" />
            ) : (
              <InvoiceGrid invoices={invoices} />
            )
          ) : tab === "methods" ? (
            methodsQ.isLoading ? (
              <Skeleton className="h-130 rounded-2xl" />
            ) : (
              <PaymentMethodPanel primary={primary} onSelectPrimary={(m) => setPrimaryM.mutate(m)} />
            )
          ) : subQ.isLoading ? (
            <Skeleton className="h-130 rounded-2xl" />
          ) : (
            <SubscriptionPanel subscription={subscription} />
          )}
        </div>
      </div>
    </div>
  );
}