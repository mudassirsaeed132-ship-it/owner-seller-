import { ArrowLeft, X } from "lucide-react";

export default function ChatHeader({ name, avatar, onClose, showBack = false }) {
  return (
    <div className="flex h-[64px] items-center justify-between border-b border-slate-200 px-6">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
        ) : null}

        <img src={avatar} alt="" className="h-8 w-8 rounded-full object-cover" loading="lazy" />
        <div className="text-sm font-semibold text-slate-900">{name}</div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
        aria-label="Close"
      >
        <X size={22} />
      </button>
    </div>
  );
}
