import { useEffect, useRef, useState } from "react";
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

function useOutsideClick(ref, handler, when = true) {
  useEffect(() => {
    if (!when) return;

    const onDown = (e) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target)) return;
      handler?.();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [ref, handler, when]);
}

function ProfileMenu({ open, onClose }) {
  const reduced = usePrefersReducedMotion();
  const nav = useNavigate();
  const ref = useRef(null);
  const logoutStore = useAuthStore((state) => state.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useOutsideClick(ref, onClose, open && !isLoggingOut);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape" && !isLoggingOut) onClose?.();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, isLoggingOut]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authApi.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      logoutStore();
      onClose?.();
      nav("/auth/role", { replace: true });
      setIsLoggingOut(false);
    }
  };

  const anim = reduced
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
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
            ref={ref}
            className="
              absolute right-0 top-[calc(100%+10px)] z-[60]
              w-[290px] overflow-hidden rounded-[22px] border border-slate-200 bg-white
              shadow-[0_24px_60px_rgba(0,0,0,0.14)]
              sm:w-[360px]
            "
            {...anim}
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
                  Benjamin Franklyn
                </div>
                <button
                  type="button"
                  onClick={() => {
                    nav("/seller/profile");
                    onClose?.();
                  }}
                  className="mt-1 text-[12px] font-medium text-[#D06050] underline underline-offset-4"
                >
                  View Public Profile
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-slate-200" />

            <button
              type="button"
              onClick={() => {
                nav("/seller/privacy");
                onClose?.();
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-[15px] font-medium text-slate-900 hover:bg-slate-50 sm:px-6 sm:text-[16px]"
            >
              <span>Privacy controls</span>
              <ChevronRight className="text-slate-300" size={20} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center justify-between px-4 py-3 text-[15px] font-medium text-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:text-[16px]"
            >
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
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
      <div className="flex h-11 min-w-0 w-full max-w-[540px] items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex min-w-0 flex-1 items-center pl-4">
          <Search size={16} className="shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
            className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          className="mr-1 inline-flex h-9 items-center gap-2 rounded-lg bg-[#D06050] px-4 text-[13px] font-semibold text-white"
        >
          <Search size={14} />
          Search
        </button>
      </div>

      <button
        type="button"
        aria-label="Filters"
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
            placeholder="Search..."
            className="h-full min-w-0 flex-1 border-0 bg-transparent px-2.5 text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          className="mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D06050] text-white"
          aria-label="Search"
        >
          <Search size={14} />
        </button>
      </div>

      <button
        type="button"
        aria-label="Filters"
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
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleProfileClick = () => {
    if (enableProfileMenu) {
      setOpen((prev) => !prev);
      return;
    }

    nav("/seller/profile");
  };

  return (
    <header className="sticky top-0 z-40 overflow-x-clip border-b border-slate-200 bg-white">
      <div
        className={cn(
          contentAligned
            ? "mx-auto w-full max-w-[1240px] px-2.5 py-3 sm:px-4 sm:py-4 md:px-6"
            : "w-full px-2.5 py-3 sm:px-6 sm:py-4 lg:px-8"
        )}
      >
        <div className="flex min-h-[40px] items-center justify-between gap-2">
          <div className={cn("flex min-w-0 items-center gap-2 sm:gap-3", showSearchBar ? "flex-1" : "shrink-0")}>
            {showMenu ? (
              <TopbarIconButton
                aria-label="Open navigation"
                className="lg:hidden"
                onClick={onOpenMobileNav}
              >
                <Menu size={16} className="text-slate-600 sm:size-[18px]" />
              </TopbarIconButton>
            ) : null}

            {showBrand ? (
              <button
                type="button"
                onClick={() => nav("/seller")}
                className="flex shrink-0 items-center"
                aria-label="Go to seller home"
              >
                <img
                  src={logo}
                  alt="Real Estate"
                  className="block h-auto w-[72px] xs:w-[78px] sm:w-[108px] md:w-[118px]"
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
                onClick={() => nav("/seller/listings/new/details")}
                aria-label="Add listing"
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
                  className="shrink-0 text-[#D06050] sm:h-[18px] sm:w-[18px]"
                />
                <span className="hidden text-[15px] font-medium text-[#D06050] sm:inline">
                  AD LISTING
                </span>
              </button>
            ) : null}

            <TopbarIconButton aria-label="Favorites">
              <Heart size={15} className="text-slate-600 sm:size-[18px]" />
            </TopbarIconButton>

            {showMessages ? (
              <TopbarIconButton
                aria-label="Messages"
                onClick={() => nav("/seller/messages")}
              >
                <MessageCircle size={15} className="text-slate-600 sm:size-[18px]" />
              </TopbarIconButton>
            ) : null}

            <TopbarIconButton aria-label="Notifications">
              <Bell size={15} className="text-slate-600 sm:size-[18px]" />
            </TopbarIconButton>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={handleProfileClick}
                className="flex items-center gap-1"
                aria-label={enableProfileMenu ? "Open profile menu" : "Go to profile"}
              >
                <img
                  alt="avatar"
                  className="h-8 w-8 rounded-full border-2 border-[#D06050] object-cover sm:h-10 sm:w-10"
                  src={profileAvatar}
                  loading="lazy"
                />
                <ChevronDown size={15} className="hidden text-slate-400 sm:block sm:size-[18px]" />
              </button>

              {enableProfileMenu ? <ProfileMenu open={open} onClose={() => setOpen(false)} /> : null}
            </div>
          </div>
        </div>

        {showSearchBar ? <TopbarMobileSearch /> : null}
      </div>
    </header>
  );
}