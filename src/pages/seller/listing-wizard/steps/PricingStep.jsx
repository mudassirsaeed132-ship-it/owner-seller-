import Card from "../../../../shared/ui/Card";
import Button from "../../../../shared/ui/Button";
import Input from "../../../../shared/ui/Input";
import Textarea from "../../../../shared/ui/Textarea";
import Tabs from "../../../../shared/ui/Tabs";
import CounterInput from "../../../../shared/ui/CounterInput";
import DateInput from "../../../../shared/ui/DateInput";
import { useNavigate } from "react-router-dom";

export default function PricingStep() {
  const nav = useNavigate();

  return (
    <Card className="rounded-2xl border border-slate-100 bg-white p-8">
      <div className="space-y-5">
        <div>
          <div className="text-sm font-semibold text-slate-900">Sell Price</div>
          <div className="mt-2">
            <Input defaultValue="$180,000" />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">Rent Price</div>
          <div className="mt-2">
            <Input defaultValue="$3000/Month" />
          </div>
          <div className="mt-3">
            <Tabs
              value="monthly"
              onChange={() => {}}
              items={[
                { value: "monthly", label: "Monthly" },
                { value: "night", label: "Per Night" },
              ]}
            />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">Size</div>
          <div className="mt-2">
            <Input defaultValue="1250 sq feet" />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">Property Features</div>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <CounterInput label="Rooms" value={3} onChange={() => {}} />
            <CounterInput label="Bathroom" value={3} onChange={() => {}} />
            <DateInput placeholder="Available from" />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">Description</div>
          <div className="mt-2">
            <Textarea
              rows={3}
              defaultValue="Welcome to your dream home! This elegant two-story residence offers timeless architecture and modern comfort, nestled in a serene neighborhood surrounded by mature trees and lush greenery"
            />
          </div>
        </div>
      </div>

      <Button className="mt-8 h-14 w-full rounded-2xl" onClick={() => nav("/seller/listings/new/review")}>
        Next
      </Button>
    </Card>
  );
}