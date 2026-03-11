import { Outlet, useLocation } from "react-router-dom";
import Stepper from "../../../shared/ui/Stepper";

export default function WizardLayout() {
  const { pathname } = useLocation();

  const isDetailsFlow =
    pathname.includes("/details") ||
    pathname.includes("/location") ||
    pathname.includes("/pricing");

  const isPlanStep = pathname.includes("/plan");

  const activeIndex = pathname.includes("/details")
    ? 0
    : pathname.includes("/location")
    ? 1
    : pathname.includes("/pricing")
    ? 2
    : 0;

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1400px]">
        {isDetailsFlow ? (
          <>
            <div className="mx-auto max-w-[1120px] text-left">
              <h1 className="text-[30px] font-semibold text-[#D06050] sm:text-[36px] lg:text-[40px]">
                Create New Listing
              </h1>
              <div className="mt-2 text-sm text-slate-500 sm:text-[15px]">
                List your property for sale or rent in minutes.
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-[1120px] sm:mt-8">
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
            "mx-auto w-full",
            isPlanStep ? "max-w-7xl" : "max-w-280",
            isDetailsFlow ? "mt-6 sm:mt-8" : "mt-2",
          ].join(" ")}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}