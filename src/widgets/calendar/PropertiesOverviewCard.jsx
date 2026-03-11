function EyeFilledIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 5C6.7 5 2.6 8.3 1 12c1.6 3.7 5.7 7 11 7s9.4-3.3 11-7c-1.6-3.7-5.7-7-11-7Z"
        fill="#D06050"
      />
      <circle cx="12" cy="12" r="3.2" fill="white" />
      <circle cx="12" cy="12" r="1.6" fill="#D06050" />
    </svg>
  );
}

function CalendarIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" stroke="#D06050" strokeWidth="1.8" />
      <path
        d="M8 3.8v3.4M16 3.8v3.4M4 9.5h16"
        stroke="#D06050"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PropertiesOverviewCard({ items = [] }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {items.map((x) => (
        <div
          key={x.id}
          className="grid grid-cols-[78px_minmax(0,1fr)_92px] items-start gap-x-3 gap-y-1 sm:grid-cols-[78px_minmax(0,1fr)_100px] sm:gap-x-4"
        >
          <img
            src={x.image}
            alt=""
            className="h-[60px] w-[78px] rounded-xl object-cover sm:h-[64px] sm:w-[78px]"
            loading="lazy"
            draggable={false}
          />

          <div className="min-w-0">
            <div className="line-clamp-2 text-[12px] font-semibold leading-[1.35] text-[#D06050] sm:text-[13px]">
              {x.title}
            </div>

            <div className="mt-1.5 space-y-1 text-[12px] sm:text-[13px]">
              <div className="flex min-w-0 items-center gap-2">
                <CalendarIcon className="h-[15px] w-[15px] shrink-0" />
                <span className="truncate text-slate-900">{x.date}</span>
              </div>

              <div className="flex min-w-0 items-center gap-2">
                <EyeFilledIcon className="h-[15px] w-[15px] shrink-0" />
                <span className="truncate text-slate-900">{x.person}</span>
              </div>
            </div>
          </div>

          <div className="pt-0.5 text-right">
            <div className="text-[12px] text-[#D06050] sm:text-[13px]">
              Black out:
            </div>
            <div className="mt-0.5 text-[12px] font-semibold text-[#D06050] sm:text-[13px]">
              {x.blackout}
            </div>
            <div className="mt-3 text-[12px] text-slate-500 sm:text-[13px]">
              {x.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}