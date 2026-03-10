import { LazyMotion, domAnimation } from "framer-motion";
import QueryProvider from "./QueryProvider";
import ToastProvider from "./ToastProvider";
import { usePrefersReducedMotion } from "../../shared/hooks/usePrefersReducedMotion";
import { useEffect } from "react";

export default function AppProviders({ children }) {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    // disable smooth scroll when prefers-reduced-motion
    document.documentElement.style.scrollBehavior = reduce ? "auto" : "smooth";
  }, [reduce]);

  return (
    <QueryProvider>
      <ToastProvider>
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </ToastProvider>
    </QueryProvider>
  );
}
