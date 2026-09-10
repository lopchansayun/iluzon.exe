import { createContext, useContext, useMemo, useRef, useState } from "react";

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [variant, setVariant] = useState("default"); // default | ring | view
  const [label, setLabel] = useState("");
  const revertTimeout = useRef(null);

  const api = useMemo(
    () => ({
      variant,
      label,
      setDefault: () => {
        clearTimeout(revertTimeout.current);
        setVariant("default");
        setLabel("");
      },
      setRing: () => {
        clearTimeout(revertTimeout.current);
        setVariant("ring");
      },
      setView: (text = "View") => {
        clearTimeout(revertTimeout.current);
        setVariant("view");
        setLabel(text);
      },
    }),
    [variant, label]
  );

  return <CursorContext.Provider value={api}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    // Safe no-op fallback so components work even without a provider
    // (e.g. in isolated tests).
    return { variant: "default", label: "", setDefault() {}, setRing() {}, setView() {} };
  }
  return ctx;
}
