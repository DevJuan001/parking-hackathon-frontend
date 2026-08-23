import { useEffect, useState } from "react";

export function useMediaQuery(mediaQuery) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(mediaQuery).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(mediaQuery);
    const onChange = (e) => setMatches(e.matches);
    
    mql.addEventListener("change", onChange);
    
    return () => mql.removeEventListener("change", onChange);
  }, [mediaQuery]);

  return matches;
}
