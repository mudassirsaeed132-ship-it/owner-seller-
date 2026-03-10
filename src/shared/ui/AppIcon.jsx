import {
  Home,
  List,
  MessageCircle,
  CalendarDays,
  Users,
  Plus,
  Bell,
  Heart,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Trash2,
  MapPin,
  Minus,
  Menu,
  Check,
  X,
} from "lucide-react";

/**
 * AppIcon:
 * - primary: lucide icons (consistent)
 * - fallback: auto-load ANY svg added to src/shared/assets/icons/*.svg by filename (without extension)
 *   Example: src/shared/assets/icons/google-pay.svg  ->  <AppIcon name="google-pay" />
 */
const lucideMap = {
  home: Home,
  list: List,
  message: MessageCircle,
  calendar: CalendarDays,
  users: Users,
  plus: Plus,
  bell: Bell,
  heart: Heart,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  more: MoreVertical,
  trash: Trash2,
  pin: MapPin,
  minus: Minus,
  menu: Menu,
  check: Check,
  x: X,

  // brand fallback icon (still lucide)
  "brand-home": Home,
};

const svgUrls = import.meta.glob("../assets/icons/*.svg", { eager: true, as: "url" });

function getSvgUrlByName(name) {
  const key = Object.keys(svgUrls).find((p) => p.endsWith(`/${name}.svg`));
  return key ? svgUrls[key] : null;
}

export default function AppIcon({ name, className = "" }) {
  const Icon = lucideMap[name];
  if (Icon) return <Icon className={className} aria-hidden="true" />;

  const url = getSvgUrlByName(name);
  if (url) return <img src={url} alt="" className={className} aria-hidden="true" />;

  // graceful fallback
  return <span className={className} aria-hidden="true" />;
}