import fb from "../../assets/icons/social/facebook.svg";
import ig from "../../assets/icons/social/instagram.svg";
import x from "../../assets/icons/social/x.svg";
import yt from "../../assets/icons/social/youtube.svg";

import phone from "../../assets/images/footer/footer-phone.svg";
import gp from "../../assets/images/footer/badge-google-play.svg";
import ag from "../../assets/images/footer/badge-appgallery.svg";

const footerGroups = [
  {
    title: "Popular Categories",
    items: ["Rent", "Buy", "Land", "Commercial"],
  },
  {
    title: "Trending Searches",
    items: ["Land", "Short-stay", "Shop", "flats"],
  },
  {
    title: "About Us",
    items: ["RS Blog", "Contact Us", "RS for Businesses"],
  },
  {
    title: "OLX",
    items: ["Help", "Sitemap", "Terms of use", "Privacy Policy"],
  },
];

const socialLinks = [
  { icon: x, label: "X" },
  { icon: fb, label: "Facebook" },
  { icon: yt, label: "YouTube" },
  { icon: ig, label: "Instagram" },
];

export default function SellerFooter() {
  return (
    <footer className="w-full overflow-x-hidden bg-[#F7EAE8]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 xl:px-16">
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.9fr_0.95fr] lg:gap-10 xl:gap-14">
          <div className="min-w-0 text-center lg:text-left">
            <h2 className="text-[24px] font-semibold leading-[1.35] text-[#D06050]">
              Find amazing deals on the go.
            </h2>
            <p className="mt-2 text-[24px] font-semibold leading-[1.35] text-[#1D1D1D]">
              Download Real estate app now!
            </p>
          </div>

          <div className="flex min-w-0 justify-center">
            <img
              src={phone}
              alt="Real Estate mobile app"
              className="block h-auto w-[132px] max-w-full border-0 outline-none shadow-none ring-0 sm:w-[150px] md:w-[170px] lg:w-[185px]"
              loading="lazy"
            />
          </div>

          <div className="flex min-w-0 flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-end">
            <a href="#" aria-label="Get it on Google Play" className="shrink-0">
              <img
                src={gp}
                alt="Google Play"
                className="block h-auto w-[112px] max-w-full sm:w-[118px] md:w-[126px]"
                loading="lazy"
              />
            </a>

            <a href="#" aria-label="Explore it on AppGallery" className="shrink-0">
              <img
                src={ag}
                alt="AppGallery"
                className="block h-auto w-[112px] max-w-full sm:w-[118px] md:w-[126px]"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <div className="mt-10 grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:mt-12 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8 xl:mt-14 xl:gap-x-10">
          {footerGroups.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="text-[18px] font-medium leading-[1.3] text-[#D06050]">
                {group.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="min-w-0">
                    <a
                      href="#"
                      className="block break-words text-[16px] leading-[1.35] text-[#D06050] transition hover:opacity-80"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="min-w-0 lg:justify-self-end">
            <h3 className="text-[18px] font-medium leading-[1.3] text-[#D06050] text-left lg:text-left">
              Follow Us
            </h3>

            <div className="mt-4 flex flex-wrap items-center gap-3 max-[420px]:justify-center lg:flex-nowrap lg:justify-end">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-black/55 bg-transparent transition hover:bg-white/40 sm:h-[44px] sm:w-[44px]"
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#D06050]">
        <div className="mx-auto flex h-[54px] w-full max-w-[1600px] items-center justify-center px-4 text-center text-[14px] font-medium text-white sm:h-[60px] sm:px-6 sm:text-[15px] md:justify-end md:px-8 lg:px-10 xl:px-16">
          © Real state Copyrights
        </div>
      </div>
    </footer>
  );
}