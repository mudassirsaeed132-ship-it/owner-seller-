import { useMemo, useState } from "react";
import Card from "../../../../shared/ui/Card";
import Button from "../../../../shared/ui/Button";
import ModalBase from "../../../../shared/ui/ModalBase";
import { Check, X } from "lucide-react";
import logo from "../../../../assets/images/auth/auth-logo.png";

const BRAND = "#D06050";
const SUCCESS = "#22C55E";

function BillingToggle({ value, onChange }) {
  const options = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-[18px] border border-[#D06050] bg-white p-1">
        {options.map((item) => {
          const active = item.value === value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={[
                "min-w-[96px] rounded-[14px] px-5 py-3 text-[14px] font-semibold transition sm:min-w-[104px]",
                active ? "text-white" : "text-slate-600 hover:bg-slate-50",
              ].join(" ")}
              style={active ? { backgroundColor: BRAND } : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeatureRow({ children, disabled = false }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center"
        style={{ color: disabled ? BRAND : SUCCESS }}
      >
        {disabled ? <X size={15} strokeWidth={2.2} /> : <Check size={15} strokeWidth={2.4} />}
      </span>

      <span className={disabled ? "text-slate-500" : "text-slate-800"}>{children}</span>
    </li>
  );
}

function SelectedBadge() {
  return (
    <div
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white"
      style={{ backgroundColor: BRAND }}
      aria-hidden="true"
    >
      <Check size={16} strokeWidth={2.8} />
    </div>
  );
}

function PlanCard({
  selected,
  titleTop,
  title,
  price,
  introText,
  bullets,
  disabledBullets,
  onSelect,
}) {
  return (
    <button type="button" onClick={onSelect} className="block w-full text-left">
      <Card
        className={[
          "overflow-hidden rounded-[26px] bg-white p-0 transition",
          selected
            ? "border-2 border-[#D06050] shadow-[0_18px_40px_rgba(208,96,80,0.08)]"
            : "border border-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.06)]",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4 bg-[#F6EAE8] px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase leading-4 text-slate-700">
              {titleTop}
            </div>
            <div className="mt-1 text-[20px] font-semibold leading-none text-slate-900">
              {title}
            </div>
          </div>

          <img
            src={logo}
            alt="Real Estate"
            className="h-10 w-auto shrink-0 sm:h-11"
            loading="lazy"
            draggable={false}
          />
        </div>

        <div className="px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[24px] font-semibold leading-none text-slate-900 sm:text-[28px]">
              {price}
            </div>
            {selected ? <SelectedBadge /> : <div className="h-8 w-8 shrink-0" />}
          </div>

          <div className="mt-4 text-[13px] leading-6 text-slate-700">{introText}</div>

          <ul className="mt-4 space-y-2.5 text-[14px] leading-7 sm:text-[15px]">
            {bullets.map((item) => (
              <FeatureRow key={item}>{item}</FeatureRow>
            ))}
          </ul>

          {disabledBullets?.length ? (
            <>
              <div className="mt-4 h-px w-full bg-slate-200" />
              <ul className="mt-4 space-y-2.5 text-[14px] leading-7 sm:text-[15px]">
                {disabledBullets.map((item) => (
                  <FeatureRow key={item} disabled>
                    {item}
                  </FeatureRow>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </Card>
    </button>
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
        title: "FREE",
        price: "Free",
        introText: "Includes Access To:",
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
        price: cycle === "yearly" ? "$29.99/yr" : "$2.99/mo",
        introText: "Includes everything in FREE, plus:",
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
        price: cycle === "yearly" ? "$99.99/yr" : "$9.99/mo",
        introText: "Includes everything in PRO, plus ability to:",
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
    [cycle]
  );

  const addonOptions = useMemo(
    () => ["Featured Listing", "Boosts", "Extra Photos", "AI Factsheets"],
    []
  );

  const paymentOptions = useMemo(
    () => [
      { key: "gpay", label: "Pay with Google Pay", icon: "/images/icons/g-pay.svg" },
      { key: "stripe", label: "Pay with Stripe", icon: "/images/icons/stripe.svg" },
      { key: "apple", label: "Pay with Apple pay", icon: "/images/icons/apple.svg" },
    ],
    []
  );

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((x) => x !== addon) : [...prev, addon]
    );
  };

  const continueLabel =
    selected === "pro"
      ? "Continue with Pro"
      : selected === "partner"
      ? "Continue with Partner"
      : "Continue with Free Starter";

  return (
    <div className="mx-auto w-full max-w-[1280px] px-1 pb-8 sm:px-0 sm:pb-10">
      <h2 className="text-center text-[32px] font-semibold text-[#D06050] sm:text-[40px]">
        Choose Plan
      </h2>

      <Card className="mt-6 rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:mt-8 sm:p-6 lg:p-8 xl:p-10">
        <BillingToggle value={cycle} onChange={setCycle} />

        <div className="mt-8 grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.key}
              selected={selected === plan.key}
              titleTop={plan.titleTop}
              title={plan.title}
              price={plan.price}
              introText={plan.introText}
              bullets={plan.bullets}
              disabledBullets={plan.disabledBullets}
              onSelect={() => setSelected(plan.key)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            className="h-13 w-full max-w-160 rounded-2xl text-[16px] font-semibold sm:h-14"
            onClick={() => setAddonsOpen(true)}
          >
            {continueLabel}
          </Button>
        </div>

        <div className="mt-3 text-center text-xs text-slate-400 sm:text-[13px]">
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
          {addonOptions.map((item) => {
            const active = selectedAddons.includes(item);

            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleAddon(item)}
                className={[
                  "flex h-14 w-full items-center justify-between rounded-2xl px-5 text-sm transition",
                  active
                    ? "border border-[#D06050] bg-[#FDF1EF] text-slate-900"
                    : "border border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200",
                ].join(" ")}
              >
                <span>{item}</span>

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