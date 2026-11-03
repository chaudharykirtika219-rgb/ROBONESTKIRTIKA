"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Ensures route transitions in Next.js App Router reset virtual scroll position
 * smoothly and predictably, while preserving targeted anchor links if present.
 */
function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        lenis.scrollTo(target as HTMLElement, { immediate: true });
        return;
      }
    }

    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false, // Maintain native, responsive 1:1 mobile touch physics
        anchors: true, // Smooth scroll to in-page #hash targets
        stopInertiaOnNavigate: true, // Stop momentum on page change
      }}
    >
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}

export default SmoothScrollProvider;

