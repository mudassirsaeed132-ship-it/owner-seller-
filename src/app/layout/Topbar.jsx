// PATH: src/app/layout/Topbar.jsx
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  MessageCircle,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

import Button from "../../shared/ui/Button";
import { cn } from "../../shared/lib/cn";
import usePrefersReducedMotion from "../../shared/hooks/usePrefersReducedMotion";
import { authApi } from "../../features/auth/api/authApi";
import { useAuthStore } from "../../features/auth/model/authStore";

import profileAvatar from "../../assets/images/profile/Benjamin Franklyn.svg";
import logo from "../../assets/icons/logo/real-estate-logo.png";

const ROUTES = {
  sellerHome: "/seller",
  sellerProfile: "/seller/profile",
  sellerPrivacy: "/seller/privacy",
  sellerMessages: "/seller/messages",
  sellerNewListing: "/seller/listings/new/details",
};

const COPY = {
  desktopSearchPlaceholder: "Search properties, buyers, and listings...",
  mobileSearchPlaceholder: "Search properties...",
  searchButtonLabel: "Search",
  filtersLabel: "Filters",
  favoritesLabel: "Favorites",
  notificationsLabel: "Notifications",
  messagesLabel: "Messages",
  openNavigationLabel: "Open navigation",
  openProfileMenuLabel: "Open profile menu",
  goToProfileLabel: "Go to profile",
  goToSellerHomeLabel: "Go to seller home",
  addListingLabel: "Add listing",
  addListingText: "ADD LISTING",
  privacyControls: "Privacy controls",
  logout: "Logout",
  loggingOut: "Logging out...",
  viewPublicProfile: "View Public Profile",
};

function useOutsideClick(ref, handler, when = true) {
  useEffect(() => {
    if (!when) return;

    const onPointerDown = (event) => {
      const element = ref.current;
      if (!element) return;
      if (element.contains(event.target)) return;
      handler?.();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [ref, handler, when]);
}

function ProfileMenu({ open, onClose, menuId }) {
  const reducedMotion = usePrefersReducedMotion();
  const navigate = useNavigate();
  const ref = useRef(null);

  const user = useAuthStore((state) => state.user);
  const logoutStore = useAuthStore((state) => state.logout);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const landingUrl = (import.meta.env.VITE_LANDING_APP_URL || "/").trim() || "/";
  const profileName = user?.fullName || user?.name || "Benjamin Franklyn";

  useOutsideClick(ref, onClose, open && !isLoggingOut);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape" && !isLoggingOut) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, isLoggingOut]);

  const goToRoute = useCallback(
    (route) => {
      navigate(route);
      onClose?.();
    },
    [navigate, onClose]
  );

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authApi.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      logoutStore();
      onClose?.();
      window.location.href = landingUrl;
    }
  };

  const animationProps = reducedMotion
    ? {
        initial: false,
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.98 },
        transition: { duration: 0.16 },
      };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open ? (
          <m.div
            id={menuId}
            ref={ref}
            role="menu"
            aria-label="Profile menu"
            className="
              absolute right-0 top-[calc(100%+10px)] z-60
              w-72.5 overflow-hidden rounded-[22px] border border-slate-200 bg-white
              shadow-[0_24px_60px_rgba(0,0,0,0.14)]
              sm:w-90
            "
            {...animationProps}
          >
            <div className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
              <img
                src={profileAvatar}
                alt=""
                className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14"
                loading="lazy"
              />
              <div className="min-w-0">
                <div className="truncate text-[15px] font-medium text-slate-900 sm:text-[16px]">
                  {profileName}
                </div>
                <button
                  type="button"
                  onClick={() => goToRoute(ROUTES.sellerProfile)}
                  className="mt-1 text-[12px] font-medium text-[#D06050] underline underline-offset-4"
                >
                  {COPY.viewPublicProfile}
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-slate-200" />

            <button
              type="button"
              onClick={() => goToRoute(ROUTES.sellerPrivacy)}
              className="flex w-full items-center justify-between px-4 py-3 text-[15px] font-medium text-slate-900 hover:bg-slate-50 sm:px-6 sm:text-[16px]"
            >
              <span>{COPY.privacyControls}</span>
              <ChevronRight className="text-slate-300" size={20} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center justify-between px-4 py-3 text-[15px] font-medium text-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:text-[16px]"
            >
              <span>{isLoggingOut ? COPY.loggingOut : COPY.logout}</span>
              <ChevronRight className="text-slate-300" size={20} />
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}

function TopbarIconButton({ children, className, ...props }) {
  return (
    <Button
      variant="icon"
      className={cn(
        "h-8 w-8 rounded-[10px] p-0 sm:h-10 sm:w-10 sm:rounded-[14px]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function TopbarDesktopSearch() {
  return (
    <div className="hidden min-w-0 flex-1 items-center gap-2 lg:flex">
      <div className="flex h-11 min-w-0 w-full max-w-135 items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex min-w-0 flex-1 items-center pl-4">
          <Search size={16} className="shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder={COPY.desktopSearchPlaceholder}
            className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          className="mr-1 inline-flex h-9 items-center gap-2 rounded-lg bg-[#D06050] px-4 text-[13px] font-semibold text-white"
        >
          <Search size={14} />
          {COPY.searchButtonLabel}
        </button>
      </div>

      <button
        type="button"
        aria-label={COPY.filtersLabel}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D06050] text-white"
      >
        <SlidersHorizontal size={18} />
      </button>
    </div>
  );
}

function TopbarMobileSearch() {
  return (
    <div className="mt-3 flex items-center gap-2 lg:hidden">
      <div className="flex h-10 min-w-0 flex-1 items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex min-w-0 flex-1 items-center pl-3">
          <Search size={15} className="shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder={COPY.mobileSearchPlaceholder}
            className="h-full min-w-0 flex-1 border-0 bg-transparent px-2.5 text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          className="mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D06050] text-white"
          aria-label={COPY.searchButtonLabel}
        >
          <Search size={14} />
        </button>
      </div>

      <button
        type="button"
        aria-label={COPY.filtersLabel}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D06050] text-white"
      >
        <SlidersHorizontal size={17} />
      </button>
    </div>
  );
}

