import { Outlet, useLocation } from "react-router-dom";
import Stepper from "../../../shared/ui/Stepper";

export default function WizardLayout() {
  const { pathname } = useLocation();

  const isDetailsFlow =
    pathname.includes("/details") ||
    pathname.includes("/location") ||
    pathname.includes("/pricing");

  const activeIndex = pathname.includes("/details")
    ? 0
    : pathname.includes("/location")
    ? 1
    : pathname.includes("/pricing")
    ? 2
    : 0;

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-[980px]">
        {isDetailsFlow ? (
          <>
            <div className="mx-auto max-w-[860px] text-left">
              <h1 className="text-4xl font-semibold text-[#D06050]">
                Create New Listing
              </h1>
              <div className="mt-2 text-sm text-slate-500">
                List your property for sale or rent in minutes.
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-[860px]">
              <Stepper
                activeIndex={activeIndex}
                steps={[
                  { key: "details", label: "Details" },
                  {
                    key: "location",
                    label: pathname.includes("/location") ? "Media" : "Location",
                  },
                  { key: "pricing", label: "Pricing" },
                ]}
              />
            </div>
          </>
        ) : null}

        <div
          className={[
            "mx-auto max-w-[860px]",
            isDetailsFlow ? "mt-8" : "mt-2",
          ].join(" ")}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}