// PATH: src/mocks/handlers/auth.handlers.js
import { delay, http, HttpResponse } from "msw";
import { AUTH_FIXTURE } from "../db/fixtures/auth";

const LOGIN = /\/api\/auth\/login$/;
const SIGNUP = /\/api\/auth\/signup$/;
const FORGOT_PASSWORD = /\/api\/auth\/forgot-password$/;
const VERIFY_CODE = /\/api\/auth\/verify-code$/;
const RESEND_CODE = /\/api\/auth\/resend-code$/;
const SET_PASSWORD = /\/api\/auth\/set-password$/;
const LOGOUT = /\/api\/auth\/logout$/;
const ME = /\/api\/auth\/me$/;
const SELLER_VERIFICATION = /\/api\/onboarding\/seller-verification$/;

const state = {
  users: AUTH_FIXTURE.users.map((user) => ({ ...user })),
  pendingSignups: {},
  pendingPasswordResets: {},
};

function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function capitalize(value = "") {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function makeId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function makeToken(user) {
  return btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      sellerVerified: user.isSellerVerified,
      iat: Date.now(),
    })
  );
}

function parseTokenFromAuthHeader(authHeader = "") {
  const raw = String(authHeader || "");
  if (!raw.startsWith("Bearer ")) return null;

  const token = raw.slice(7).trim();
  if (!token) return null;

  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

function buildUserFromEmail(email, overrides = {}) {
  const normalized = normalizeEmail(email);
  const [localPart = "seller.owner"] = normalized.split("@");
  const nameParts = localPart.split(/[._-]+/).filter(Boolean);

  return {
    id: makeId("user"),
    firstName: capitalize(nameParts[0] || "Seller"),
    lastName: capitalize(nameParts[1] || "Owner"),
    email: normalized,
    phone: "",
    role: "seller",
    isSellerVerified: true,
    profileDescription: "",
    website: "",
    avatarFileName: "",
    ...overrides,
  };
}

function findUserByEmail(email) {
  const normalized = normalizeEmail(email);
  return state.users.find((user) => normalizeEmail(user.email) === normalized);
}

function upsertUser(nextUser) {
  const normalized = normalizeEmail(nextUser.email);
  const index = state.users.findIndex(
    (user) => normalizeEmail(user.email) === normalized
  );

  if (index === -1) {
    state.users.unshift(nextUser);
    return nextUser;
  }

  state.users[index] = {
    ...state.users[index],
    ...nextUser,
  };

  return state.users[index];
}

export const authHandlers = [
  http.post(LOGIN, async ({ request }) => {
    await delay(300);

    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body.email);
    const password = String(body.password || "").trim();

    if (!email || !password) {
      return HttpResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Seller portal repo:
    // any non-empty email/password should work for mock login.
    const existingUser = findUserByEmail(email);

    const user = upsertUser(
      existingUser
        ? existingUser
        : buildUserFromEmail(email, {
            role: "seller",
            isSellerVerified: true,
          })
    );

    return HttpResponse.json({
      message: "Login successful.",
      token: makeToken(user),
      user,
    });
  }),

  http.post(SIGNUP, async ({ request }) => {
    await delay(300);

    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body.email);
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const phone = String(body.phone || "").trim();
    const avatarFileName = String(body.avatarFileName || "").trim();

    if (!firstName || !lastName || !email || !phone || !avatarFileName) {
      return HttpResponse.json(
        { message: "All required signup fields must be filled." },
        { status: 400 }
      );
    }

    state.pendingSignups[email] = {
      firstName,
      lastName,
      email,
      phone,
      avatarFileName,
      role: "seller",
      code: AUTH_FIXTURE.defaultVerificationCode,
    };

    return HttpResponse.json({
      message: "Verification code sent successfully.",
      email,
      code: AUTH_FIXTURE.defaultVerificationCode,
    });
  }),

  http.post(FORGOT_PASSWORD, async ({ request }) => {
    await delay(300);

    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body.email);

    if (!email) {
      return HttpResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    state.pendingPasswordResets[email] = {
      email,
      code: AUTH_FIXTURE.defaultVerificationCode,
    };

    return HttpResponse.json({
      message: "Password reset code sent successfully.",
      email,
      code: AUTH_FIXTURE.defaultVerificationCode,
    });
  }),

  http.post(RESEND_CODE, async ({ request }) => {
    await delay(220);

    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body.email);

    if (!email) {
      return HttpResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    if (state.pendingSignups[email]) {
      state.pendingSignups[email].code = AUTH_FIXTURE.defaultVerificationCode;
    }

    if (state.pendingPasswordResets[email]) {
      state.pendingPasswordResets[email].code = AUTH_FIXTURE.defaultVerificationCode;
    }

    return HttpResponse.json({
      message: "A new verification code has been sent.",
      email,
      code: AUTH_FIXTURE.defaultVerificationCode,
    });
  }),

  http.post(VERIFY_CODE, async ({ request }) => {
    await delay(260);

    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body.email);
    const code = String(body.code || "").trim();

    if (!email || !code) {
      return HttpResponse.json(
        { message: "Email and code are required." },
        { status: 400 }
      );
    }

    // Mock flow:
    // any non-empty code is accepted.
    return HttpResponse.json({
      message: "Code verified successfully.",
      verified: true,
    });
  }),

  http.post(SET_PASSWORD, async ({ request }) => {
    await delay(320);

    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body.email);
    const password = String(body.password || "").trim();
    const confirmPassword = String(body.confirmPassword || "").trim();
    const flow = body.flow === "signup" ? "signup" : "forgot-password";

    if (!email || !password || !confirmPassword) {
      return HttpResponse.json(
        { message: "All password fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return HttpResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (flow === "signup") {
      const signupData = state.pendingSignups[email] || {
        firstName: "Seller",
        lastName: "Owner",
        email,
        phone: "",
        avatarFileName: "",
        role: "seller",
      };

      const existingUser = findUserByEmail(email);

      const user = upsertUser(
        existingUser
          ? {
              ...existingUser,
              ...signupData,
              role: "seller",
              isSellerVerified: false,
            }
          : buildUserFromEmail(email, {
              ...signupData,
              role: "seller",
              isSellerVerified: false,
            })
      );

      delete state.pendingSignups[email];

      return HttpResponse.json({
        message: "Password set successfully.",
        token: makeToken(user),
        user,
      });
    }

    delete state.pendingPasswordResets[email];

    return HttpResponse.json({
      message: "Password updated successfully.",
      success: true,
    });
  }),

  http.post(SELLER_VERIFICATION, async ({ request }) => {
    await delay(320);

    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body.email);
    const profileDescription = String(body.profileDescription || "").trim();
    const website = String(body.website || "").trim();
    const documentFileName = String(body.documentFileName || "").trim();

    if (!email || !profileDescription || !documentFileName) {
      return HttpResponse.json(
        {
          message:
            "Profile description and ID/registration document are required.",
        },
        { status: 400 }
      );
    }

    const existingUser = findUserByEmail(email);

    const user = upsertUser(
      existingUser
        ? {
            ...existingUser,
            role: "seller",
            isSellerVerified: true,
            profileDescription,
            website,
            verificationDocumentName: documentFileName,
          }
        : buildUserFromEmail(email, {
            role: "seller",
            isSellerVerified: true,
            profileDescription,
            website,
            verificationDocumentName: documentFileName,
          })
    );

    return HttpResponse.json({
      message: "Seller verification submitted successfully.",
      user,
    });
  }),

  http.post(LOGOUT, async () => {
    await delay(120);

    return HttpResponse.json({
      message: "Logout successful.",
      success: true,
    });
  }),

  http.get(ME, async ({ request }) => {
    await delay(120);

    const tokenPayload = parseTokenFromAuthHeader(
      request.headers.get("authorization")
    );

    if (!tokenPayload?.email) {
      return HttpResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const user = findUserByEmail(tokenPayload.email);

    if (!user) {
      return HttpResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      user,
    });
  }),
];