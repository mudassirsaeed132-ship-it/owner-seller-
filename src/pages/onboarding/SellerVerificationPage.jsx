// PATH: src/pages/onboarding/SellerVerificationPage.jsx
import { useMemo, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AuthField,
  AuthPage,
  AuthSubmitButton,
} from "../../app/layout/AuthShell";
import { authApi } from "../../features/auth/api/authApi";
import { useAuthStore } from "../../features/auth/model/authStore";

export default function SellerVerificationPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const pendingEmail = useAuthStore((state) => state.pendingEmail);
  const loginSuccess = useAuthStore((state) => state.loginSuccess);
  const clearTransientFlow = useAuthStore((state) => state.clearTransientFlow);

  const [form, setForm] = useState({
    profileDescription: "",
    website: "",
    documentFileName: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = pendingEmail || user?.email || "";

  const canSubmit = useMemo(() => {
    return Boolean(
      form.profileDescription.trim() && form.documentFileName.trim()
    );
  }, [form.profileDescription, form.documentFileName]);

  const handleChange = (key) => (event) => {
    const value = event.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
    setFormError("");
  };

  const handleFilePick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setForm((prev) => ({
      ...prev,
      documentFileName: file ? file.name : "",
    }));

    setErrors((prev) => ({
      ...prev,
      documentFileName: "",
    }));
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!form.profileDescription.trim()) {
      nextErrors.profileDescription = "Profile description is required.";
    }

    if (!form.documentFileName.trim()) {
      nextErrors.documentFileName = "ID/registration document is required.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      setFormError("");

      const response = await authApi.sellerVerification({
        email,
        profileDescription: form.profileDescription.trim(),
        website: form.website.trim(),
        documentFileName: form.documentFileName.trim(),
      });

      if (response?.user && token) {
        loginSuccess({
          token,
          user: response.user,
        });
      }

      clearTransientFlow();
      navigate("/seller", { replace: true });
    } catch (error) {
      setFormError(
        error.message || "Unable to submit seller verification right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage
      title="Seller Verification"
      description="You will verify asa seller to gain more sales"
      headerAlign="left"
      maxWidth="max-w-[540px]"
      titleClassName="text-[30px] sm:text-[36px] md:text-[40px]"
      descriptionClassName="max-w-[620px] text-[15px] sm:text-[16px]"
      contentClassName="pt-1"
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-1 w-full max-w-full space-y-5 sm:w-155"
      >
        <div className="relative w-full">
          <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-[12px] font-medium leading-none text-[#4B4B4B] sm:text-[13px]">
            Profile description
          </label>

          <textarea
            value={form.profileDescription}
            onChange={handleChange("profileDescription")}
            rows={4}
            placeholder="I am a"
            className={`min-h-26 w-full resize-none rounded-sm border bg-transparent px-4 py-4 text-[15px] font-medium text-[#232323] outline-none placeholder:text-[#8A8A8A] transition sm:min-h-26.5 sm:text-[16px] ${
              errors.profileDescription
                ? "border-[#D56352]"
                : "border-[#D8D8D8] focus:border-[#D56352]"
            }`}
          />

          {errors.profileDescription ? (
            <p className="mt-2 text-[12px] font-medium text-[#D56352]">
              {errors.profileDescription}
            </p>
          ) : null}
        </div>

        <AuthField
          label="Website (optional)"
          value={form.website}
          onChange={handleChange("website")}
          placeholder=""
          className="w-full"
        />

        <div className="relative w-full">
          <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-[12px] font-medium leading-none text-[#4B4B4B] sm:text-[13px]">
            Upload ID card/ Registration card
          </label>

          <button
            type="button"
            onClick={handleFilePick}
            className={`flex h-13 w-full items-center justify-between rounded-sm border bg-transparent px-4 text-left transition sm:h-13.5 ${
              errors.documentFileName
                ? "border-[#D56352]"
                : "border-[#D8D8D8]"
            }`}
          >
            <span
              className={`truncate text-[15px] font-medium sm:text-[16px] ${
                form.documentFileName ? "text-[#232323]" : "text-[#8A8A8A]"
              }`}
            >
              {form.documentFileName || "Choose file"}
            </span>

            <Upload className="h-6 w-6 shrink-0 text-[#232323]" strokeWidth={2} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          {errors.documentFileName ? (
            <p className="mt-2 text-[12px] font-medium text-[#D56352]">
              {errors.documentFileName}
            </p>
          ) : null}
        </div>

        {formError ? (
          <p className="text-[13px] font-medium text-[#D56352]">{formError}</p>
        ) : null}

        <AuthSubmitButton
          disabled={!canSubmit}
          loading={loading}
          className="mt-2 w-full"
        >
          Continue
        </AuthSubmitButton>
      </form>
    </AuthPage>
  );
}