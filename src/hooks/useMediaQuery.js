import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export const useIsTouchDevice = () => useMediaQuery("(pointer: coarse)");
export const useIsMobile = () => useMediaQuery("(max-width: 720px)");
export const useIsTablet = () => useMediaQuery("(max-width: 1024px)");
