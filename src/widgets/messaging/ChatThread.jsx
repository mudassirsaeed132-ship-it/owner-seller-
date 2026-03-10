import { useEffect, useMemo, useRef } from "react";
import { cn } from "../../shared/lib/cn";

export default function ChatThread({ title, messages = [] }) {
  const wrapRef = useRef(null);

  const normalized = useMemo(() => messages.filter(Boolean), [messages]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [normalized.length]);

  return (
    <div ref={wrapRef} className="h-full overflow-y-auto px-6 py-6">
      <div className="text-center text-sm font-semibold text-[#D06050]">{title}</div>

      <div className="mt-6 space-y-4">
        {normalized.map((m) => {
          const mine = m.from === "me";

          if (m.kind === "image") {
            return (
              <div key={m.id} className="flex items-end gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=32"
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="overflow-hidden rounded-2xl bg-slate-100 p-3">
                  <img src={m.image} alt="" className="h-[260px] w-[260px] rounded-2xl object-cover" loading="lazy" />
                </div>
              </div>
            );
          }

          return (
            <div key={m.id} className={cn("flex items-end gap-3", mine ? "justify-end" : "justify-start")}>
              {!mine ? (
                <img
                  src="https://i.pravatar.cc/40?img=32"
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                  loading="lazy"
                />
              ) : null}

              <div
                className={cn(
                  "max-w-[520px] rounded-2xl px-5 py-4 text-sm",
                  mine ? "bg-[#F6EAE8] text-[#D06050]" : "bg-slate-100 text-slate-600"
                )}
              >
                {m.text}
              </div>

              {mine ? (
                <img
                  src="https://i.pravatar.cc/40?img=11"
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
