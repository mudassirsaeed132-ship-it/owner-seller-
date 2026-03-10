import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, Download, Eye, Landmark, Lock, Trash2 } from "lucide-react";

import Button from "../../../shared/ui/Button";
import { cn } from "../../../shared/lib/cn";
import { getPrivacyControls, updatePrivacyControls } from "../../../features/privacy/api/privacyApi";

const QK_PRIVACY = ["seller", "privacy"];

function Panel({ children }) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.03)] sm:p-4 md:p-5">
      {children}
    </div>
  );
}

function Section({ title, subtitle, accentTitle = false, children }) {
  return (
    <section className="mt-6 first:mt-0">
      <div className={cn("text-[12px] font-semibold", accentTitle ? "text-[#D06050]" : "text-slate-900")}>
        {title}
      </div>

      {subtitle ? <div className="mt-2 text-[12px] leading-5 text-slate-500">{subtitle}</div> : null}

      <div className="mt-4">{children}</div>
    </section>
  );
}

function RadioCard({ label, desc, checked, onClick }) {
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-4 sm:px-4">
        <div className="flex items-start gap-3">
          <span className="mt-[2px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#D06050]">
            {checked ? <span className="h-2 w-2 rounded-full bg-[#D06050]" /> : null}
          </span>

          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-slate-900">{label}</div>
            <div className="mt-1 text-[12px] leading-5 text-slate-500">{desc}</div>
          </div>
        </div>
      </div>
    </button>
  );
}

function Toggle({ checked, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[18px] w-[34px] shrink-0 items-center rounded-full transition",
        checked ? "bg-[#D06050]" : "border border-slate-400 bg-white"
      )}
      aria-label={ariaLabel}
      aria-pressed={checked}
    >
      <span
        className={cn(
          "inline-block h-[14px] w-[14px] rounded-full transition",
          checked ? "translate-x-[16px] bg-white" : "translate-x-[2px] bg-slate-900"
        )}
      />
    </button>
  );
}

function Check({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-start gap-2">
      <span
        className={cn(
          "mt-[2px] inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[4px] border",
          checked ? "border-[#D06050] bg-[#D06050]" : "border-slate-800 bg-white"
        )}
      >
        {checked ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M20 6 9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>

      <span className="min-w-0 text-[12px] leading-5 text-slate-700">{label}</span>

      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
    </label>
  );
}

function AccessSelect({ value, onChange, icon = "lock" }) {
  const Icon = icon === "eye" ? Eye : icon === "bank" ? Landmark : Lock;

  return (
    <div className="relative w-full sm:w-auto sm:min-w-[148px]">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#D06050]">
        <Icon size={14} />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white",
          "pl-9 pr-9 text-[12px] text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.02)]",
          "focus:outline-none focus:ring-2 focus:ring-[#D06050]/20"
        )}
      >
        <option value="owner">Owner Only</option>
        <option value="bank">Bank Access</option>
        <option value="verified">Verified Partners</option>
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#D06050]">
        <ChevronDown size={14} />
      </div>
    </div>
  );
}

