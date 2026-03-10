import { useMemo, useState } from "react";
import Card from "../../../../shared/ui/Card";
import Button from "../../../../shared/ui/Button";
import Tabs from "../../../../shared/ui/Tabs";
import ModalBase from "../../../../shared/ui/ModalBase";
import { Check } from "lucide-react";
import logo from "../../../../assets/icons/logo/real-estate-logo.png";

const BRAND = "#D06050";

function PlanCard({ selected, titleTop, title, price, bullets, disabledBullets }) {
  return (
    <Card
      className={[
        "rounded-2xl p-0 overflow-hidden",
        selected ? `border-2 border-[${BRAND}]` : "border border-slate-200",
      ].join(" ")}
    >
      <div className="flex items-start justify-between bg-[#F6EAE8] px-5 py-4">
        <div>
          <div className="text-[11px] font-semibold text-slate-600 uppercase">{titleTop}</div>
          <div className="text-lg font-semibold text-slate-900">{title}</div>
        </div>
        <img src={logo} alt="" className="h-8 w-auto opacity-90" />
      </div>

      <div className="px-5 py-5">
        <div className="text-2xl font-semibold text-slate-900">{price}</div>

        <div className="mt-4 text-xs text-slate-600">Includes everything in {title === "Free" ? "FREE" : "FREE"}, plus:</div>

        <ul className="mt-4 space-y-2 text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Check size={18} className="mt-[2px] text-emerald-500" />
              <span className="text-slate-700">{b}</span>
            </li>
          ))}
        </ul>

        {disabledBullets?.length ? (
          <ul className="mt-4 space-y-2 text-sm">
            {disabledBullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-slate-400">
                <span className="mt-[6px] inline-block h-[2px] w-[10px] bg-slate-300" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {selected ? (
          <div className={`mt-5 flex justify-end`}>
            <div className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-[${BRAND}] text-white`}>
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
        disabledBullets: ["AI price valuation", "AI factsheet PDF", "Booking calendar", "Short-term rent feature", "Financial dashboard"],
      },
      {
        key: "pro",
        titleTop: "PLAYER & FAN +",
        title: "PRO",
        price: "$2.99/mo",
        bullets: ["AI Chatbot Access", "Tournament & Tryout Tracker", "Event Reminders & Notifications", "Calendar Invites", "Advanced Filters & Search"],
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

  return (
    <div className="px-2 pb-10">
      <h2 className={`text-center text-4xl font-semibold text-[${BRAND}]`}>Choose Plan</h2>

      <div className="mt-6 flex justify-center">
        <Tabs
          value={cycle}
          onChange={setCycle}
          items={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ]}
        />
      </div>

      <Card className="mt-10 rounded-3xl p-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((p) => (
            <button key={p.key} type="button" onClick={() => setSelected(p.key)} className="text-left">
              <PlanCard selected={selected === p.key} {...p} />
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button className="h-14 w-full max-w-[720px] rounded-2xl" onClick={() => setAddonsOpen(true)}>
            Continue with Free Starter
          </Button>
        </div>

        <div className="mt-3 text-center text-xs text-slate-400">You can upgrade anytime from settings.</div>
      </Card>

      {/* Add-ons modal */}
      <ModalBase open={addonsOpen} onClose={() => setAddonsOpen(false)} title="Choose Add-ons" className="max-w-[900px]">
        <div className="space-y-4">
          {["Featured Listing", "Boosts", "Extra Photos", "AI Factsheets"].map((x) => (
            <button
              key={x}
              type="button"
              className="flex h-14 w-full items-center justify-between rounded-2xl bg-slate-100 px-6 text-sm text-slate-700"
            >
              <span>{x}</span>
              <span className={`h-4 w-4 rounded-full border border-[${BRAND}]`} />
            </button>
          ))}
        </div>

        <Button
          className="mt-8 h-14 w-full rounded-2xl"
          onClick={() => {
            setAddonsOpen(false);
            setPaymentOpen(true);
          }}
        >
          Continue to Payment
        </Button>
      </ModalBase>

      {/* Payment modal */}
      <ModalBase open={paymentOpen} onClose={() => setPaymentOpen(false)} title="Payment Method" className="max-w-[900px]">
        <div className="space-y-4">
          {["Pay with Google Pay", "Pay with Stripe", "Pay with Apple pay"].map((x) => (
            <button key={x} type="button" className="flex h-14 w-full items-center rounded-2xl bg-slate-100 px-6 text-sm text-slate-700">
              {x}
            </button>
          ))}
        </div>

        <Button className="mt-8 h-14 w-full rounded-2xl" onClick={() => setPaymentOpen(false)}>
          Continue to Payment
        </Button>
      </ModalBase>
    </div>
  );
}