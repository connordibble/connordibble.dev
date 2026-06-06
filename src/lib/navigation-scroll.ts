export const pendingScrollTargetKey = "connordibble-pending-scroll-target";

export function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollToSection(targetId: string) {
  document
    .getElementById(targetId)
    ?.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
}

export function clearCurrentHash() {
  if (!window.location.hash) return;
  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}

export function getPendingScrollTarget(): string | null {
  try {
    return sessionStorage.getItem(pendingScrollTargetKey);
  } catch {
    return null;
  }
}

export function setPendingScrollTarget(targetId: string) {
  try {
    sessionStorage.setItem(pendingScrollTargetKey, targetId);
  } catch {
    // A navigation to home still gives the user a sensible fallback.
  }
}

export function clearPendingScrollTarget() {
  try {
    sessionStorage.removeItem(pendingScrollTargetKey);
  } catch {
    // Ignore storage failures; the scroll target is progressive enhancement.
  }
}
