// PATH: src/app/routes/AppRoutes.jsx
import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
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
const PaymentsInvoicesPage = lazy(() =>
  import("../../pages/seller/profile/PaymentsInvoicesPage")
);
const DocumentsStatusPage = lazy(() =>
  import("../../pages/seller/profile/DocumentsStatusPage")
);

// privacy
const PrivacyControlsPage = lazy(() =>
  import("../../pages/seller/privacy/PrivacyControlsPage")
);

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

const ROUTER_FUTURE_FLAGS = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

const ROUTES = {
  home: "/",

  authRoot: "/auth",
  authRole: "/auth/role",
  authLogin: "/auth/login",
  authSignup: "/auth/signup",
  authForgotPassword: "/auth/forgot-password",
  authVerifyCode: "/auth/verify-code",
  authSetPassword: "/auth/set-password",

  onboardingRoot: "/onboarding",
  onboardingSellerVerification: "/onboarding/seller-verification",

  sellerRoot: "/seller",
  sellerDashboard: "/seller/dashboard",
  sellerListings: "/seller/listings",
  sellerMessages: "/seller/messages",
  sellerCalendar: "/seller/calendar",
  sellerLeads: "/seller/leads",
  sellerProfile: "/seller/profile",
  sellerProfileEdit: "/seller/profile/edit",
  sellerProfilePayments: "/seller/profile/payments",
  sellerProfileDocumentStatus: "/seller/profile/document-status",
  sellerPrivacy: "/seller/privacy",
  sellerListingsNew: "/seller/listings/new",
};

const AUTH_ROUTE_DEFINITIONS = [
  { path: "role", Component: RolePage },
  { path: "login", Component: LoginPage },
  { path: "signup", Component: SignupPage },
  { path: "forgot-password", Component: ForgotPasswordPage },
  { path: "verify-code", Component: VerifyCodePage },
  { path: "set-password", Component: SetPasswordPage },
];

const SELLER_ROUTE_DEFINITIONS = [
  { index: true, key: "seller-index", Component: DashboardPage },
  { path: "dashboard", Component: DashboardPage },
  { path: "listings", Component: ListingsPage },
  { path: "messages", Component: MessagesPage },
  { path: "calendar", Component: CalendarPage },
  { path: "leads", Component: LeadsPage },
  { path: "profile", Component: ProfilePage },
  { path: "profile/edit", Component: EditProfilePage },
  { path: "profile/payments", Component: PaymentsInvoicesPage },
  { path: "profile/document-status", Component: DocumentsStatusPage },
  { path: "privacy", Component: PrivacyControlsPage },
];

const WIZARD_ROUTE_DEFINITIONS = [
  { path: "details", Component: DetailsStep },
  { path: "location", Component: LocationStep },
  { path: "pricing", Component: PricingStep },
  { path: "review", Component: ReviewStep },
  { path: "plan", Component: PlanStep },
];

function PageWrap({ children }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <m.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? false : { opacity: 1, y: 0 }}
      exit={reduceMotion ? false : { opacity: 0, y: -10 }}
      transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

function withPageShell(node) {
  return (
    <Lazy>
      <PageWrap>{node}</PageWrap>
    </Lazy>
  );
}

function renderPage(Component) {
  return withPageShell(<Component />);
}

function renderGuestPage(Component) {
  return <GuestOnly>{renderPage(Component)}</GuestOnly>;
}

function HomeRedirect() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const isAuthenticated = Boolean(token && user);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.authRole} replace />;
  }

  if (!user.isSellerVerified) {
    return <Navigate to={ROUTES.onboardingSellerVerification} replace />;
  }

  return <Navigate to={ROUTES.sellerRoot} replace />;
}

function GuestOnly({ children }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const authFlow = useAuthStore((state) => state.authFlow);
  const { pathname } = useLocation();

  const isAuthenticated = Boolean(token && user);
  const needsSellerVerification = Boolean(isAuthenticated && !user.isSellerVerified);
  const allowSignupVerifyStep =
    authFlow === "signup" &&
    pathname === ROUTES.authVerifyCode &&
    needsSellerVerification;

  if (!isAuthenticated) {
    return children;
  }

  if (allowSignupVerifyStep) {
    return children;
  }

  if (needsSellerVerification) {
    return <Navigate to={ROUTES.onboardingSellerVerification} replace />;
  }

  return <Navigate to={ROUTES.sellerRoot} replace />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.home} element={<HomeRedirect />} />

        <Route path={ROUTES.authRoot} element={<AuthShell />}>
          <Route
            index
            element={
              <GuestOnly>
                {withPageShell(<Navigate to={ROUTES.authRole} replace />)}
              </GuestOnly>
            }
          />

          {AUTH_ROUTE_DEFINITIONS.map(({ path, Component }) => (
            <Route key={path} path={path} element={renderGuestPage(Component)} />
          ))}
        </Route>

        <Route
          path={ROUTES.onboardingRoot}
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
            element={renderPage(SellerVerificationPage)}
          />
        </Route>

        <Route
          path={ROUTES.sellerRoot}
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
          {SELLER_ROUTE_DEFINITIONS.map(({ index, key, path, Component }) =>
            index ? (
              <Route key={key} index element={renderPage(Component)} />
            ) : (
              <Route key={path} path={path} element={renderPage(Component)} />
            )
          )}

          <Route path="listings/new" element={renderPage(WizardLayout)}>
            <Route index element={<Navigate to="details" replace />} />

            {WIZARD_ROUTE_DEFINITIONS.map(({ path, Component }) => (
              <Route key={path} path={path} element={renderPage(Component)} />
            ))}
          </Route>

          <Route path="*" element={<Navigate to={ROUTES.sellerRoot} replace />} />
        </Route>

        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter future={ROUTER_FUTURE_FLAGS}>
      <LazyMotion features={domAnimation}>
        <AnimatedRoutes />
      </LazyMotion>
    </BrowserRouter>
  );
}
