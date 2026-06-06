"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  clearPendingScrollTarget,
  getPendingScrollTarget,
  scrollToSection,
} from "@/lib/navigation-scroll";

export function RouteScrollManager() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }

    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const targetId = getPendingScrollTarget();
    if (pathname === "/" && targetId) {
      clearPendingScrollTarget();
      requestAnimationFrame(() => {
        scrollToSection(targetId);
      });
      return;
    }
    if (targetId) clearPendingScrollTarget();

    if (window.location.hash) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  return null;
}
