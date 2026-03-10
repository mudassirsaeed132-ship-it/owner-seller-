import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, CheckCircle2 } from "lucide-react";

import ProfileCardLayout from "../../../widgets/profile/ProfileCardLayout";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import Skeleton from "../../../shared/ui/Skeleton";

import { profileApi } from "../../../features/profile/api/profileApi";
import { queryKeys } from "../../../services/api/queryKeys";

import avatarSvg from "../../../assets/images/profile/Benjamin Franklyn.svg";

function Field({ label, rightIcon, children }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-slate-900">{label}</div>
      <div className="relative">
        {children}
        {rightIcon ? (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">{rightIcon}</div>
        ) : null}
      </div>
    </div>
  );
}

export default function EditProfilePage() {
  const qc = useQueryClient();
  const key = queryKeys?.profile?.me ? queryKeys.profile.me() : ["profile", "me"];

  const meQ = useQuery({
    queryKey: key,
    queryFn: () => profileApi.get(),
    staleTime: 30_000,
  });

  const updateM = useMutation({
    mutationFn: (payload) => profileApi.update(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });

  const me = meQ.data?.profile;

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    if (!me) return;
    setEmail(me.email || "John.doe@gmail.com");
    setPhone(me.phone || "+1 (555) 123-4567");
    setLocation(me.location || "San Francisco, CA");
    setAccountType(me.accountType || "Seller/ Owner");
  }, [me]);

  const submit = () => {
    updateM.mutate({
      email,
      phone,
      location,
      accountType,
    });
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-295">
        <h1 className="text-4xl font-semibold text-[#D06050]">Profile</h1>

        <div className="mt-6">
          {meQ.isLoading ? (
            <Skeleton className="h-155 rounded-2xl" />
          ) : (
            <ProfileCardLayout
              left={
                <>
                  <div className="flex w-full justify-center lg:justify-start">
                    <div className="h-45 w-45 overflow-hidden rounded-full bg-[#E9D2B7]">
                      <img src={avatarSvg} alt="Profile" className="h-full w-full object-cover" />
                    </div>
                  </div>

                  <Button variant="outline" className="mt-8 h-11 w-42.5 rounded-xl" type="button">
                    <Upload size={16} />
                    Change Photo
                  </Button>
                </>
              }
            >
              {/* title row */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-4xl font-semibold text-slate-900">{me?.name || "Benjamin Franklyn"}</div>
                <div className="text-base font-medium text-[#D06050]">Property Owner</div>
              </div>

              <div className="mt-3 h-px w-full bg-slate-200" />

              <div className="mt-6 space-y-6">
                <Field
                  label="Email Address"
                  rightIcon={<CheckCircle2 className="text-emerald-500" size={22} />}
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-2xl pr-12"
                    placeholder="Email Address"
                  />
                </Field>

                <Field
                  label="Phone Address"
                  rightIcon={<CheckCircle2 className="text-emerald-500" size={22} />}
                >
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 rounded-2xl pr-12"
                    placeholder="Phone"
                  />
                </Field>

                <Field label="Location">
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-12 rounded-2xl"
                    placeholder="Location"
                  />
                </Field>

                <Field label="Account Type">
                  <Input
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="h-12 rounded-2xl"
                    placeholder="Account Type"
                  />
                </Field>

                <Button
                  className="mt-4 h-14 w-full rounded-2xl bg-[#D06050] text-white hover:bg-[#C65648]"
                  onClick={submit}
                  disabled={updateM.isPending}
                >
                  Save Changes
                </Button>
              </div>
            </ProfileCardLayout>
          )}
        </div>
      </div>
    </div>
  );
}