import { useEffect, useRef } from "react";

export function useClickOutside(onOutside) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(e.target)) onOutside?.();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onOutside]);

  return ref;
}
