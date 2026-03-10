import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Skeleton from "../../shared/ui/Skeleton";

import BookingRequestCard from "../../widgets/calendar/BookingRequestCard";
import PropertiesOverviewCard from "../../widgets/calendar/PropertiesOverviewCard";
import AvailabilityPricingModal from "../../widgets/calendar/AvailabilityPricingModal";

import { calendarApi } from "../../features/calendar/api/calendarApi";
import { queryKeys } from "../../services/api/queryKeys";

export default function CalendarPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  //  safe key (won’t crash if queryKeys.calendar missing)
  const DASH_KEY = queryKeys?.calendar?.dashboard ? queryKeys.calendar.dashboard() : ["calendar", "dashboard"];

  const dashQ = useQuery({
    queryKey: DASH_KEY,
    queryFn: () => calendarApi.dashboard(),
    staleTime: 30_000,
  });

  const data = dashQ.data || {};
  const upcoming = data.upcoming || [];
  const overview = data.overview || [];
  const properties = data.properties || [];

  const updateBookingM = useMutation({
    mutationFn: ({ id, status }) => calendarApi.updateBooking({ id, status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: DASH_KEY }),
  });

  const saveSettingsM = useMutation({
    mutationFn: (payload) => calendarApi.saveSettings(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DASH_KEY });
      setOpen(false);
    },
  });

  const leftCards = useMemo(() => upcoming, [upcoming]);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-295">
        {/* header row */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-4xl font-semibold text-[#D06050]">Calendar &amp; Bookings</h1>

          <Button className="h-12 rounded-full px-8" onClick={() => setOpen(true)}>
            Calendar
          </Button>
        </div>

        {/* grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-base font-semibold text-slate-900">Upcoming Schedule</div>
              <button type="button" className="text-xs font-medium text-[#D06050] hover:underline">
                See all
              </button>
            </div>

            {/*  loading */}
            {dashQ.isLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-55 rounded-2xl" />
                <Skeleton className="h-55 rounded-2xl" />
              </div>
            ) : dashQ.isError ? (
              <Card className="rounded-2xl p-5 text-sm text-slate-600">
                Calendar data not loading. Ensure MSW calendar handlers + db.calendar are wired.
              </Card>
            ) : leftCards.length ? (
              <div className="space-y-6">
                {leftCards.map((r) => (
                  <BookingRequestCard
                    key={r.id}
                    item={r}
                    onAccept={() => updateBookingM.mutate({ id: r.id, status: "confirmed" })}
                    onDecline={() => updateBookingM.mutate({ id: r.id, status: "declined" })}
                    isBusy={updateBookingM.isPending}
                  />
                ))}
              </div>
            ) : (
              <Card className="rounded-2xl p-5 text-sm text-slate-500">No upcoming bookings yet.</Card>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <div className="mb-3 text-base font-semibold text-slate-900">Properties Overview</div>

            {dashQ.isLoading ? (
              <Skeleton className="h-65 rounded-2xl" />
            ) : (
              <Card className="rounded-2xl p-4">
                {overview.length ? (
                  <PropertiesOverviewCard items={overview} />
                ) : (
                  <div className="py-10 text-center text-sm text-slate-500">No overview items.</div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>

      <AvailabilityPricingModal
        open={open}
        onClose={() => setOpen(false)}
        properties={properties}
        isSaving={saveSettingsM.isPending}
        onSave={(payload) => saveSettingsM.mutate(payload)}
      />
    </div>
  );
}