import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

import { leadsApi } from "../../features/leads/api/leadsApi";
import { queryKeys } from "../../services/api/queryKeys";

import LeadCard from "../../widgets/leads/LeadCard";
import BookingCalendarModal from "../../widgets/leads/BookingCalendarModal";
import Skeleton from "../../shared/ui/Skeleton";

const OPTIONS = [
  { key: "rentals", label: "Rentals" },
  { key: "buyers", label: "Buyers" },
  { key: "short-bookings", label: "Short Bookings" },
];

export default function LeadsPage() {
  const qc = useQueryClient();
  const [type, setType] = useState("rentals");

  const [openBooking, setOpenBooking] = useState(false);
  const [activeLeadId, setActiveLeadId] = useState(null);

  const LIST_KEY = queryKeys?.leads?.list ? queryKeys.leads.list(type) : ["leads", "list", type];

  const listQ = useQuery({
    queryKey: LIST_KEY,
    queryFn: () => leadsApi.list({ type }),
    staleTime: 30_000,
  });

  const items = useMemo(() => listQ.data?.items || [], [listQ.data]);

  const statusM = useMutation({
    mutationFn: ({ id, status }) => leadsApi.updateStatus({ id, status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: LIST_KEY }),
  });

  const bookingM = useMutation({
    mutationFn: ({ id, dateLabel }) => leadsApi.submitBooking({ id, dateLabel }),
    onSuccess: () => qc.invalidateQueries({ queryKey: LIST_KEY }),
  });

  const currentLabel = OPTIONS.find((o) => o.key === type)?.label || "Rentals";

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-295">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-semibold text-[#D06050]">Leads &amp; Applications</h1>

          {/* dropdown */}
          <div className="relative w-45">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-5 pr-10 text-sm font-medium text-[#D06050] outline-none"
            >
              {OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#D06050]" />
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {listQ.isLoading ? (
            <>
              <Skeleton className="h-60 rounded-2xl" />
              <Skeleton className="h-60 rounded-2xl" />
            </>
          ) : items.length ? (
            items.map((it) => (
              <LeadCard
                key={it.id}
                item={it}
                onAccept={() => statusM.mutate({ id: it.id, status: "approved" })}
                onDecline={() => statusM.mutate({ id: it.id, status: "declined" })}
                onSchedule={() => {
                  setActiveLeadId(it.id);
                  setOpenBooking(true);
                }}
                onViewBookings={() => {
                  setActiveLeadId(it.id);
                  setOpenBooking(true);
                }}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              No {currentLabel} found.
            </div>
          )}
        </div>
      </div>

      <BookingCalendarModal
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        isSubmitting={bookingM.isPending}
        onSubmit={(dateLabel) => {
          if (!activeLeadId) return;
          bookingM.mutate({ id: activeLeadId, dateLabel });
        }}
      />
    </div>
  );
}