export default function PrivacyControlsPage() {
  const nav = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: QK_PRIVACY,
    queryFn: getPrivacyControls,
  });

  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (data && !draft) setDraft(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const save = useMutation({
    mutationFn: updatePrivacyControls,
    onMutate: async (patch) => {
      await qc.cancelQueries({ queryKey: QK_PRIVACY });
      const prev = qc.getQueryData(QK_PRIVACY);
      qc.setQueryData(QK_PRIVACY, (old) => ({ ...(old || {}), ...(patch || {}) }));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(QK_PRIVACY, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: QK_PRIVACY }),
  });

  const d = draft || data;

  const headerText = useMemo(
    () => "Manage your privacy settings, data sharing preference, and control who can see your information.",
    []
  );

  if (isLoading || !d) {
    return (
      <div className="mx-auto w-full max-w-[1180px] px-3 pb-10 pt-5 sm:px-4 md:px-5 xl:px-0">
        <div className="h-10 w-44 rounded-xl bg-slate-200/60" />
        <div className="mt-5 h-[680px] rounded-2xl bg-slate-200/40" />
      </div>
    );
  }

  const patch = (partial) => {
    setDraft((s) => ({ ...(s || {}), ...(partial || {}) }));
    save.mutate(partial);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1180px] px-3 pb-10 pt-5 sm:px-4 md:px-5 xl:px-0">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => nav("/seller/profile")}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#D06050]"
            aria-label="Back"
          >
            <ChevronLeft size={24} strokeWidth={2.1} />
          </button>

          <h1 className="min-w-0 text-[24px] font-semibold tracking-tight text-[#D06050] sm:text-[28px] md:text-[30px]">
            Privacy Controls
          </h1>
        </div>

        <Panel>
          <div className="text-[12px] leading-5 text-slate-500">{headerText}</div>

          <Section title="Profile Visibility" subtitle="Control who can see your profile and personal information">
            <div className="space-y-3">
              <RadioCard
                label="Public"
                desc="Your profile is visible to everyone"
                checked={d.profileVisibility === "public"}
                onClick={() => patch({ profileVisibility: "public" })}
              />

              <RadioCard
                label="Limited"
                desc="Only Verified partners & everyone except you"
                checked={d.profileVisibility === "limited"}
                onClick={() => patch({ profileVisibility: "limited" })}
              />

              <RadioCard
                label="Private"
                desc="Your profile is hidden from everyone except you"
                checked={d.profileVisibility === "private"}
                onClick={() => patch({ profileVisibility: "private" })}
              />
            </div>
          </Section>

          <Section title="Document Visibility" subtitle="Control who can access each of your Documents">
            <div className="space-y-2.5">
              {[
                { key: "passport", title: "Passport", sub: "ID Document", icon: "lock" },
                { key: "proofOfAddress", title: "proof of Address", sub: "Utility Bill", icon: "bank" },
                { key: "bankStatement", title: "Bank Statement", sub: "Financial", icon: "eye" },
                { key: "employmentContract", title: "Employment Contract", sub: "Legal", icon: "lock" },
              ].map((row) => (
                <div
                  key={row.key}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 sm:px-4 sm:py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-slate-900">{row.title}</div>
                    <div className="mt-1 text-[12px] text-slate-500">{row.sub}</div>
                  </div>

                  <div className="w-full md:w-auto md:shrink-0">
                    <AccessSelect
                      icon={row.icon}
                      value={d.documentVisibility?.[row.key] || "owner"}
                      onChange={(v) =>
                        patch({
                          documentVisibility: { ...(d.documentVisibility || {}), [row.key]: v },
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Data Sharing Consent"
            subtitle="Manage your consent for sharing data with third parties (opt-in)"
          >
            <div className="space-y-3">
              {[
                {
                  key: "banks",
                  title: "Share Data with Banks",
                  desc: "Allow verified banks to access your\nfinancial documents",
                },
                {
                  key: "notaries",
                  title: "Share data with Notaries",
                  desc: "Allow notaries to access your legal\ndocuments",
                },
                {
                  key: "verifiedPartners",
                  title: "Share data with Verified Partners",
                  desc: "Allow verified partners to access your\nprofile information",
                },
              ].map((x) => (
                <div key={x.key} className="rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 sm:px-4 sm:py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-slate-900">{x.title}</div>
                      <div className="mt-1 whitespace-pre-line text-[12px] leading-5 text-slate-500">{x.desc}</div>
                    </div>

                    <div className="self-start sm:self-center">
                      <Toggle
                        checked={Boolean(d.dataSharingConsent?.[x.key])}
                        onChange={(v) =>
                          patch({
                            dataSharingConsent: { ...(d.dataSharingConsent || {}), [x.key]: v },
                          })
                        }
                        ariaLabel={x.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Notification Preferences"
            subtitle="Choose how you want to receive notifications and updates"
          >
            <div className="text-[12px] font-semibold text-slate-900">Communication Channels</div>

            <div className="mt-3 space-y-3">
              {[
                { key: "email", label: "Email Notifications" },
                { key: "sms", label: "SMS Notifications" },
                { key: "push", label: "Push Notifications" },
              ].map((c) => (
                <div key={c.key} className="flex items-center justify-between gap-3">
                  <div className="min-w-0 text-[12px] text-slate-700">{c.label}</div>

                  <Toggle
                    checked={Boolean(d.notificationChannels?.[c.key])}
                    onChange={(v) =>
                      patch({
                        notificationChannels: { ...(d.notificationChannels || {}), [c.key]: v },
                      })
                    }
                    ariaLabel={c.label}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 text-[12px] font-semibold text-slate-900">Notification Types</div>

            <div className="mt-3 space-y-2.5">
              <Check
                checked={Boolean(d.notificationTypes?.security)}
                onChange={(v) => patch({ notificationTypes: { ...(d.notificationTypes || {}), security: v } })}
                label="Security Alerts (Recommended)"
              />

              <Check
                checked={Boolean(d.notificationTypes?.documents)}
                onChange={(v) => patch({ notificationTypes: { ...(d.notificationTypes || {}), documents: v } })}
                label="Document Updates"
              />

              <Check
                checked={Boolean(d.notificationTypes?.marketing)}
                onChange={(v) => patch({ notificationTypes: { ...(d.notificationTypes || {}), marketing: v } })}
                label="Marketing & Promotional"
              />
            </div>
          </Section>

          <Section
            title="Data Rights (GDPR)"
            accentTitle
            subtitle="Download a copy of your data or permanently delete your account"
          >
            <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 sm:px-4 sm:py-4">
              <div className="text-[13px] font-semibold text-slate-900">Download Your Data</div>

              <div className="mt-1 text-[12px] leading-5 text-slate-500">
                Request a copy of all your personal data in a portable format. You'll receive an email with a download
                link within 48 hours.
              </div>

              <button
                type="button"
                className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-900"
              >
                <Download size={16} className="shrink-0 text-slate-700" />
                <span className="min-w-0">Request Data Export</span>
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-[#D06050]/55 bg-white px-3.5 py-3.5 sm:px-4 sm:py-4">
              <div className="text-[13px] font-semibold text-[#D06050]">Delete your Account</div>

              <div className="mt-1 text-[12px] leading-5 text-slate-500">
                Deleting your Account will permanently delete all your data.
              </div>

              <Button className="mt-4 min-h-10 w-full rounded-lg bg-[#D06050] px-3 text-[12px] font-semibold text-white">
                <Trash2 size={16} />
                Delete Account
              </Button>
            </div>
          </Section>
        </Panel>
      </div>
    </div>
  );
}