import { useEffect, useState } from "react";

// Tracks a CSS media query so inline-styled components can respond to screen size.
export function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    // Safari < 14 only has the old addListener API
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

// Phone-width screens
export const useIsNarrow = () => useMedia("(max-width: 640px)");
// Touchscreen as the main input (phones, tablets)
export const useIsTouch = () => useMedia("(hover: none) and (pointer: coarse)");
// Hover effects only make sense with a real mouse; on touch they get "stuck" after a tap
export const useCanHover = () => useMedia("(hover: hover)");
