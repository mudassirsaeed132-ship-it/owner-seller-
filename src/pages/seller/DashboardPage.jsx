import { useMemo } from "react";
import QuickActions from "../../widgets/dashboard/QuickActions";
import RecommendedList from "../../widgets/dashboard/RecommendedList";
import ScheduleCard from "../../widgets/dashboard/ScheduleCard";
import TransactionsList from "../../widgets/dashboard/TransactionsList";

import qaAdd from "../../assets/images/quick-actions/qa-add-listings.svg";
import qaBook from "../../assets/images/quick-actions/qa-booking-applications.svg";
import qaTenant from "../../assets/images/quick-actions/qa-tenant-applications.svg";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const nav = useNavigate();

  const PROPERTY_P1 = "/images/properties/p-1.png";
  const PROPERTY_P2 = "/images/properties/p-2.png";
  const AVATAR_1 = "/images/avators/avator-1.png";

  const quick = useMemo(
    () => [
      {
        key: "add",
        label: "Add Listings",
        icon: qaAdd,
        onClick: () => nav("/seller/listings/new/details"),
      },
      {
        key: "booking",
        label: "Booking Applications",
        icon: qaBook,
        onClick: () => nav("/seller/calendar"),
      },
      {
        key: "tenant",
        label: "Tenant Applications",
        icon: qaTenant,
        onClick: () => nav("/seller/leads"),
      },
    ],
    [nav]
  );

  const recommended = useMemo(
    () => [
      {
        id: "r1",
        title: "Sky Dandelions Apartment",
        location: "Jakarta, Indonesia",
        price: "Rs 450,000",
        meta: "32 Views . 2 chats",
        type: "Rent",
        badge: "Apartment",
        image: PROPERTY_P1,
      },
      {
        id: "r2",
        title: "Sky Dandelions Apartment",
        location: "Jakarta, Indonesia",
        price: "Rs 450,000",
        meta: "32 Views . 2 chats",
        type: "Rent",
        badge: "Apartment",
        image: PROPERTY_P1,
      },
    ],
    [PROPERTY_P1]
  );

  const schedule = useMemo(
    () => [
      {
        id: "s1",
        label: "2:00 PM Viewing: Loft Studio Tour",
        avatar: AVATAR_1,
      },
      {
        id: "s2",
        label: "Confirm Lease Agreement with Anna",
        avatar: AVATAR_1,
      },
      {
        id: "s3",
        label: "4:00 PM Bank Transfer to Angelo",
        avatar: AVATAR_1,
      },
    ],
    [AVATAR_1]
  );

  const tx = useMemo(
    () => [
      {
        id: "t1",
        title: "Sky Dandelions Apartment",
        user: "Jordan Smith",
        userAvatar: AVATAR_1,
        meta: "Apr 10 - Google pay",
        amount: "$600,000",
        status: "Paid",
        image: PROPERTY_P2,
      },
      {
        id: "t2",
        title: "Sky Dandelions Apartment",
        user: "Jordan Smith",
        userAvatar: AVATAR_1,
        meta: "Apr 10 - Google pay",
        amount: "$600,000",
        status: "Pending",
        image: PROPERTY_P2,
      },
      {
        id: "t3",
        title: "Sky Dandelions Apartment",
        user: "Jordan Smith",
        userAvatar: AVATAR_1,
        meta: "Apr 10 - Google pay",
        amount: "$600,000",
        status: "Paid",
        image: PROPERTY_P2,
      },
    ],
    [AVATAR_1, PROPERTY_P2]
  );

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="text-sm text-slate-700">Hi Jane 👋</div>

        <h1 className="mt-2 text-4xl font-semibold text-slate-900">
          Are You Ready To Start <span className="text-[#D06050]">Selling</span>
        </h1>

        <QuickActions items={quick} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] items-stretch">
          <div className="flex flex-col">
            <RecommendedList
              items={recommended}
              onSeeAll={() => nav("/seller/listings")}
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-3 text-sm font-semibold text-slate-900">
              Upcoming Schedule
            </div>
            <ScheduleCard items={schedule} className="flex-1" />
          </div>
        </div>

        <TransactionsList items={tx} />
      </div>
    </div>
  );
}