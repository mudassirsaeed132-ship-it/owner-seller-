import Card from "../../shared/ui/Card";

export default function ProfileCardLayout({ left, children, className = "" }) {
  return (
    <Card
      className={[
        "rounded-2xl border border-slate-200 bg-white",
        "px-6 py-8 sm:px-10 sm:py-10",
        className,
      ].join(" ")}
    >
      <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
        <div className="flex flex-col items-center lg:items-start">{left}</div>
        <div className="min-w-0">{children}</div>
      </div>
    </Card>
  );
}
