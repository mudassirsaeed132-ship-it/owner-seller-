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

  const DASH_KEY = queryKeys?.calendar?.dashboard
    ? queryKeys.calendar.dashboard()
    : ["calendar", "dashboard"];

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
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9 xl:px-10 xl:py-10">
      <div className="mx-auto max-w-[1260px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-[32px] font-semibold leading-tight text-[#D06050] sm:text-[40px] xl:text-[44px]">
            Calendar &amp; Bookings
          </h1>

          <Button
            className="h-11 self-start rounded-2xl px-6 text-[14px] sm:h-12 sm:px-8 sm:text-[15px]"
            onClick={() => setOpen(true)}
          >
            Calendar
          </Button>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="text-[16px] font-semibold text-slate-900 sm:text-[17px]">
                Upcoming Schedule
              </div>

              <button
                type="button"
                className="text-[12px] font-medium text-[#D06050] transition hover:underline sm:text-[13px]"
              >
                See all
              </button>
            </div>

            {dashQ.isLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-[240px] rounded-2xl sm:h-[220px]" />
                <Skeleton className="h-[240px] rounded-2xl sm:h-[220px]" />
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
              <Card className="rounded-2xl p-5 text-sm text-slate-500">
                No upcoming bookings yet.
              </Card>
            )}
          </div>

          <div className="min-w-0">
            <div className="mb-3 text-[16px] font-semibold text-slate-900 sm:text-[17px]">
              Properties Overview
            </div>

            {dashQ.isLoading ? (
              <Skeleton className="h-[280px] rounded-2xl" />
            ) : (
              <Card className="rounded-2xl p-4 sm:p-5">
                {overview.length ? (
                  <PropertiesOverviewCard items={overview} />
                ) : (
                  <div className="py-10 text-center text-sm text-slate-500">
                    No overview items.
                  </div>
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