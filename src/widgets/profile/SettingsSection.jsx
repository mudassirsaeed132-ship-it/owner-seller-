export default function SettingsSection({ title, onApply, children }) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-[#D06050]">{title}</div>
        <button type="button" onClick={onApply} className="text-sm font-medium text-[#D06050] hover:underline">
          Apply
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}