import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../shared/ui/Button";
import usePrefersReducedMotion from "../../shared/hooks/usePrefersReducedMotion";

export default function BookingCalendarModal({ open, onClose, onSubmit, isSubmitting }) {
  const reduced = usePrefersReducedMotion();
  const [selected, setSelected] = useState("2");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const grid = [
    ["31", "30", "1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10", "11", "12"],
    ["13", "14", "15", "16", "17", "18", "19"],
    ["20", "21", "22", "23", "24", "25", "26"],
    ["27", "28", "29", "30", "31", "1", "2"],
  ];
  const redDays = new Set(["5", "14", "18", "22", "31"]);

  const submit = () => {
    onSubmit?.(`Jan 7,2026 - 2PM`);
    onClose?.();
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open ? (
          <m.div className="fixed inset-0 z-90" {...overlayAnim}>
            {/* overlay click closes */}
            <button type="button" className="absolute inset-0 bg-black/40" onClick={() => onClose?.()} />

            {/*  responsive wrapper */}
            <div className="relative flex min-h-full items-center justify-center px-4 py-6 sm:py-10">
              <m.div
                className="
                  relative w-full
                  max-w-230
                  rounded-2xl bg-white
                  shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                  px-5 py-7 sm:px-10 sm:py-9
                  max-h-[90vh] overflow-y-auto
                "
                {...panelAnim}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center text-xl sm:text-2xl font-semibold text-slate-900">Bookings</div>

                <div className="mt-6 flex items-center justify-between">
                  <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200">
                    <ChevronLeft />
                  </button>

                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-medium text-slate-800">September</div>
                    <div className="-mt-1 text-xs text-slate-400">2021</div>
                  </div>

                  <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200">
                    <ChevronRight />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-7 gap-y-3 sm:gap-y-4 text-center text-[11px] sm:text-xs text-slate-400">
                  {days.map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                {/*  tighter spacing on mobile */}
                <div className="mt-6 grid grid-cols-7 gap-y-4 sm:gap-y-6 text-center text-sm">
                  {grid.flat().map((d, idx) => {
                    const isSelected = selected === d;
                    const isRed = redDays.has(d);
                    return (
                      <button
                        key={`${d}-${idx}`}
                        type="button"
                        onClick={() => setSelected(d)}
                        className={[
                          "mx-auto flex h-9 w-9 items-center justify-center rounded-xl transition",
                          isSelected ? "bg-[#D06050] text-white" : "text-slate-700 hover:bg-slate-100",
                          !isSelected && isRed ? "text-[#D06050]" : "",
                        ].join(" ")}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                <Button className="mt-8 sm:mt-10 h-14 w-full rounded-2xl" onClick={submit} disabled={Boolean(isSubmitting)}>
                  Submit
                </Button>
              </m.div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}