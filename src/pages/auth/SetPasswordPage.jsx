import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthPage,
  AuthPasswordField,
  AuthSubmitButton,
} from "../../app/layout/AuthShell";
import { authApi } from "../../features/auth/api/authApi";
import { useAuthStore } from "../../features/auth/model/authStore";

export default function SetPasswordPage() {
  const navigate = useNavigate();

  const authFlow = useAuthStore((state) => state.authFlow);
  const pendingEmail = useAuthStore((state) => state.pendingEmail);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pendingEmail) {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate, pendingEmail]);

  const passwordsMatch = useMemo(() => {
    if (!password || !confirmPassword) return false;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const canSubmit = Boolean(
    password.trim() && confirmPassword.trim() && passwordsMatch
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please re-enter your password.";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      setFormError("");

      await authApi.setPassword({
        email: pendingEmail,
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
        flow: authFlow || "signup",
      });

      if ((authFlow || "signup") === "signup") {
        navigate("/auth/verify-code", { replace: true });
        return;
      }

      navigate("/auth/login", { replace: true });
    } catch (err) {
      setFormError(err.message || "Unable to set password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage
      title="Set a password"
      description="Your previous password has been reseted. Please set a new password for your account."
      headerAlign="left"
      maxWidth="max-w-[540px]"
      titleClassName="text-[30px] sm:text-[36px] md:text-[40px]"
      descriptionClassName="max-w-[620px] text-[15px] sm:text-[16px]"
      contentClassName="pt-1"
    >
      <form onSubmit={handleSubmit} className="mx-auto mt-1 w-full max-w-full space-y-6 sm:w-[620px]">
        <AuthPasswordField
          label="Create Password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
            setFormError("");
          }}
          error={errors.password}
          className="w-full"
        />

        <AuthPasswordField
          label="Re-enter Password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            setFormError("");
          }}
          error={errors.confirmPassword}
          className="w-full"
        />

        {password && confirmPassword && !passwordsMatch ? (
          <p className="text-[13px] font-medium text-[#D56352]">
            Passwords must match before continuing.
          </p>
        ) : null}

        {formError ? (
          <p className="text-[13px] font-medium text-[#D56352]">{formError}</p>
        ) : null}

        <AuthSubmitButton disabled={!canSubmit} loading={loading} className="mt-2 w-full">
          Set password
        </AuthSubmitButton>
      </form>
    </AuthPage>
  );
}