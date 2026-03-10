
import { createContext, useCallback, useMemo, useState } from "react";
import { cn } from "../../shared/lib/cn";

const ToastCtx = createContext(null);

export function useToast() {
  return React.useContext(ToastCtx);
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((toast) => {
    const id = crypto.randomUUID();
    const item = { id, type: "info", title: "", message: "", ...toast };
    setToasts((t) => [...t, item]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, item.duration || 2500);
  }, []);

  const api = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="fixed right-4 top-4 z-[100] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "w-[320px] rounded-xl border border-border bg-card px-4 py-3 shadow-soft"
            )}
          >
            {t.title ? <div className="text-sm font-semibold">{t.title}</div> : null}
            {t.message ? <div className="text-sm text-muted">{t.message}</div> : null}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}