import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../shared/ui/Button";
import usePrefersReducedMotion from "../../shared/hooks/usePrefersReducedMotion";

function SelectLike({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function MiniCalendar({ selected, onToggle }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const grid = [
    ["31", "30", "1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10", "11", "12"],
    ["13", "14", "15", "16", "17", "18", "19"],
    ["20", "21", "22", "23", "24", "25", "26"],
    ["27", "28", "29", "30", "31", "1", "2"],
  ];
  const redDays = new Set(["5", "14", "18", "22", "31"]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200">
          <ChevronLeft />
        </button>

        <div className="text-center">
          <div className="text-xl font-medium text-slate-800">September</div>
          <div className="-mt-1 text-xs text-slate-400">2021</div>
        </div>

        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200">
          <ChevronRight />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-y-4 text-center text-xs text-slate-400">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-7 gap-y-5 text-center text-sm">
        {grid.flat().map((d, idx) => {
          const isSelected = selected === d;
          const isRed = redDays.has(d);

          return (
            <button
              key={`${d}-${idx}`}
              type="button"
              onClick={() => onToggle(d)}
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
    </div>
  );
}

export default function AvailabilityPricingModal({ open, onClose, properties = [], onSave, isSaving }) {
  const reduced = usePrefersReducedMotion();

  // ✅ body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ✅ ESC close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const propOptions = useMemo(() => properties.map((p) => ({ value: p.id, label: p.title })), [properties]);

  const [propertyId, setPropertyId] = useState("");
  const [spaceFrom, setSpaceFrom] = useState("");
  const [spaceTo, setSpaceTo] = useState("");
  const [hourly, setHourly] = useState("150");
  const [daily, setDaily] = useState("800");
  const [monthly, setMonthly] = useState("800");
  const [selectedDay, setSelectedDay] = useState("2");

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

  const submit = () => {
    const payload = {
      propertyId,
      livingSpaceFrom: spaceFrom,
      livingSpaceTo: spaceTo,
      hourlyRate: hourly,
      dailyRate: daily,
      monthlyRate: monthly,
      blackoutDay: selectedDay,
    };

    // ✅ close immediately (as you requested)
    onSave?.(payload);
    onClose?.();
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open ? (
          <m.div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6 sm:py-10" {...overlayAnim}>
            {/* ✅ overlay click closes */}
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={() => onClose?.()}
              aria-label="Close modal"
            />

            {/* panel */}
            <m.div
              className="
                relative w-full max-w-[980px] rounded-2xl bg-white
                shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                max-h-[90vh] overflow-y-auto
                px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9
              "
              {...panelAnim}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Set Availability &amp; Pricing</h2>

              <div className="mt-7 space-y-6">
                <div>
                  <div className="mb-2 text-sm font-semibold text-slate-900">Select Property</div>
                  <SelectLike value={propertyId} onChange={setPropertyId} options={propOptions} placeholder="Choose a Property" />
                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_44px_1fr] lg:items-end">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Living Space</div>
                    <SelectLike
                      value={spaceFrom}
                      onChange={setSpaceFrom}
                      options={[
                        { value: "500", label: "500" },
                        { value: "800", label: "800" },
                        { value: "1200", label: "1200" },
                      ]}
                      placeholder="Type here"
                    />
                  </div>

                  <div className="hidden lg:flex items-center justify-center pb-2 text-sm text-slate-600">To</div>

                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900 lg:opacity-0">To</div>
                    <SelectLike
                      value={spaceTo}
                      onChange={setSpaceTo}
                      options={[
                        { value: "900", label: "900" },
                        { value: "1400", label: "1400" },
                        { value: "2000", label: "2000" },
                      ]}
                      placeholder="Type here"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Hourly Rate</div>
                    <SelectLike
                      value={hourly}
                      onChange={setHourly}
                      options={[
                        { value: "150", label: "$150" },
                        { value: "250", label: "$250" },
                      ]}
                      placeholder="$150"
                    />
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Daily Rate</div>
                    <SelectLike
                      value={daily}
                      onChange={setDaily}
                      options={[
                        { value: "800", label: "$800" },
                        { value: "1200", label: "$1200" },
                      ]}
                      placeholder="$800"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <div className="mb-2 text-sm font-semibold text-slate-900">Monthly Rate</div>
                    <SelectLike
                      value={monthly}
                      onChange={setMonthly}
                      options={[
                        { value: "800", label: "$800" },
                        { value: "1500", label: "$1500" },
                      ]}
                      placeholder="$800"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-900">Select Black out Dates</div>
                  <MiniCalendar selected={selectedDay} onToggle={setSelectedDay} />
                </div>
              </div>

              <div className="mt-8">
                <Button className="h-14 w-full rounded-2xl" onClick={submit} disabled={Boolean(isSaving)}>
                  Save Settings
                </Button>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}