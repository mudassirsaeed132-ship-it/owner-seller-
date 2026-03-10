import Card from "../../shared/ui/Card";

export default function QuickActions({ items = [] }) {
  return (
    <section className="mt-6">
      <div className="mb-4 text-sm font-medium text-slate-800">Quick Actions</div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <Card
            key={it.key}
            className="flex h-35 items-center justify-center rounded-2xl border border-[#D06050] bg-white shadow-none"
          >
            <button type="button" onClick={it.onClick} className="flex flex-col items-center gap-3">
              <img src={it.icon} alt="" className="h-12 w-12" loading="lazy" />
              <div className="text-sm font-medium text-slate-900">{it.label}</div>
            </button>
          </Card>
        ))}
      </div>
    </section>
  );
}