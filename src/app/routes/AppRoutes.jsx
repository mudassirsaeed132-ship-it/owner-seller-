// PATH: src/app/routes/AppRoutes.jsx
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { lazy } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

import SellerShell from "../layout/SellerShell";
import AuthShell from "../layout/AuthShell";
import Lazy from "./Lazy";

import RequireAuth from "./guards/RequireAuth";
import RequireRole from "./guards/RequireRole";
import RequireSellerVerified from "./guards/RequireSellerVerified";
import { usePrefersReducedMotion } from "../../shared/hooks/usePrefersReducedMotion";
import { useAuthStore } from "../../features/auth/model/authStore";

// seller pages
const DashboardPage = lazy(() => import("../../pages/seller/DashboardPage"));
const ListingsPage = lazy(() => import("../../pages/seller/ListingsPage"));
const MessagesPage = lazy(() => import("../../pages/seller/MessagesPage"));
const CalendarPage = lazy(() => import("../../pages/seller/CalendarPage"));
const LeadsPage = lazy(() => import("../../pages/seller/LeadsPage"));

// wizard
const WizardLayout = lazy(() => import("../../pages/seller/listing-wizard/WizardLayout"));
const DetailsStep = lazy(() => import("../../pages/seller/listing-wizard/steps/DetailsStep"));
const LocationStep = lazy(() => import("../../pages/seller/listing-wizard/steps/LocationStep"));
const PricingStep = lazy(() => import("../../pages/seller/listing-wizard/steps/PricingStep"));
const ReviewStep = lazy(() => import("../../pages/seller/listing-wizard/steps/ReviewStep"));
const PlanStep = lazy(() => import("../../pages/seller/listing-wizard/steps/PlanStep"));

// profile
const ProfilePage = lazy(() => import("../../pages/seller/profile/ProfilePage"));
const EditProfilePage = lazy(() => import("../../pages/seller/profile/EditProfilePage"));
const PaymentsInvoicesPage = lazy(() => import("../../pages/seller/profile/PaymentsInvoicesPage"));
const DocumentsStatusPage = lazy(() => import("../../pages/seller/profile/DocumentsStatusPage"));

// privacy
const PrivacyControlsPage = lazy(() => import("../../pages/seller/privacy/PrivacyControlsPage"));

