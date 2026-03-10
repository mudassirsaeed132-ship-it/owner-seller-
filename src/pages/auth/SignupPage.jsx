import { useEffect, useMemo, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthCheckboxField,
  AuthField,
  AuthPage,
  AuthSubmitButton,
} from "../../app/layout/AuthShell";
import { authApi } from "../../features/auth/api/authApi";
import { useAuthStore } from "../../features/auth/model/authStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const setAuthFlow = useAuthStore((state) => state.setAuthFlow);
  const setPendingEmail = useAuthStore((state) => state.setPendingEmail);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatarFileName: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthFlow("signup");
  }, [setAuthFlow]);

  const canSubmit = useMemo(() => {
    return Boolean(
      form.firstName.trim() &&
        form.lastName.trim() &&
        form.email.trim() &&
        form.phone.trim() &&
        form.avatarFileName.trim() &&
        form.agree
    );
  }, [form]);

  const handleChange = (key) => (event) => {
    let value = event.target.value;

    if (key === "phone") {
      value = value.replace(/[^\d+\s()-]/g, "");
    }

    if (key === "agree") {
      value = event.target.checked;
    }

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
      avatarFileName: file ? file.name : "",
    }));

    setErrors((prev) => ({
      ...prev,
      avatarFileName: "",
    }));
    setFormError("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.avatarFileName.trim()) nextErrors.avatarFileName = "Image file is required.";
    if (!form.agree) nextErrors.agree = "You must agree to continue.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setFormError("");

      await authApi.signup({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        avatarFileName: form.avatarFileName.trim(),
      });

      setPendingEmail(form.email.trim());
      navigate("/auth/set-password");
    } catch (error) {
      setFormError(error.message || "Unable to create account right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage
      title="Sign up"
      description="Let’s get you all set up so you can access your personal account."
      headerAlign="center"
      maxWidth="max-w-[760px]"
      titleClassName="text-[30px] sm:text-[36px] md:text-[40px]"
      descriptionClassName="mx-auto max-w-[620px] text-[15px] sm:text-[16px]"
      contentClassName="pt-1"
    >
      <form onSubmit={handleSubmit} className="mx-auto mt-1 w-full max-w-full space-y-5 sm:w-155">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <AuthField
            label="First Name"
            value={form.firstName}
            onChange={handleChange("firstName")}
            error={errors.firstName}
            placeholder="john.doe@gmail.com"
            className="w-full"
          />

          <AuthField
            label="Last Name"
            value={form.lastName}
            onChange={handleChange("lastName")}
            error={errors.lastName}
            placeholder="john.doe@gmail.com"
            className="w-full"
          />
        </div>

        <AuthField
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
          placeholder="john.doe@gmail.com"
          className="w-full"
        />

        <AuthField
          label="Phone no"
          type="text"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={handleChange("phone")}
          error={errors.phone}
          placeholder="+92 6728769"
          className="w-full"
        />

        <div className="relative w-full">
          <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-[12px] font-medium leading-none text-[#4B4B4B] sm:text-[13px]">
            Upload image file
          </label>

          <button
            type="button"
            onClick={handleFilePick}
            className={`flex h-13 w-full items-center justify-between rounded-sm border bg-transparent px-4 text-left transition sm:h-13.5 ${
              errors.avatarFileName ? "border-[#D56352]" : "border-[#D8D8D8]"
            }`}
          >
            <span
              className={`truncate text-[15px] font-medium sm:text-[16px] ${
                form.avatarFileName ? "text-[#232323]" : "text-[#8A8A8A]"
              }`}
            >
              {form.avatarFileName || "Choose file"}
            </span>

            <Upload className="h-6 w-6 shrink-0 text-[#232323]" strokeWidth={2} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {errors.avatarFileName ? (
            <p className="mt-2 text-[12px] font-medium text-[#D56352]">
              {errors.avatarFileName}
            </p>
          ) : null}
        </div>

        <div className="pt-1">
          <AuthCheckboxField
            checked={form.agree}
            onChange={handleChange("agree")}
            className="items-start"
          >
            <span className="leading-normal">
              I agree to all the <span className="text-[#D56352]">Terms</span> and{" "}
              <span className="text-[#D56352]">Privacy Policies</span>
            </span>
          </AuthCheckboxField>

          {errors.agree ? (
            <p className="mt-2 text-[12px] font-medium text-[#D56352]">
              {errors.agree}
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
          Create account
        </AuthSubmitButton>

        <p className="pt-1 text-center text-[15px] font-medium text-[#232323] sm:text-[16px]">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#D56352]">
            Login
          </Link>
        </p>
      </form>
    </AuthPage>
  );
}