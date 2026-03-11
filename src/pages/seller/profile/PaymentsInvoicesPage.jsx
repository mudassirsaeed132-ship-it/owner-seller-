import { useEffect, useMemo, useRef, useState } from "react";
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
  { key: "methods", label: "Payment Method" },
  { key: "subscription", label: "Subscription" },
];

function useOutsideClose(open, onClose) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose?.();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose?.();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return ref;
}

export default function PaymentsInvoicesPage() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [sp, setSp] = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const tab = sp.get("tab") || "invoices";
  const isSubscription = tab === "subscription";
  const activeTab = useMemo(
    () => TABS.find((item) => item.key === tab) || TABS[0],
    [tab]
  );

  const dropdownRef = useOutsideClose(menuOpen, () => setMenuOpen(false));

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

  const bodyWrapClass = isSubscription
    ? "mt-5 md:mt-6"
    : "mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:px-6 sm:py-6 lg:mt-6 lg:px-8 lg:py-8";

  const handleTabChange = (nextTab) => {
    setSp({ tab: nextTab });
    setMenuOpen(false);
  };

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => nav("/seller/profile")}
              className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hover:bg-slate-50"
              aria-label="Back"
            >
              <ChevronLeft size={24} className="text-[#D06050]" />
            </button>

            <div className="min-w-0">
              <h1 className="text-[28px] font-semibold leading-tight text-[#D06050] sm:text-[36px] lg:text-[40px]">
                Payment &amp; Invoices
              </h1>
            </div>
          </div>

          <div ref={dropdownRef} className="relative w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-medium text-[#D06050] outline-none transition hover:border-slate-300 sm:w-auto sm:min-w-[180px]"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <span className="truncate">{activeTab.label}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {menuOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-30 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.10)] sm:min-w-[190px] sm:w-auto">
                {TABS.map((item) => {
                  const active = item.key === tab;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleTabChange(item.key)}
                      className={[
                        "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition",
                        active
                          ? "bg-[#FAECE9] font-semibold text-[#D06050]"
                          : "text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      {active ? <span className="text-xs">✓</span> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className={bodyWrapClass}>
          {tab === "invoices" ? (
            invoicesQ.isLoading ? (
              <Skeleton className="h-[420px] rounded-2xl md:h-[520px]" />
            ) : (
              <InvoiceGrid invoices={invoices} />
            )
          ) : tab === "methods" ? (
            methodsQ.isLoading ? (
              <Skeleton className="h-[420px] rounded-2xl md:h-[520px]" />
            ) : (
              <PaymentMethodPanel
                primary={primary}
                onSelectPrimary={(method) => setPrimaryM.mutate(method)}
              />
            )
          ) : subQ.isLoading ? (
            <Skeleton className="h-[420px] rounded-2xl md:h-[520px]" />
          ) : (
            <SubscriptionPanel subscription={subscription} />
          )}
        </div>
      </div>
    </div>
  );
}