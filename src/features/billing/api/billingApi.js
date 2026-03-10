import { ENDPOINTS } from "../../../services/api/endpoints";

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);
  return data;
}

export const billingApi = {
  invoices: () => request(ENDPOINTS.billingInvoices),
  receipt: (id) => request(ENDPOINTS.billingInvoiceReceipt(id)),
  pdf: (id) => request(ENDPOINTS.billingInvoicePdf(id)),

  paymentMethods: () => request(ENDPOINTS.billingPaymentMethods),
  setPrimaryMethod: (method) =>
    request(ENDPOINTS.billingPaymentMethods, { method: "POST", body: JSON.stringify({ method }) }),

  subscription: () => request(ENDPOINTS.billingSubscription),
};