export default function Topbar({
  onOpenMobileNav,
  showMenu = true,
  showBrand = false,
  showMessages = false,
  enableProfileMenu = false,
  showSearchBar = false,
  showAddListing = true,
  contentAligned = false,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menuId = useId();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleProfileClick = () => {
    if (enableProfileMenu) {
      setOpen((prev) => !prev);
      return;
    }

    navigate(ROUTES.sellerProfile);
  };

  const handleGoHome = () => {
    navigate(ROUTES.sellerHome);
  };

  const handleGoToNewListing = () => {
    navigate(ROUTES.sellerNewListing);
  };

  const handleGoToMessages = () => {
    navigate(ROUTES.sellerMessages);
  };

  return (
    <header className="sticky top-0 z-40 overflow-x-clip border-b border-slate-200 bg-white">
      <div
        className={cn(
          contentAligned
            ? "mx-auto w-full max-w-310 px-2.5 py-3 sm:px-4 sm:py-4 md:px-6"
            : "w-full px-2.5 py-3 sm:px-6 sm:py-4 lg:px-8"
        )}
      >
        <div className="flex min-h-10 items-center justify-between gap-2">
          <div
            className={cn(
              "flex min-w-0 items-center gap-2 sm:gap-3",
              showSearchBar ? "flex-1" : "shrink-0"
            )}
          >
            {showMenu ? (
              <TopbarIconButton
                aria-label={COPY.openNavigationLabel}
                className="lg:hidden"
                onClick={onOpenMobileNav}
              >
                <Menu size={16} className="text-slate-600 sm:size-4.5" />
              </TopbarIconButton>
            ) : null}

            {showBrand ? (
              <button
                type="button"
                onClick={handleGoHome}
                className="flex shrink-0 items-center"
                aria-label={COPY.goToSellerHomeLabel}
              >
                <img
                  src={logo}
                  alt="Real Estate"
                  className="block h-auto w-18 xs:w-[78px] sm:w-27 md:w-29.5"
                  loading="lazy"
                />
              </button>
            ) : null}

            {showSearchBar ? <TopbarDesktopSearch /> : null}
          </div>

          <div className="ml-2 flex shrink-0 items-center gap-1 sm:gap-2">
            {showAddListing ? (
              <button
                type="button"
                onClick={handleGoToNewListing}
                aria-label={COPY.addListingLabel}
                className="
                  inline-flex items-center justify-center gap-2
                  h-8 w-8 rounded-[10px] border border-[#D06050] bg-white p-0
                  sm:h-11 sm:w-auto sm:rounded-2xl sm:px-5
                  transition hover:bg-[#fff8f6]
                "
              >
                <Plus
                  size={15}
                  strokeWidth={2.4}
                  className="shrink-0 text-[#D06050] sm:h-4.5 sm:w-4.5"
                />
                <span className="hidden text-[15px] font-medium text-[#D06050] sm:inline">
                  {COPY.addListingText}
                </span>
              </button>
            ) : null}

            <TopbarIconButton aria-label={COPY.favoritesLabel}>
              <Heart size={15} className="text-slate-600 sm:size-4.5" />
            </TopbarIconButton>

            {showMessages ? (
              <TopbarIconButton
                aria-label={COPY.messagesLabel}
                onClick={handleGoToMessages}
              >
                <MessageCircle size={15} className="text-slate-600 sm:size-4.5" />
              </TopbarIconButton>
            ) : null}

            <TopbarIconButton aria-label={COPY.notificationsLabel}>
              <Bell size={15} className="text-slate-600 sm:size-4.5" />
            </TopbarIconButton>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={handleProfileClick}
                className="flex items-center gap-1"
                aria-haspopup={enableProfileMenu ? "menu" : undefined}
                aria-expanded={enableProfileMenu ? open : undefined}
                aria-controls={enableProfileMenu ? menuId : undefined}
                aria-label={
                  enableProfileMenu
                    ? COPY.openProfileMenuLabel
                    : COPY.goToProfileLabel
                }
              >
                <img
                  alt="avatar"
                  className="h-8 w-8 rounded-full border-2 border-[#D06050] object-cover sm:h-10 sm:w-10"
                  src={profileAvatar}
                  loading="lazy"
                />
                <ChevronDown
                  size={15}
                  className="hidden text-slate-400 sm:block sm:size-4.5"
                />
              </button>

              {enableProfileMenu ? (
                <ProfileMenu
                  open={open}
                  onClose={() => setOpen(false)}
                  menuId={menuId}
                />
              ) : null}
            </div>
          </div>
        </div>

        {showSearchBar ? <TopbarMobileSearch /> : null}
      </div>
    </header>
  );
}
