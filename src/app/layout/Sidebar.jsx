import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Home,
  MessageCircle,
} from "lucide-react";
import { cn } from "../../shared/lib/cn";
import logo from "../../assets/icons/logo/real-estate-logo.png";
import listingIcon from "../../assets/icons/sidebar/listing.svg";
import leadsIcon from "../../assets/icons/sidebar/leads.svg";

const nav = [
  { to: "/seller", label: "Home", icon: Home, end: true, type: "lucide" },
  {
    to: "/seller/listings",
    label: "My Listings",
    image: listingIcon,
    type: "image",
  },
  {
    to: "/seller/messages",
    label: "Messages",
    icon: MessageCircle,
    type: "lucide",
  },
  {
    to: "/seller/calendar",
    label: "Calendar",
    icon: CalendarDays,
    type: "lucide",
  },
  {
    to: "/seller/leads",
    label: "Leads",
    image: leadsIcon,
    type: "image",
  },
];

function SidebarItemIcon({ item, isActive }) {
  if (item.type === "image") {
    return (
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition xl:h-9 xl:w-9",
          isActive ? "bg-[#D06050]" : "bg-transparent"
        )}
      >
        <img
          src={item.image}
          alt=""
          className={cn(
            "h-4.5 w-4.5 object-contain transition xl:h-4.75 xl:w-4.75",
            isActive ? "brightness-0 invert" : "opacity-70"
          )}
          loading="lazy"
        />
      </span>
    );
  }

  const Icon = item.icon;

  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition xl:h-9 xl:w-9",
        isActive
          ? "bg-[#D06050] text-white"
          : "text-slate-400 group-hover:text-slate-600"
      )}
    >
      <Icon size={18} />
    </span>
  );
}

export default function Sidebar({ onNavigate, mobile = false, className = "" }) {
  return (
    <aside
      className={cn(
        "bg-white",
        mobile
          ? "h-full w-full"
          : "sticky top-0 h-screen w-70 border-r border-slate-200 xl:w-75 2xl:w-[320px]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center border-b border-slate-200",
          mobile ? "h-22 px-5" : "h-19.5 px-5 sm:h-21 xl:px-6"
        )}
      >
        <img
          src={logo}
          alt="Real Estate"
          className={cn(
            "h-auto w-auto object-contain",
            mobile ? "max-h-11.5" : "max-h-10.5 xl:max-h-11"
          )}
          loading="lazy"
        />
      </div>

      <nav
        className={cn(
          "flex flex-col",
          mobile ? "gap-3 px-4 pt-6" : "gap-3 px-4 pt-6 xl:px-5"
        )}
      >
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={Boolean(item.end)}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "group flex items-center justify-between rounded-2xl transition",
                mobile ? "h-12 px-4" : "h-12 px-4 xl:h-12.5",
                isActive
                  ? "bg-[#F6EAE8] text-[#D06050]"
                  : "text-slate-500 hover:bg-slate-50"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex min-w-0 items-center gap-3 xl:gap-3.5">
                  <SidebarItemIcon item={item} isActive={isActive} />
                  <span
                    className={cn(
                      "truncate text-[15px] font-medium xl:text-[16px]",
                      isActive ? "text-[#D06050]" : "text-[#64748B]"
                    )}
                  >
                    {item.label}
                  </span>
                </span>

                <ChevronRight
                  size={18}
                  className={cn(
                    "shrink-0 opacity-80 transition",
                    isActive ? "text-[#D06050]" : "text-slate-300"
                  )}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}