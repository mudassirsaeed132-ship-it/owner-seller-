import { useMemo, useState } from "react";
import Card from "../../../../shared/ui/Card";
import Button from "../../../../shared/ui/Button";
import Tabs from "../../../../shared/ui/Tabs";
import ModalBase from "../../../../shared/ui/ModalBase";
import { Check } from "lucide-react";
import logo from "../../../../assets/icons/logo/real-estate-logo.png";

function PlanCard({ selected, titleTop, title, price, bullets, disabledBullets }) {
  return (
    <Card
      className={[
        "overflow-hidden rounded-2xl p-0",
        selected ? "border-2 border-[#D06050]" : "border border-slate-200",
      ].join(" ")}
    >
      <div className="flex items-start justify-between bg-[#F6EAE8] px-5 py-4">
        <div>
          <div className="text-[11px] font-semibold uppercase text-slate-600">
            {titleTop}
          </div>
          <div className="text-lg font-semibold text-slate-900">{title}</div>
        </div>
        <img src={logo} alt="" className="h-8 w-auto opacity-90" />
      </div>

      <div className="px-5 py-5">
        <div className="text-2xl font-semibold text-slate-900">{price}</div>

        <div className="mt-4 text-xs text-slate-600">
          Includes everything in FREE, plus:
        </div>

        <ul className="mt-4 space-y-2 text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Check size={18} className="mt-0.5 text-emerald-500" />
              <span className="text-slate-700">{b}</span>
            </li>
          ))}
        </ul>

        {disabledBullets?.length ? (
          <ul className="mt-4 space-y-2 text-sm">
            {disabledBullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-slate-400">
                <span className="mt-1.5 inline-block h-0.5 w-2.5 bg-slate-300" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {selected ? (
          <div className="mt-5 flex justify-end">
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#D06050] text-white">
              ✓
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export default function PlanStep() {
  const [cycle, setCycle] = useState("monthly");
  const [selected, setSelected] = useState("free");
  const [addonsOpen, setAddonsOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("gpay");

  const plans = useMemo(
    () => [
      {
        key: "free",
        titleTop: "STARTER",
        title: "Free",
        price: "Free",
        bullets: [
          "Up to 1 active listing",
          "Basic listing creation",
          "Limited photos 5",
          "Manual pricing only",
          "Basic chat with buyers/renters",
          "View count & inquiry count",
          "Standard moderation queue",
          "Basic support",
        ],
        disabledBullets: [
          "AI price valuation",
          "AI factsheet PDF",
          "Booking calendar",
          "Short-term rent feature",
          "Financial dashboard",
        ],
      },
      {
        key: "pro",
        titleTop: "PLAYER & FAN +",
        title: "PRO",
        price: "$2.99/mo",
        bullets: [
          "AI Chatbot Access",
          "Tournament & Tryout Tracker",
          "Event Reminders & Notifications",
          "Calendar Invites",
          "Advanced Filters & Search",
        ],
      },
      {
        key: "partner",
        titleTop: "ORGANIZER & DATA PARTNER",
        title: "PARTNER",
        price: "$9.99/mo",
        bullets: [
          "Access Grassroots API",
          "Manage, Sync Data, Schedules & Venues",
          "Submit League, Club, Pick-Up League",
          "Submit Tournaments, Tryouts, Events",
          "Submit Fan Club",
          "Upload Docs",
          "Update News & Announcements",
          "Maintain Their Organisation Profile",
          "See Basic Analytics (views, clicks, RSVPs)",
        ],
      },
    ],
    []
  );

  const addonOptions = useMemo(
    () => ["Featured Listing", "Boosts", "Extra Photos", "AI Factsheets"],
    []
  );

  const paymentOptions = useMemo(
    () => [
      {
        key: "gpay",
        label: "Pay with Google Pay",
        icon: "/images/icons/g-pay.svg",
      },
      {
        key: "stripe",
        label: "Pay with Stripe",
        icon: "/images/icons/stripe.svg",
      },
      {
        key: "apple",
        label: "Pay with Apple pay",
        icon: "/images/icons/apple.svg",
      },
    ],
    []
  );

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.includes(addon)
        ? prev.filter((x) => x !== addon)
        : [...prev, addon]
    );
  };

  return (
    <div className="px-2 pb-10">
      <h2 className="text-center text-4xl font-semibold text-[#D06050]">
        Choose Plan
      </h2>

      <div className="mt-5 flex justify-center">
        <Tabs
          value={cycle}
          onChange={setCycle}
          items={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ]}
        />
      </div>

      <Card className="mt-8 rounded-3xl p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setSelected(p.key)}
              className="text-left"
            >
              <PlanCard selected={selected === p.key} {...p} />
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            className="h-14 w-full max-w-180 rounded-2xl"
            onClick={() => setAddonsOpen(true)}
          >
            Continue with Free Starter
          </Button>
        </div>

        <div className="mt-3 text-center text-xs text-slate-400">
          You can upgrade anytime from settings.
        </div>
      </Card>

      <ModalBase
        open={addonsOpen}
        onClose={() => setAddonsOpen(false)}
        title="Choose Add-ons"
        className="max-w-155"
      >
        <div className="space-y-3">
          {addonOptions.map((x) => {
            const active = selectedAddons.includes(x);

            return (
              <button
                key={x}
                type="button"
                onClick={() => toggleAddon(x)}
                className={[
                  "flex h-14 w-full items-center justify-between rounded-2xl px-5 text-sm transition",
                  active
                    ? "border border-[#D06050] bg-[#FDF1EF] text-slate-900"
                    : "border border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200",
                ].join(" ")}
              >
                <span>{x}</span>

                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border transition",
                    active
                      ? "border-[#D06050] bg-[#D06050] text-white"
                      : "border-[#D06050] bg-white text-transparent",
                  ].join(" ")}
                >
                  <Check size={12} />
                </span>
              </button>
            );
          })}
        </div>

        <Button
          className="mt-6 h-14 w-full rounded-2xl"
          onClick={() => {
            setAddonsOpen(false);
            setPaymentOpen(true);
          }}
        >
          Continue to Payment
        </Button>
      </ModalBase>

      <ModalBase
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        title="Payment Method"
        className="max-w-155"
      >
        <div className="space-y-3">
          {paymentOptions.map((item) => {
            const active = selectedPayment === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSelectedPayment(item.key)}
                className={[
                  "flex h-14 w-full items-center justify-between rounded-2xl px-5 text-sm transition",
                  active
                    ? "border border-[#D06050] bg-[#FDF1EF] text-slate-900"
                    : "border border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                  />
                  <span>{item.label}</span>
                </div>

                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border transition",
                    active
                      ? "border-[#D06050] bg-[#D06050] text-white"
                      : "border-[#D06050] bg-white text-transparent",
                  ].join(" ")}
                >
                  <Check size={12} />
                </span>
              </button>
            );
          })}
        </div>

        <Button
          className="mt-6 h-14 w-full rounded-2xl"
          onClick={() => setPaymentOpen(false)}
        >
          Continue to Payment
        </Button>
      </ModalBase>
    </div>
  );
}