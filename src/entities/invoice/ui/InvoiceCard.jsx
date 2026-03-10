import { useMemo } from "react";

export default function InvoiceCard({ invoice, onViewReceipt, onDownloadPdf }) {
  const amount = useMemo(() => `$${Number(invoice.amount || 0).toLocaleString()}`, [invoice.amount]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="px-6 pt-6 pb-4">
        <div className="text-center text-base font-semibold text-slate-900">{invoice.property}</div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="text-sm text-slate-700">Tenant: {invoice.tenant}</div>
            <div className="mt-2 text-sm text-[#D06050]">{invoice.paidLabel}</div>
          </div>

          <div className="flex flex-col items-end">
            <span className="rounded-lg bg-[#F6EAE8] px-3 py-1 text-xs font-medium text-[#D06050]">
              {invoice.statusPill}
            </span>
            <div className="mt-2 text-lg font-semibold text-[#D06050]">{amount}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-slate-200">
        <button
          type="button"
          onClick={onViewReceipt}
          className="h-12 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          View Reciept
        </button>
        <button
          type="button"
          onClick={onDownloadPdf}
          className="h-12 border-l border-slate-200 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
