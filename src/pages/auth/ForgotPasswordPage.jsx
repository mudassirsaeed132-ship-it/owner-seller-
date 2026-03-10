import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthField,
  AuthPage,
  AuthSubmitButton,
} from "../../app/layout/AuthShell";
import { authApi } from "../../features/auth/api/authApi";
import { useAuthStore } from "../../features/auth/model/authStore";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const setAuthFlow = useAuthStore((state) => state.setAuthFlow);
  const setPendingEmail = useAuthStore((state) => state.setPendingEmail);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthFlow("forgot-password");
  }, [setAuthFlow]);

  const canSubmit = Boolean(email.trim());

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFormError("");

      await authApi.forgotPassword({
        email: email.trim(),
      });

      setPendingEmail(email.trim());
      navigate("/auth/verify-code");
    } catch (err) {
      setFormError(err.message || "Unable to continue right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage
      title="Forgot your password?"
      description="Don’t worry, happens to all of us. Enter your email below to recover your password"
      backTo="/auth/login"
      headerAlign="left"
      maxWidth="max-w-[540px]"
      descriptionClassName="max-w-[520px]"
      titleClassName="text-[30px] sm:text-[36px] md:text-[40px]"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
            setFormError("");
          }}
          error={error}
          placeholder="john.doe@gmail.com"
        />

        {formError ? (
          <p className="text-[13px] font-medium text-[#D56352]">{formError}</p>
        ) : null}

        <AuthSubmitButton disabled={!canSubmit} loading={loading}>
          Submit
        </AuthSubmitButton>
      </form>
    </AuthPage>
  );
}