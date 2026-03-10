// PATH: src/services/api/endpoints.js
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export const ENDPOINTS = {
  // seller app
  sellerDashboard: `${API_BASE_URL}/api/seller/dashboard`,
  sellerListings: `${API_BASE_URL}/api/seller/listings`,
  sellerPlans: `${API_BASE_URL}/api/seller/plans`,
  paymentMethods: `${API_BASE_URL}/api/seller/payment-methods`,
  checkout: `${API_BASE_URL}/api/seller/checkout`,
  sellerMessages: `${API_BASE_URL}/api/seller/messages`,
  sellerCalendar: `${API_BASE_URL}/api/seller/calendar`,
  sellerLeads: `${API_BASE_URL}/api/seller/leads`,
  sellerProfile: `${API_BASE_URL}/api/seller/profile`,

  // billing
  billingInvoices: `${API_BASE_URL}/api/seller/billing/invoices`,
  billingPaymentMethods: `${API_BASE_URL}/api/seller/billing/payment-methods`,
  billingSubscription: `${API_BASE_URL}/api/seller/billing/subscription`,
  billingInvoiceReceipt: (id) =>
    `${API_BASE_URL}/api/seller/billing/invoices/${id}/receipt`,
  billingInvoicePdf: (id) =>
    `${API_BASE_URL}/api/seller/billing/invoices/${id}/pdf`,

  // auth
  authLogin: `${API_BASE_URL}/api/auth/login`,
  authSignup: `${API_BASE_URL}/api/auth/signup`,
  authForgotPassword: `${API_BASE_URL}/api/auth/forgot-password`,
  authVerifyCode: `${API_BASE_URL}/api/auth/verify-code`,
  authResendCode: `${API_BASE_URL}/api/auth/resend-code`,
  authSetPassword: `${API_BASE_URL}/api/auth/set-password`,
  authLogout: `${API_BASE_URL}/api/auth/logout`,
  authMe: `${API_BASE_URL}/api/auth/me`,

  // onboarding
  sellerVerification: `${API_BASE_URL}/api/onboarding/seller-verification`,
};

export default ENDPOINTS;