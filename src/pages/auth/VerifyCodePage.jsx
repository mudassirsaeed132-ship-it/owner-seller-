import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AuthField,
  AuthPage,
  AuthSubmitButton,
} from "../../app/layout/AuthShell";
import { authApi } from "../../features/auth/api/authApi";
import { useAuthStore } from "../../features/auth/model/authStore";

export default function VerifyCodePage() {
  const navigate = useNavigate();
  const authFlow = useAuthStore((state) => state.authFlow);
  const pendingEmail = useAuthStore((state) => state.pendingEmail);
  const loginSuccess = useAuthStore((state) => state.loginSuccess);

  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isForgotPasswordFlow = useMemo(
    () => authFlow === "forgot-password",
    [authFlow]
  );

  useEffect(() => {
    if (!pendingEmail) {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate, pendingEmail]);

  const canSubmit = Boolean(code.trim());

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      setError("Verification code is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFormError("");
      setResendMessage("");

      const response = await authApi.verifyCode({
        email: pendingEmail,
        code: code.trim(),
        flow: authFlow || "signup",
      });

      if ((authFlow || "signup") === "signup") {
        if (response?.token && response?.user) {
          loginSuccess(response);
        }

        navigate("/onboarding/seller-verification", { replace: true });
        return;
      }

      navigate("/auth/set-password", { replace: true });
    } catch (err) {
      setFormError(err.message || "Unable to verify code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!pendingEmail) return;

    try {
      setFormError("");
      setResendMessage("");

      await authApi.resendCode({
        email: pendingEmail,
        flow: authFlow || "signup",
      });

      setResendMessage("A new code has been sent.");
    } catch (err) {
      setFormError(err.message || "Unable to resend code.");
    }
  };

  return (
    <AuthPage
      title="Verify code"
      description="An authentication code has been sent to your email."
      backTo={isForgotPasswordFlow ? "/auth/login" : undefined}
      headerAlign="left"
      maxWidth="max-w-[540px]"
      titleClassName="text-[30px] sm:text-[36px] md:text-[40px]"
      descriptionClassName="max-w-[620px] text-[15px] sm:text-[16px]"
      contentClassName="pt-1"
    >
      <form onSubmit={handleSubmit} className="mx-auto mt-1 w-full max-w-full space-y-5 sm:w-[620px]">
        <AuthField
          label="Enter Code"
          type={showCode ? "text" : "password"}
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError("");
            setFormError("");
          }}
          error={error}
          placeholder="7789BM6X"
          maxLength={12}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowCode((prev) => !prev)}
              className="inline-flex items-center justify-center text-[#202020] transition hover:text-[#D56352]"
              aria-label={showCode ? "Hide code" : "Show code"}
            >
              {showCode ? (
                <Eye className="h-5 w-5" strokeWidth={2.2} />
              ) : (
                <EyeOff className="h-5 w-5" strokeWidth={2.2} />
              )}
            </button>
          }
        />

        <div className="text-[14px] font-medium text-[#232323] sm:text-[15px]">
          Didn’t receive a code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-[#D56352] transition hover:text-[#cb5948]"
          >
            Resend
          </button>
        </div>

        {resendMessage ? (
          <p className="text-[13px] font-medium text-[#1F8B4C]">{resendMessage}</p>
        ) : null}

        {formError ? (
          <p className="text-[13px] font-medium text-[#D56352]">{formError}</p>
        ) : null}

        <AuthSubmitButton disabled={!canSubmit} loading={loading} className="mt-2 w-full">
          Verify
        </AuthSubmitButton>
      </form>
    </AuthPage>
  );
}