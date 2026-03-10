
import { useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";

import { billingApi } from "../../features/billing/api/billingApi";
import { queryKeys } from "../../services/api/queryKeys";
import usePrefersReducedMotion from "../../shared/hooks/usePrefersReducedMotion";
import Skeleton from "../../shared/ui/Skeleton";

export default function PdfViewerModal({ open, invoiceId, onClose }) {
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
    queryKey: queryKeys.billing.pdf(invoiceId || "none"),
    queryFn: () => billingApi.pdf(invoiceId),
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
              className="relative w-full max-w-215 rounded-2xl bg-white px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)] max-h-[90vh] overflow-y-auto"
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

              <div className="text-2xl font-semibold text-slate-900">PDF</div>

              {q.isLoading ? (
                <Skeleton className="mt-6 h-80 rounded-2xl" />
              ) : q.data ? (
                <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                  <div className="text-sm text-slate-600">File:</div>
                  <div className="mt-1 text-base font-semibold text-slate-900">{q.data.fileName}</div>

                  <div className="mt-6 h-90 rounded-2xl bg-slate-50 flex items-center justify-center text-sm text-slate-500">
                    PDF Viewer Placeholder (backend will provide actual URL)
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                      onClick={() => onClose?.()}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 text-sm text-slate-500">PDF not found.</div>
              )}
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}