import Button from "./Button";

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-10 text-center shadow-card">
      <div className="text-lg font-extrabold">{title}</div>
      <div className="mt-2 max-w-sm text-sm text-muted">{message}</div>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
