// PATH: src/features/auth/api/authApi.js
import { useAuthStore } from "../model/authStore";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export const authApi = {
  login(payload) {
    return request("/api/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  signup(payload) {
    return request("/api/auth/signup", {
      method: "POST",
      body: payload,
    });
  },

  forgotPassword(payload) {
    return request("/api/auth/forgot-password", {
      method: "POST",
      body: payload,
    });
  },

  verifyCode(payload) {
    return request("/api/auth/verify-code", {
      method: "POST",
      body: payload,
    });
  },

  resendCode(payload) {
    return request("/api/auth/resend-code", {
      method: "POST",
      body: payload,
    });
  },

  setPassword(payload) {
    return request("/api/auth/set-password", {
      method: "POST",
      body: payload,
    });
  },

  sellerVerification(payload) {
    return request("/api/onboarding/seller-verification", {
      method: "POST",
      body: payload,
    });
  },

  logout() {
    return request("/api/auth/logout", {
      method: "POST",
    });
  },

  me() {
    return request("/api/auth/me");
  },
};

export default authApi;