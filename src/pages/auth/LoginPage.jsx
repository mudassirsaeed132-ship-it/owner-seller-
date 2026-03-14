// PATH: src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthCheckboxField,
  AuthField,
  AuthPage,
  AuthPasswordField,
  AuthSubmitButton,
} from "../../app/layout/AuthShell";
import { authApi } from "../../features/auth/api/authApi";
import { useAuthStore } from "../../features/auth/model/authStore";

const ROUTES = {
  forgotPassword: "/auth/forgot-password",
  signup: "/auth/signup",
  seller: "/seller",
  sellerVerification: "/onboarding/seller-verification",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function validateLoginForm(form) {
  const nextErrors = {};
  const email = form.email.trim();
  const password = form.password.trim();

  if (!email) {
    nextErrors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!password) {
    nextErrors.password = "Password is required.";
  }

  return nextErrors;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const loginSuccess = useAuthStore((state) => state.loginSuccess);
  const clearTransientFlow = useAuthStore((state) => state.clearTransientFlow);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = Boolean(
    form.email.trim() &&
      form.password.trim() &&
      EMAIL_REGEX.test(form.email.trim()) &&
      !loading
  );

  const handleChange = (key) => (event) => {
    const value =
      key === "rememberMe" ? event.target.checked : event.target.value;

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const nextErrors = validateLoginForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = {
      email: form.email.trim(),
      password: form.password.trim(),
      rememberMe: form.rememberMe,
    };

    try {
      setLoading(true);
      setFormError("");

      const response = await authApi.login(payload);

      if (!response?.user) {
        throw new Error("Invalid login response.");
      }

      loginSuccess(response);
      clearTransientFlow();

      if (!response.user.isSellerVerified) {
        navigate(ROUTES.sellerVerification, { replace: true });
        return;
      }

      navigate(ROUTES.seller, { replace: true });
    } catch (error) {
      setFormError(error?.message || "Unable to login right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage
      title="Login"
      description="Login to access your account"
      headerAlign="center"
      maxWidth="max-w-[540px]"
      titleClassName="text-[32px] sm:text-[36px] md:text-[40px]"
      descriptionClassName="text-[15px] sm:text-[16px]"
      contentClassName="pt-1"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto mt-1 w-full max-w-135 space-y-6"
      >
        <AuthField
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
          placeholder="john.doe@gmail.com"
          className="w-full min-w-0"
        />

        <AuthPasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange("password")}
          error={errors.password}
          className="w-full min-w-0"
        />

        <div className="flex items-center justify-between gap-6 pt-2 text-[14px] font-medium text-[#232323] sm:text-[16px]">
          <AuthCheckboxField
            checked={form.rememberMe}
            onChange={handleChange("rememberMe")}
          >
            Remember me
          </AuthCheckboxField>

          <Link
            to={ROUTES.forgotPassword}
            className="whitespace-nowrap text-[#D56352] transition hover:text-[#cb5948]"
          >
            Forgot Password
          </Link>
        </div>

        {formError ? (
          <p
            className="text-[13px] font-medium text-[#D56352]"
            role="alert"
            aria-live="polite"
          >
            {formError}
          </p>
        ) : null}

        <AuthSubmitButton
          disabled={!canSubmit}
          loading={loading}
          className="mt-3 w-full"
        >
          Login
        </AuthSubmitButton>

        <p className="pt-0 text-center text-[15px] font-medium text-[#232323] sm:text-[16px]">
          Don’t have an account?{" "}
          <Link to={ROUTES.signup} className="text-[#D56352]">
            Sign up
          </Link>
        </p>
      </form>
    </AuthPage>
  );
}
