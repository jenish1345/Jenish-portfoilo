import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Returns a ref to attach to the trigger element.
 * Registers a GSAP ScrollTrigger animation and cleans up on unmount.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animationFn: (el: T, trigger: T) => gsap.core.Tween | gsap.core.Timeline | void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const anim = animationFn(el, el);
    return () => {
      if (anim) anim.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export { gsap, ScrollTrigger };
