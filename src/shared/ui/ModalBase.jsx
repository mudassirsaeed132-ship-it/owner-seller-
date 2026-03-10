import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";
import useLockBodyScroll from "../hooks/useLockBodyScroll";

export default function ModalBase({ open, onClose, title, children, className }) {
  const id = useId();
  const panelRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();

      if (e.key === "Tab") {
        const root = panelRef.current;
        if (!root) return;

        const focusables = root.querySelectorAll(
          'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
        );

        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const prev = document.activeElement;

    setTimeout(() => {
      const root = panelRef.current;
      if (!root) return;

      const first = root.querySelector(
        'button:not([disabled]),[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      );

      first?.focus?.();
    }, 0);

    return () => prev?.focus?.();
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div aria-labelledby={id} role="dialog" aria-modal="true" className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40"
        onClick={() => onClose?.()}
      />

      <div className="relative z-[1] flex min-h-full items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <div
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative w-full max-w-[680px] max-h-[85vh] overflow-y-auto rounded-[24px] bg-white px-5 py-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)] sm:px-8 sm:py-7",
            className
          )}
        >
          {title ? (
            <h2 id={id} className="mb-5 text-[28px] font-semibold leading-none text-slate-900">
              {title}
            </h2>
          ) : null}

          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}