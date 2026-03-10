// src/pages/seller/profile/DocumentsStatusPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronLeft, Upload } from "lucide-react";

import { cn } from "../../../shared/lib/cn";

const ACCENT = "#D06050";

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function onDown(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onOutside?.();
    }
    document.addEventListener("mousedown", onDown, true);
    return () => document.removeEventListener("mousedown", onDown, true);
  }, [ref, onOutside]);
}

function TopPill({ label, open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={cn(
        // ✅ IMPORTANT: no fixed width — fit-content like Figma
        "inline-flex w-auto items-center gap-2 rounded-xl border border-slate-200 bg-white px-5",
        "h-[44px] text-[14px] font-medium",
        "shadow-[0_1px_0_rgba(15,23,42,0.02)]"
      )}
      style={{ color: ACCENT }}
    >
      <span className="leading-none">{label}</span>
      <ChevronDown size={18} style={{ color: ACCENT }} />
    </button>
  );
}

function StatusBadge({ variant, children }) {
  if (variant === "verified") {
    return (
      <span
        className="inline-flex items-center rounded-lg px-4 py-2 text-[13px] font-medium"
        style={{ background: "#F6EAE8", color: ACCENT }}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center rounded-lg border px-4 py-2 text-[13px] font-medium"
      style={{ borderColor: ACCENT, color: ACCENT, background: "transparent" }}
    >
      {children}
    </span>
  );
}

function UploadRow({ title, subtitle, onUpload }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-[18px]">
      <div className="min-w-0">
        <div className="truncate text-[16px] font-medium text-slate-900">{title}</div>
        <div className="mt-1 truncate text-[14px] text-slate-500">{subtitle}</div>
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="ml-6 inline-flex h-[40px] w-[40px] items-center justify-center rounded-xl border border-slate-200 bg-white"
        aria-label={`Upload ${title}`}
      >
        <Upload size={18} className="text-slate-900" />
      </button>
    </div>
  );
}

function StatusRow({ title, subtitle, status }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-[18px]">
      <div className="min-w-0">
        <div className="truncate text-[16px] font-medium text-slate-900">{title}</div>
        <div className="mt-1 truncate text-[14px] text-slate-500">{subtitle}</div>
      </div>

      <div className="ml-6">
        {status === "verified" ? (
          <StatusBadge variant="verified">Verified</StatusBadge>
        ) : (
          <StatusBadge variant="pending">Pending</StatusBadge>
        )}
      </div>
    </div>
  );
}

export default function DocumentsStatusPage() {
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();

  const initialTab = sp.get("tab") === "status" ? "status" : "uploads";
  const [tab, setTab] = useState(initialTab);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  useEffect(() => {
    // keep URL synced
    const q = sp.get("tab");
    if ((q === "status" || q === "uploads") && q !== tab) setTab(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const uploads = useMemo(
    () => [
      { id: "passport", title: "Passport", subtitle: "ID Document" },
      { id: "poa", title: "proof of Address", subtitle: "Utility Bill" },
      { id: "bank", title: "Bank Statement", subtitle: "Financial" },
      { id: "employment", title: "Employment Contract", subtitle: "Legal" },
    ],
    []
  );

  const statuses = useMemo(
    () => [
      { id: "idv", title: "Identity Verified", subtitle: "ID Document approved on Dec15, 2025", status: "verified" },
      { id: "poav", title: "Proof Of Address", subtitle: "Utility Bill approved Jan 12, 2026", status: "verified" },
      { id: "bankp", title: "Bank Statement", subtitle: "Utility Bill approved Jan 12, 2026", status: "pending" },
    ],
    []
  );

  // ✅ Figma flow: status screen title is different
  const pageTitle = tab === "uploads" ? "Documents & Status" : "Payment & Invoices";
  const pillLabel = tab === "uploads" ? "Uploads" : "Status";

  function switchTab(next) {
    setTab(next);
    setMenuOpen(false);
    const nextSp = new URLSearchParams(sp);
    nextSp.set("tab", next);
    setSp(nextSp, { replace: true });
  }

  return (
    <div className="w-full bg-[#F6F6F6]">
      <div className="mx-auto w-full max-w-[1220px] px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="inline-flex items-center gap-3"
            aria-label="Go back"
          >
            <ChevronLeft size={28} style={{ color: ACCENT }} />
            <h1 className="text-[34px] font-semibold leading-[1.1]" style={{ color: ACCENT }}>
              {pageTitle}
            </h1>
          </button>

          {/* ✅ top-right pill (short like UI) */}
          <div className="relative" ref={menuRef}>
            <TopPill label={pillLabel} open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />

            {menuOpen ? (
              <div className="absolute right-0 top-[52px] z-20 w-[180px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                <button
                  type="button"
                  onClick={() => switchTab("uploads")}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-[14px]",
                    tab === "uploads" ? "bg-slate-50" : "bg-white"
                  )}
                >
                  <span className="font-medium text-slate-900">Uploads</span>
                </button>
                <button
                  type="button"
                  onClick={() => switchTab("status")}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-[14px]",
                    tab === "status" ? "bg-slate-50" : "bg-white"
                  )}
                >
                  <span className="font-medium text-slate-900">Status</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Card */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/60 p-4 sm:p-6">
          {tab === "uploads" ? (
            <>
              <div className="px-2">
                <div className="text-[16px] font-semibold text-slate-900">Document Visibility</div>
                <div className="mt-2 text-[14px] text-slate-500">
                  Control who can access each of your Documents
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {uploads.map((d) => (
                  <UploadRow key={d.id} title={d.title} subtitle={d.subtitle} onUpload={() => {}} />
                ))}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="h-[62px] w-full rounded-2xl text-[15px] font-semibold text-white"
                  style={{ background: ACCENT }}
                >
                  Add Payment Method
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-2">
                <div className="text-[16px] font-semibold text-slate-900">Verification Status</div>
              </div>

              <div className="mt-6 space-y-5">
                {statuses.map((s) => (
                  <StatusRow key={s.id} title={s.title} subtitle={s.subtitle} status={s.status} />
                ))}
              </div>

              {/* ✅ keep bottom spacing like UI */}
              <div className="h-6" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}