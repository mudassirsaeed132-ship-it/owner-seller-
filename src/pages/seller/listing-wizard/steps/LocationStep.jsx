import Card from "../../../../shared/ui/Card";
import Button from "../../../../shared/ui/Button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BRAND = "#D06050";

export default function LocationStep() {
  const nav = useNavigate();

  return (
    <Card className="rounded-2xl border border-slate-100 bg-white p-8">
      <div className="text-base font-semibold text-slate-900">What’s the Location?</div>

      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <MapPin size={14} className={`text-[${BRAND}]`} />
        <span>Jl. Cisangkuy, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <div className="relative h-80 w-full">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f3f4f6_0%,#ffffff_55%,#f1f5f9_100%)]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className={`h-16 w-16 rounded-full border-4 border-[${BRAND}] bg-white shadow`} />
              <div className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[${BRAND}]`} />
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-white px-6 py-2 text-xs text-slate-600 shadow">
              Select on the map
            </div>
          </div>
        </div>
      </div>

      <Button className="mt-8 h-14 w-full rounded-2xl" onClick={() => nav("/seller/listings/new/pricing")}>
        Next
      </Button>
    </Card>
  );
}