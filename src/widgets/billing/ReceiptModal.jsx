import { useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";

import { billingApi } from "../../features/billing/api/billingApi";
import { queryKeys } from "../../services/api/queryKeys";
import usePrefersReducedMotion from "../../shared/hooks/usePrefersReducedMotion";
import Skeleton from "../../shared/ui/Skeleton";

export default function ReceiptModal({ open, invoiceId, onClose }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const q = useQuery({
    queryKey: queryKeys.billing.receipt(invoiceId || "none"),
    queryFn: () => billingApi.receipt(invoiceId),
    enabled: Boolean(open && invoiceId),
    staleTime: 30_000,
  });

  const overlayAnim = reduced
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.18 } };

  const panelAnim = reduced
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 18, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 18, scale: 0.98 },
        transition: { duration: 0.22 },
      };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open ? (
          <m.div className="fixed inset-0 z-90 flex items-center justify-center px-4 py-8" {...overlayAnim}>
            <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close" />

            <m.div
              className="relative w-full max-w-180 rounded-2xl bg-white px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)] max-h-[90vh] overflow-y-auto"
              {...panelAnim}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-50"
                aria-label="Close modal"
              >
                <X />
              </button>

              <div className="text-2xl font-semibold text-slate-900">Receipt</div>

              {q.isLoading ? (
                <Skeleton className="mt-6 h-50 rounded-2xl" />
              ) : q.data ? (
                <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                  <div className="text-lg font-semibold text-slate-900">{q.data.title}</div>
                  <div className="mt-2 text-sm text-slate-600">Tenant: {q.data.tenant}</div>
                  <div className="mt-1 text-sm text-[#D06050]">{q.data.paidLabel}</div>

                  <div className="mt-6 space-y-3">
                    {q.data.lines?.map((l) => (
                      <div key={l.label} className="flex items-center justify-between text-sm text-slate-700">
                        <span>{l.label}</span>
                        <span className="font-medium text-slate-900">{l.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 h-px bg-slate-200" />
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-lg font-semibold text-[#D06050]">{q.data.total}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-6 text-sm text-slate-500">Receipt not found.</div>
              )}
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
