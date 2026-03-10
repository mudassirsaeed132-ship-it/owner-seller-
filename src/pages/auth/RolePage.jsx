import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
import { AuthPage, AuthSubmitButton } from "../../app/layout/AuthShell";
import { cn } from "../../shared/lib/cn";
import { useAuthStore } from "../../features/auth/model/authStore";
import buyerImg from "../../assets/images/auth/role-buyer.png";
import sellerImg from "../../assets/images/auth/role-seller.png";

const roles = [
  {
    key: "buyer",
    title: "I am a Buyer/ Renter",
    image: buyerImg,
  },
  {
    key: "seller",
    title: "I am a Seller/ Owner",
    image: sellerImg,
  },
];

export default function RolePage() {
  const navigate = useNavigate();
  const selectedRole = useAuthStore((state) => state.selectedRole);
  const setSelectedRole = useAuthStore((state) => state.setSelectedRole);

  useEffect(() => {
    setSelectedRole(null);
  }, [setSelectedRole]);

  const handleContinue = () => {
    if (selectedRole === "seller") {
      navigate("/auth/login");
    }
  };

  return (
    <AuthPage
      title="Choose your role Below"
      showBrand={false}
      showPowered={false}
      maxWidth="max-w-[760px]"
      titleClassName="text-center text-[28px] font-bold text-[#D56352] sm:text-[32px] lg:mx-auto lg:max-w-[508px] lg:text-left lg:text-[36px]"
      contentClassName="pt-16 sm:pt-16"
    >
      <div className="flex flex-col items-center">
        <div className="grid w-full grid-cols-1 gap-3 sm:w-fit sm:grid-cols-[15rem_15rem] sm:gap-7">
          {roles.map((role) => {
            const isActive = selectedRole === role.key;

            return (
              <m.button
                key={role.key}
                type="button"
                onClick={() => setSelectedRole(role.key)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.18 }}
                className={cn(
                  "mx-auto flex w-full max-w-60 flex-col items-center justify-center rounded-[20px] border bg-white px-8 text-center",
                  "h-53.5 sm:h-57 lg:h-62",
                  isActive && role.key === "seller"
                    ? "border-[#D56352]"
                    : "border-[#B8B8B8]"
                )}
              >
                <img
                  src={role.image}
                  alt={role.title}
                  className="mb-4 h-auto w-23 object-contain sm:w-25 lg:w-27.5"
                />
                <span className="text-[15px] font-semibold text-[#232323] sm:text-[16px] lg:text-[17px]">
                  {role.title}
                </span>
              </m.button>
            );
          })}
        </div>

        <AuthSubmitButton
          type="button"
          onClick={handleContinue}
          className="mt-18 h-12.5 max-w-115 text-[16px] sm:mt-20 sm:max-w-125 sm:text-[17px]"
          disabled={selectedRole !== "seller"}
        >
          Continue
        </AuthSubmitButton>
      </div>
    </AuthPage>
  );
}
