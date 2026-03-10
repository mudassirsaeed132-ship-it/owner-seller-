import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { Upload } from "lucide-react";
import InvoiceCard from "../../entities/invoice/ui/InvoiceCard";
import Skeleton from "../../shared/ui/Skeleton";

const ReceiptModal = lazy(() => import("./ReceiptModal"));
const PdfViewerModal = lazy(() => import("./PdfViewerModal"));

export default function InvoiceGrid({ invoices = [] }) {
  const fileRef = useRef(null);

  const [receiptId, setReceiptId] = useState(null);
  const [pdfId, setPdfId] = useState(null);

  const items = useMemo(() => invoices || [], [invoices]);

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          <Upload size={18} className="text-slate-500" />
          Import Bank CSV
        </button>
        <input ref={fileRef} type="file" accept=".csv" className="hidden" />
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((inv) => (
          <InvoiceCard
            key={inv.id}
            invoice={inv}
            onViewReceipt={() => setReceiptId(inv.id)}
            onDownloadPdf={() => setPdfId(inv.id)}
          />
        ))}
      </div>

      <Suspense fallback={<Skeleton className="mt-8 h-[180px] rounded-2xl" />}>
        <ReceiptModal open={Boolean(receiptId)} invoiceId={receiptId} onClose={() => setReceiptId(null)} />
      </Suspense>

      <Suspense fallback={<Skeleton className="mt-8 h-[180px] rounded-2xl" />}>
        <PdfViewerModal open={Boolean(pdfId)} invoiceId={pdfId} onClose={() => setPdfId(null)} />
      </Suspense>
    </div>
  );
}