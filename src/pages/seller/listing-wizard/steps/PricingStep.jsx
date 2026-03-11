import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../../shared/ui/Card";
import Button from "../../../../shared/ui/Button";
import CounterInput from "../../../../shared/ui/CounterInput";
import DateInput from "../../../../shared/ui/DateInput";

const BRAND = "#D06050";

function ModeButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-10 items-center justify-center rounded-2xl px-4 text-[15px] font-medium transition sm:px-5",
        active
          ? "text-white"
          : "bg-[#F4F4F4] text-slate-700 hover:bg-[#EEEEEE]",
      ].join(" ")}
      style={active ? { backgroundColor: BRAND } : undefined}
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="text-[15px] font-semibold text-slate-900">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function TextField({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
    />
  );
}

export default function PricingStep() {
  const nav = useNavigate();

  const [sellPrice, setSellPrice] = useState("$180,000");
  const [rentPrice, setRentPrice] = useState("$3000/Month");
  const [rentMode, setRentMode] = useState("monthly");
  const [size, setSize] = useState("1250 sq feet");
  const [rooms, setRooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(3);
  const [availableFrom, setAvailableFrom] = useState("");
  const [description, setDescription] = useState(
    "Welcome to your dream home! This elegant two-story residence offers timeless architecture and modern comfort, nestled in a serene neighborhood surrounded by mature trees and lush greenery"
  );

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8">
      <div className="space-y-5 sm:space-y-6">
        <Field label="Sell Price">
          <TextField
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            placeholder="$180,000"
          />
        </Field>

        <Field label="Rent Price">
          <TextField
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            placeholder="$3000/Month"
          />

          <div className="mt-3 flex flex-wrap gap-2.5">
            <ModeButton
              active={rentMode === "monthly"}
              onClick={() => setRentMode("monthly")}
            >
              Monthly
            </ModeButton>

            <ModeButton
              active={rentMode === "night"}
              onClick={() => setRentMode("night")}
            >
              Per Night
            </ModeButton>
          </div>
        </Field>

        <Field label="Size">
          <TextField
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="1250 sq feet"
          />
        </Field>

        <Field label="Property Features">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <CounterInput
              label="Rooms"
              value={rooms}
              onChange={setRooms}
            />

            <CounterInput
              label="Bathroom"
              value={bathrooms}
              onChange={setBathrooms}
            />

            <DateInput
              placeholder="Available from"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              className="md:col-span-2 xl:col-span-1"
            />
          </div>
        </Field>

        <Field label="Description">
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] leading-7 text-slate-700 outline-none placeholder:text-slate-400"
          />
        </Field>
      </div>

      <Button
        className="mt-6 h-12 w-full rounded-2xl text-[16px] font-semibold sm:mt-8 sm:h-14"
        onClick={() => nav("/seller/listings/new/review")}
      >
        Next
      </Button>
    </Card>
  );
}