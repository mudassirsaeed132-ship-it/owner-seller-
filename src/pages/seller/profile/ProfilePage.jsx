import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Pencil } from "lucide-react";

import ProfileCardLayout from "../../../widgets/profile/ProfileCardLayout";
import SettingsSection from "../../../widgets/profile/SettingsSection";
import Button from "../../../shared/ui/Button";
import Skeleton from "../../../shared/ui/Skeleton";

import { profileApi } from "../../../features/profile/api/profileApi";
import { queryKeys } from "../../../services/api/queryKeys";

import avatarSvg from "../../../assets/images/profile/Benjamin Franklyn.svg";

function RadioRow({ options, value, onChange }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {options.map((o) => (
        <label key={o.value} className="flex items-center gap-3 text-sm text-slate-700">
          <span
            className={[
              "flex h-4 w-4 items-center justify-center rounded-full border",
              value === o.value ? "border-[#D06050]" : "border-slate-300",
            ].join(" ")}
          >
            {value === o.value ? <span className="h-2 w-2 rounded-full bg-[#D06050]" /> : null}
          </span>

          <input
            type="radio"
            className="sr-only"
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />

          {o.label}
        </label>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const key = queryKeys?.profile?.me ? queryKeys.profile.me() : ["profile", "me"];

  const meQ = useQuery({
    queryKey: key,
    queryFn: () => profileApi.get(),
    staleTime: 30_000,
  });

  const settingsM = useMutation({
    mutationFn: (payload) => profileApi.updateSettings(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });

  const me = meQ.data?.profile;

  const [lang, setLang] = useState("swedish");
  const [curr, setCurr] = useState("pound");

  useEffect(() => {
    setLang(me?.settings?.language || "swedish");
    setCurr(me?.settings?.currency || "pound");
  }, [me?.settings?.language, me?.settings?.currency]);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="text-4xl font-semibold text-[#D06050]">Profile</h1>

        <div className="mt-6">
          {meQ.isLoading ? (
            <Skeleton className="h-[520px] rounded-2xl" />
          ) : (
            <ProfileCardLayout
              left={
                <>
                  <div className="flex w-full justify-center lg:justify-start">
                    <div className="h-[180px] w-[180px] overflow-hidden rounded-full bg-[#E9D2B7]">
                      <img src={avatarSvg} alt="Profile" className="h-full w-full object-cover" />
                    </div>
                  </div>

                  <Button
                    className="mt-8 h-12 w-[190px] rounded-xl bg-[#D06050] text-white hover:bg-[#C65648]"
                    onClick={() => navigate("/seller/profile/edit")}
                  >
                    <Pencil size={16} />
                    Edit Profile
                  </Button>
                </>
              }
            >
              <div className="text-4xl font-semibold text-slate-900">{me?.name || "Benjamin Franklyn"}</div>
              <div className="mt-3 h-px w-full bg-slate-200" />

              <div className="mt-6 text-2xl font-semibold text-slate-900">My Activity</div>

              <div className="mt-5 space-y-4">
                <Link
                  to="/seller/profile/payments?tab=invoices"
                  className="flex items-center justify-between text-lg font-medium text-[#D06050]"
                >
                  <span>Payment &amp; Invoices</span>
                  <ChevronRight className="text-slate-400" />
                </Link>

                <Link
                  to="/seller/profile/document-status?tab=status"
                  className="flex items-center justify-between text-lg font-medium text-[#D06050]"
                >
                  <span>Document Status</span>
                  <ChevronRight className="text-slate-400" />
                </Link>
              </div>

              <div className="mt-8 text-3xl font-semibold text-slate-900">Settings</div>

              <SettingsSection title="Language" onApply={() => settingsM.mutate({ language: lang })}>
                <RadioRow
                  value={lang}
                  onChange={setLang}
                  options={[
                    { value: "english", label: "English" },
                    { value: "swedish", label: "Swedish" },
                    { value: "french", label: "French" },
                    { value: "urdu", label: "Urdu" },
                  ]}
                />
              </SettingsSection>

              <SettingsSection title="Currency" onApply={() => settingsM.mutate({ currency: curr })}>
                <RadioRow
                  value={curr}
                  onChange={setCurr}
                  options={[
                    { value: "dollar", label: "Dollar" },
                    { value: "pound", label: "Pound" },
                    { value: "rupee", label: "Rupee" },
                  ]}
                />
              </SettingsSection>
            </ProfileCardLayout>
          )}
        </div>
      </div>
    </div>
  );
}