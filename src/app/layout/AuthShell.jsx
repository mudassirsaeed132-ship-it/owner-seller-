import { useId, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { m } from "framer-motion";
import { cn } from "../../shared/lib/cn";
import authLogo from "../../assets/images/auth/auth-logo.png";

const labelClass =
  "pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-[12px] font-medium leading-none text-[#4B4B4B] sm:text-[13px]";

export default function AuthShell() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-360 items-center justify-center px-4 py-6 sm:px-6 md:px-8">
        <div className="w-full min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function AuthPage({
  title,
  description,
  children,
  showBrand = true,
  showPowered = true,
  backTo = "",
  backLabel = "Back to login",
  headerAlign = "center",
  maxWidth = "max-w-[500px]",
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
}) {
  return (
    <div className={cn("mx-auto w-full min-w-0", maxWidth)}>
      {showBrand ? (
        <div className="mb-8 flex justify-center sm:mb-10">
          <img
            src={authLogo}
            alt="Real Estate"
            className="h-auto w-37.5 select-none sm:w-50 md:w-55"
          />
        </div>
      ) : null}

      {backTo ? (
        <div className="mb-5">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#232323] transition hover:text-[#D56352]"
          >
            <ArrowLeft size={17} />
            {backLabel}
          </Link>
        </div>
      ) : null}

      <div
        className={cn(
          "mb-7",
          headerAlign === "left" ? "text-left" : "text-center"
        )}
      >
        <h1
          className={cn(
            "text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#181818] sm:text-[36px] md:text-[40px]",
            titleClassName
          )}
        >
          {title}
        </h1>

        {description ? (
          <p
            className={cn(
              "mt-3 text-[15px] leading-[1.45] text-[#6A6A6A] sm:text-[16px]",
              descriptionClassName
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      <div className={contentClassName}>{children}</div>

      {showPowered ? (
        <p className="mt-8 text-center text-[14px] font-medium text-[#6B6B6B] sm:mt-10 sm:text-[15px]">
          Powered by Zync AI Solutions
        </p>
      ) : null}
    </div>
  );
}

export function AuthField({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  autoComplete,
  error = "",
  rightSlot = null,
  className = "",
  inputClassName = "",
  disabled = false,
  maxLength,
  inputMode,
}) {
  const inputId = useId();

  return (
    <div className={cn("relative", className)}>
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>

      <div
        className={cn(
          "flex h-13 w-full items-center rounded-sm border bg-transparent px-4 transition focus-within:border-[#D56352] sm:h-13.5",
          error ? "border-[#D56352]" : "border-[#D8D8D8]"
        )}
      >
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          maxLength={maxLength}
          inputMode={inputMode}
          className={cn(
            "h-full w-full border-0 bg-transparent text-[15px] font-medium text-[#232323] outline-none placeholder:text-[#8A8A8A] sm:text-[16px]",
            inputClassName
          )}
        />
        {rightSlot ? <div className="ml-3 shrink-0">{rightSlot}</div> : null}
      </div>

      {error ? (
        <p className="mt-2 text-[12px] font-medium text-[#D56352]">{error}</p>
      ) : null}
    </div>
  );
}

export function AuthPasswordField({
  label,
  value,
  onChange,
  name,
  autoComplete = "current-password",
  error = "",
  className = "",
  placeholder = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthField
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      name={name}
      autoComplete={autoComplete}
      error={error}
      className={className}
      placeholder={placeholder}
      rightSlot={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="inline-flex items-center justify-center text-[#202020] transition hover:text-[#D56352]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" strokeWidth={2.2} />
          ) : (
            <Eye className="h-5 w-5" strokeWidth={2.2} />
          )}
        </button>
      }
    />
  );
}

export function AuthCheckboxField({
  checked,
  onChange,
  children,
  className = "",
}) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-3 text-[14px] font-medium text-[#232323] sm:text-[15px]",
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4.5 w-4.5 rounded-sm border border-[#222222] accent-[#D56352]"
      />
      <span>{children}</span>
    </label>
  );
}

export function AuthSubmitButton({
  children,
  disabled = false,
  loading = false,
  className = "",
  type = "submit",
  onClick,
}) {
  return (
    <m.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.01, y: -1 }}
      whileTap={disabled || loading ? {} : { scale: 0.985 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "inline-flex h-13.5 w-full items-center justify-center rounded-full bg-[#D56352] px-6 text-[17px] font-semibold text-white transition hover:bg-[#cb5948] disabled:cursor-not-allowed disabled:opacity-55 sm:h-14 sm:text-[18px]",
        className
      )}
    >
      {loading ? "Please wait..." : children}
    </m.button>
  );
}
