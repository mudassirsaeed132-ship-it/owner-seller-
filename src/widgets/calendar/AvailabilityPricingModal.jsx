import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../shared/ui/Button";
import usePrefersReducedMotion from "../../shared/hooks/usePrefersReducedMotion";

function formatDateKey(date) {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function buildMonthGrid(viewDate) {
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7; // Monday first
  const gridStart = new Date(firstDayOfMonth);
  gridStart.setDate(firstDayOfMonth.getDate() - firstWeekday);

  return Array.from({ length: 35 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    return {
      date,
      label: String(date.getDate()),
      isCurrentMonth: date.getMonth() === viewDate.getMonth(),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    };
  });
}

function SelectLike({ value, onChange, options, placeholder }) {
  const isPlaceholder = !value;

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm outline-none transition",
          "focus:border-[#D06050]/50 focus:ring-2 focus:ring-[#D06050]/15",
          isPlaceholder ? "text-slate-400" : "text-slate-700",
        ].join(" ")}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function MiniCalendar({
  viewDate,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const grid = useMemo(() => buildMonthGrid(viewDate), [viewDate]);

  const monthLabel = viewDate.toLocaleString("en-US", { month: "long" });
  const yearLabel = viewDate.getFullYear();

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevMonth}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          aria-label="Previous month"
        >
          <ChevronLeft />
        </button>

        <div className="text-center">
          <div className="text-2xl font-medium text-slate-800">{monthLabel}</div>
          <div className="-mt-1 text-xs text-slate-400">{yearLabel}</div>
        </div>

        <button
          type="button"
          onClick={onNextMonth}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          aria-label="Next month"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-y-4 text-center text-xs text-slate-400">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-7 gap-y-4 text-center text-sm sm:gap-y-5">
        {grid.map((cell, idx) => {
          const active = isSameDay(selectedDate, cell.date);

          return (
            <button
              key={`${formatDateKey(cell.date)}-${idx}`}
              type="button"
              onClick={() => onSelectDate(cell.date)}
              className={[
                "mx-auto flex h-9 w-9 items-center justify-center rounded-xl transition",
                active
                  ? "bg-[#D06050] text-white"
                  : cell.isCurrentMonth
                  ? cell.isWeekend
                    ? "text-[#D06050] hover:bg-slate-100"
                    : "text-slate-700 hover:bg-slate-100"
                  : "text-slate-300 hover:bg-slate-50",
              ].join(" ")}
            >
              {cell.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AvailabilityPricingModal({
  open,
  onClose,
  properties = [],
  onSave,
  isSaving,
}) {
  const reduced = usePrefersReducedMotion();

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

  const propOptions = useMemo(
    () => properties.map((p) => ({ value: p.id, label: p.title })),
    [properties]
  );

  const [propertyId, setPropertyId] = useState("");
  const [spaceFrom, setSpaceFrom] = useState("");
  const [spaceTo, setSpaceTo] = useState("");
  const [hourly, setHourly] = useState("");
  const [daily, setDaily] = useState("");
  const [monthly, setMonthly] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(new Date(2021, 8, 1));

  const overlayAnim = reduced
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.18 },
      };

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
      blackoutDay: selectedDate ? String(selectedDate.getDate()) : "",
      blackoutDate: formatDateKey(selectedDate),
    };

    onSave?.(payload);
    onClose?.();
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open ? (
          <m.div
            className="fixed inset-0 z-[80] overflow-y-auto bg-black/40 px-4 py-4 sm:px-6 sm:py-6"
            {...overlayAnim}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) onClose?.();
            }}
          >
            <div className="flex min-h-full items-start justify-center">
              <m.div
                className="relative mt-4 w-full max-w-[860px] rounded-[24px] bg-white px-5 py-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)] sm:mt-8 sm:px-8 sm:py-7 lg:px-9 lg:py-8 max-h-[88vh] overflow-y-auto"
                {...panelAnim}
                role="dialog"
                aria-modal="true"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <h2 className="text-[28px] font-semibold leading-none text-slate-900 sm:text-[30px]">
                  Set Availability &amp; Pricing
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">
                      Select Property
                    </div>
                    <SelectLike
                      value={propertyId}
                      onChange={setPropertyId}
                      options={propOptions}
                      placeholder="Choose a Property"
                    />
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">
                      Living Space
                    </div>

                    <div className="grid gap-3 md:grid-cols-[1fr_48px_1fr] md:items-center">
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

                      <div className="hidden md:flex items-center justify-center text-sm text-slate-600">
                        To
                      </div>

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
                      <div className="mb-2 text-sm font-semibold text-slate-900">
                        Hourly Rate
                      </div>
                      <SelectLike
                        value={hourly}
                        onChange={setHourly}
                        options={[
                          { value: "150", label: "$150" },
                          { value: "250", label: "$250" },
                          { value: "350", label: "$350" },
                        ]}
                        placeholder="$150"
                      />
                    </div>

                    <div>
                      <div className="mb-2 text-sm font-semibold text-slate-900">
                        Daily Rate
                      </div>
                      <SelectLike
                        value={daily}
                        onChange={setDaily}
                        options={[
                          { value: "800", label: "$800" },
                          { value: "1200", label: "$1200" },
                          { value: "1800", label: "$1800" },
                        ]}
                        placeholder="$800"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                      <div className="mb-2 text-sm font-semibold text-slate-900">
                        Monthly Rate
                      </div>
                      <SelectLike
                        value={monthly}
                        onChange={setMonthly}
                        options={[
                          { value: "800", label: "$800" },
                          { value: "1500", label: "$1500" },
                          { value: "2500", label: "$2500" },
                        ]}
                        placeholder="$800"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Select Black out Dates
                    </div>

                    <MiniCalendar
                      viewDate={viewDate}
                      selectedDate={selectedDate}
                      onSelectDate={setSelectedDate}
                      onPrevMonth={() => setViewDate((prev) => addMonths(prev, -1))}
                      onNextMonth={() => setViewDate((prev) => addMonths(prev, 1))}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    className="h-14 w-full rounded-2xl"
                    onClick={submit}
                    disabled={Boolean(isSaving)}
                  >
                    Save Settings
                  </Button>
                </div>
              </m.div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}