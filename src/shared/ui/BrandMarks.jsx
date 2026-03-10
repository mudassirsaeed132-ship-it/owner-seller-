// PATH: src/shared/ui/BrandMarks.jsx
import authLogo from "../../assets/images/auth/auth-logo.png";

/** Google "G" mark (multi-color) */
export function GoogleG({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.26 1.54 7.69 2.83l5.25-5.25C33.71 4.18 29.33 2 24 2 14.61 2 6.54 7.38 2.87 15.1l6.31 4.9C11.13 13.44 17.05 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46 24.5c0-1.57-.14-3.08-.4-4.5H24v9h12.3c-.53 2.86-2.12 5.28-4.51 6.92l6.9 5.35C42.64 37.64 46 31.63 46 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M9.18 28c-.46-1.36-.73-2.82-.73-4.33 0-1.51.27-2.97.73-4.33l-6.31-4.9C1.03 17.67 0 20.73 0 23.67 0 26.61 1.03 29.67 2.87 32.9l6.31-4.9z"
      />
      <path
        fill="#34A853"
        d="M24 45c5.33 0 9.82-1.76 13.09-4.78l-6.9-5.35c-1.91 1.29-4.35 2.06-6.19 2.06-6.95 0-12.87-3.94-14.82-9.5l-6.31 4.9C6.54 40.62 14.61 45 24 45z"
      />
    </svg>
  );
}

/** Filled Apple mark */
export function AppleFilled({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.8 13.1c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3.1-1.9-3.8-1.9-1.6-.2-3.1.9-3.9.9-.8 0-2.1-.9-3.5-.9-1.8 0-3.5 1-4.4 2.6-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.1.9 3.6.9 1.5 0 2.5-1.3 3.4-2.6 1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-2.9-4z"
      />
      <path
        fill="currentColor"
        d="M14.7 4.6c.8-1 1.3-2.4 1.1-3.8-1.2.1-2.7.8-3.5 1.8-.7.8-1.3 2.2-1.1 3.5 1.3.1 2.7-.6 3.5-1.5z"
      />
    </svg>
  );
}

export function VisaCardIcon({ className = "h-6 w-6", stroke = "#D06050" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7.5h12.5c1.1 0 2 .9 2 2v8.5c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9.5c0-1.1.9-2 2-2Z" />
        <path d="M2.5 10h15.7" />
        <path d="M6 16h4.5" />
      </g>
    </svg>
  );
}

/** Brand logo (Auth header etc.) */
export default function BrandMarks({ className = "", imgClassName = "h-14 w-auto" }) {
  return (
    <div className={["flex justify-center", className].join(" ")}>
      <img src={authLogo} alt="REAL ESTATE" className={imgClassName} draggable={false} />
    </div>
  );
}