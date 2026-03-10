import ListingPreviewRow from "../../entities/listing/ui/ListingPreviewRow";

export default function RecommendedList({ items = [], onSeeAll }) {
  return (
    <section className="flex flex-col">
      {/* ✅ heading row like Figma */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">Recommended Properties</div>
        <button type="button" onClick={onSeeAll} className="text-xs font-medium text-[#D06050] hover:underline">
          See all
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((it) => (
          <ListingPreviewRow key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
}