// auth
const RolePage = lazy(() => import("../../pages/auth/RolePage"));
const LoginPage = lazy(() => import("../../pages/auth/LoginPage"));
const SignupPage = lazy(() => import("../../pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("../../pages/auth/ForgotPasswordPage"));
const VerifyCodePage = lazy(() => import("../../pages/auth/VerifyCodePage"));
const SetPasswordPage = lazy(() => import("../../pages/auth/SetPasswordPage"));

// onboarding
const SellerVerificationPage = lazy(() =>
  import("../../pages/onboarding/SellerVerificationPage")
);

function PageWrap({ children }) {
  const reduce = usePrefersReducedMotion();

  return (
    <m.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={reduce ? false : { opacity: 1, y: 0 }}
      exit={reduce ? false : { opacity: 0, y: -10 }}
      transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

function HomeRedirect() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (!token || !user) {
    return <Navigate to="/auth/role" replace />;
  }

  if (!user.isSellerVerified) {
    return <Navigate to="/onboarding/seller-verification" replace />;
  }

  return <Navigate to="/seller" replace />;
}

function GuestOnly({ children }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const authFlow = useAuthStore((state) => state.authFlow);
  const { pathname } = useLocation();

  if (token && user) {
    if (
      authFlow === "signup" &&
      pathname === "/auth/verify-code" &&
      !user.isSellerVerified
    ) {
      return children;
    }

    if (!user.isSellerVerified) {
      return <Navigate to="/onboarding/seller-verification" replace />;
    }

    return <Navigate to="/seller" replace />;
  }

  return children;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeRedirect />} />

        <Route path="/auth" element={<AuthShell />}>
          <Route
            index
            element={
              <GuestOnly>
                <Lazy>
                  <PageWrap>
                    <Navigate to="/auth/role" replace />
                  </PageWrap>
                </Lazy>
              </GuestOnly>
            }
          />

          <Route
            path="role"
            element={
              <GuestOnly>
                <Lazy>
                  <PageWrap>
                    <RolePage />
                  </PageWrap>
                </Lazy>
              </GuestOnly>
            }
          />

          <Route
            path="login"
            element={
              <GuestOnly>
                <Lazy>
                  <PageWrap>
                    <LoginPage />
                  </PageWrap>
                </Lazy>
              </GuestOnly>
            }
          />

          <Route
            path="signup"
            element={
              <GuestOnly>
                <Lazy>
                  <PageWrap>
                    <SignupPage />
                  </PageWrap>
                </Lazy>
              </GuestOnly>
            }
          />

          <Route
            path="forgot-password"
            element={
              <GuestOnly>
                <Lazy>
                  <PageWrap>
                    <ForgotPasswordPage />
                  </PageWrap>
                </Lazy>
              </GuestOnly>
            }
          />

          <Route
            path="verify-code"
            element={
              <GuestOnly>
                <Lazy>
                  <PageWrap>
                    <VerifyCodePage />
                  </PageWrap>
                </Lazy>
              </GuestOnly>
            }
          />

          <Route
            path="set-password"
            element={
              <GuestOnly>
                <Lazy>
                  <PageWrap>
                    <SetPasswordPage />
                  </PageWrap>
                </Lazy>
              </GuestOnly>
            }
          />
        </Route>

        <Route
          path="/onboarding"
          element={
            <RequireAuth>
              <RequireRole role="seller">
                <AuthShell />
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route
            path="seller-verification"
            element={
              <Lazy>
                <PageWrap>
                  <SellerVerificationPage />
                </PageWrap>
              </Lazy>
            }
          />
        </Route>

        <Route
          path="/seller"
          element={
            <RequireAuth>
              <RequireRole role="seller">
                <RequireSellerVerified>
                  <SellerShell />
                </RequireSellerVerified>
              </RequireRole>
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <Lazy>
                <PageWrap>
                  <DashboardPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="dashboard"
            element={
              <Lazy>
                <PageWrap>
                  <DashboardPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="listings"
            element={
              <Lazy>
                <PageWrap>
                  <ListingsPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="messages"
            element={
              <Lazy>
                <PageWrap>
                  <MessagesPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="calendar"
            element={
              <Lazy>
                <PageWrap>
                  <CalendarPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="leads"
            element={
              <Lazy>
                <PageWrap>
                  <LeadsPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="profile"
            element={
              <Lazy>
                <PageWrap>
                  <ProfilePage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="profile/edit"
            element={
              <Lazy>
                <PageWrap>
                  <EditProfilePage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="profile/payments"
            element={
              <Lazy>
                <PageWrap>
                  <PaymentsInvoicesPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="profile/document-status"
            element={
              <Lazy>
                <PageWrap>
                  <DocumentsStatusPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="privacy"
            element={
              <Lazy>
                <PageWrap>
                  <PrivacyControlsPage />
                </PageWrap>
              </Lazy>
            }
          />

          <Route
            path="listings/new"
            element={
              <Lazy>
                <PageWrap>
                  <WizardLayout />
                </PageWrap>
              </Lazy>
            }
          >
            <Route index element={<Navigate to="details" replace />} />

            <Route
              path="details"
              element={
                <Lazy>
                  <PageWrap>
                    <DetailsStep />
                  </PageWrap>
                </Lazy>
              }
            />
            <Route
              path="location"
              element={
                <Lazy>
                  <PageWrap>
                    <LocationStep />
                  </PageWrap>
                </Lazy>
              }
            />
            <Route
              path="pricing"
              element={
                <Lazy>
                  <PageWrap>
                    <PricingStep />
                  </PageWrap>
                </Lazy>
              }
            />
            <Route
              path="review"
              element={
                <Lazy>
                  <PageWrap>
                    <ReviewStep />
                  </PageWrap>
                </Lazy>
              }
            />
            <Route
              path="plan"
              element={
                <Lazy>
                  <PageWrap>
                    <PlanStep />
                  </PageWrap>
                </Lazy>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/seller" replace />} />
        </Route>

        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LazyMotion features={domAnimation}>
        <AnimatedRoutes />
      </LazyMotion>
    </BrowserRouter>
  );
}
