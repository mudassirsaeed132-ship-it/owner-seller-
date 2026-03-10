export default function RouteFallback() {
  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="h-6 w-56 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[130px] animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
        <div className="mt-8 h-[220px] animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}