import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import MobileNavDrawer from "./MobileNavDrawer";
import SellerFooter from "../../pages/seller/SellerFooter";

export default function SellerShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const showFooter = pathname === "/seller" || pathname === "/seller/";

  const isProfileModule = useMemo(() => {
    return pathname.startsWith("/seller/profile");
  }, [pathname]);

  const isPrivacyPage = useMemo(() => {
    return pathname.startsWith("/seller/privacy");
  }, [pathname]);

  const isStandalone = useMemo(() => {
    return isProfileModule || isPrivacyPage;
  }, [isProfileModule, isPrivacyPage]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F6F6]">
      <div className="flex w-full min-w-0 flex-1">
        {!isStandalone ? (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            onOpenMobileNav={() => setMobileOpen(true)}
            showMenu={!isStandalone}
            showBrand={isStandalone}
            showMessages={isProfileModule || isPrivacyPage}
            enableProfileMenu={isProfileModule || isPrivacyPage}
            showSearchBar={isPrivacyPage}
            showAddListing={!isPrivacyPage}
            contentAligned={isStandalone}
          />

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      {showFooter ? <SellerFooter /> : null}

      {!isStandalone ? (
        <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      ) : null}
    </div>
  );
}