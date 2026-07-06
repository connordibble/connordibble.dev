"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  clearCurrentHash,
  clearPendingScrollTarget,
  getScrollBehavior,
  scrollToSection,
  setPendingScrollTarget,
} from "@/lib/navigation-scroll";

type Theme = "dark" | "light";
type NavLink =
  | { href: string; label: string; type: "route" }
  | { href: `/#${string}`; label: string; targetId: string; type: "section" };

const themeStorageKey = "connordibble-theme";
const themeChangeEvent = "connordibble-theme-change";
const mobileMenuScrollDelayMs = 240;

const links: NavLink[] = [
  { href: "/about", label: "About", type: "route" },
  { href: "/projects", label: "Projects", type: "route" },
  { href: "/writing", label: "Writing", type: "route" },
  {
    href: "/#experience",
    label: "Experience",
    targetId: "experience",
    type: "section",
  },
  { href: "/#skills", label: "Skills", targetId: "skills", type: "section" },
  {
    href: "/#contact",
    label: "Contact",
    targetId: "contact",
    type: "section",
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (isModifiedClick(event)) return;

    clearPendingScrollTarget();
    if (pathname !== "/") return;

    event.preventDefault();
    clearCurrentHash();
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  };

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    const shouldWaitForMenuExit = open && shouldReduceMotion !== true;

    setOpen(false);
    if (isModifiedClick(event)) return;

    event.preventDefault();
    clearCurrentHash();
    setPendingScrollTarget(targetId);

    if (pathname === "/") {
      const scroll = () => {
        clearPendingScrollTarget();
        scrollToSection(targetId);
      };

      if (shouldWaitForMenuExit) {
        window.setTimeout(scroll, mobileMenuScrollDelayMs);
        return;
      }

      requestAnimationFrame(scroll);
      return;
    }

    router.push("/", { scroll: false });
  };

  return (
    <header
      className="site-nav-wrap"
    >
      <nav
        className="site-nav-shell flex items-center justify-between gap-3 px-3 sm:px-4"
        data-scrolled={scrolled || open ? "true" : undefined}
        aria-label="Primary"
      >
        <Link
          href="/"
          onClick={handleHomeClick}
          aria-label="Connor Dibble home"
          title="Connor Dibble"
          className="text-link group inline-flex h-11 min-w-11 items-center justify-center whitespace-nowrap rounded-full px-2 text-text transition-[color,transform] duration-150 active:translate-y-px"
        >
          <span aria-hidden="true" className="font-editorial text-[1.125rem] leading-none">
            CD
          </span>
        </Link>

        <ul className="hidden items-center gap-5 lg:flex">
          {links.map((link) => {
            const active = isActiveRoute(link, pathname);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={
                    link.type === "section"
                      ? (event) => handleSectionClick(event, link.targetId)
                      : () => setOpen(false)
                  }
                  className={[
                    "text-link whitespace-nowrap font-mono text-caption transition-colors duration-150",
                    active ? "text-text" : "text-text-muted",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="text-link -mr-1 inline-flex h-11 w-11 items-center justify-center rounded-sm text-text transition-colors duration-150 lg:hidden"
          >
            <Hamburger open={open} reduceMotion={shouldReduceMotion} />
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="site-mobile-panel mt-2 overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col px-3 py-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.18,
                    ease: [0.16, 1, 0.3, 1],
                    delay:
                      open && !shouldReduceMotion ? 0.05 + i * 0.025 : 0,
                  }}
                >
                  <Link
                    href={link.href}
                    aria-current={
                      isActiveRoute(link, pathname) ? "page" : undefined
                    }
                    onClick={
                      link.type === "section"
                        ? (event) => handleSectionClick(event, link.targetId)
                        : () => setOpen(false)
                    }
                    className="text-link block whitespace-nowrap py-4 font-mono text-body text-text transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function isActiveRoute(link: NavLink, pathname: string): boolean {
  return (
    link.type === "route" &&
    (pathname === link.href || pathname.startsWith(`${link.href}/`))
  );
}

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  );
}

function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "light"}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => {
        applyTheme(nextTheme);
      }}
      className="theme-toggle group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm text-text-muted transition-[background-color,color,transform] duration-150 active:scale-[0.96] active:bg-border active:text-accent aria-pressed:text-accent"
    >
      <SunIcon
        className={[
          "absolute h-4 w-4 transition-[opacity,transform] duration-150",
          theme === "light" ? "scale-100 opacity-100" : "scale-75 opacity-0",
        ].join(" ")}
      />
      <MoonIcon
        className={[
          "absolute h-[1.125rem] w-[1.125rem] transition-[opacity,transform] duration-150",
          theme === "dark" ? "scale-100 opacity-100" : "scale-75 opacity-0",
        ].join(" ")}
      />
    </button>
  );
}

function subscribeTheme(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onPreferenceChange = () => {
    if (getStoredTheme()) return;
    setThemeAttribute(media.matches ? "light" : "dark");
    onStoreChange();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey) return;
    setThemeAttribute(getStoredTheme() ?? getSystemTheme());
    onStoreChange();
  };

  window.addEventListener(themeChangeEvent, onStoreChange);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onPreferenceChange);
  queueMicrotask(onStoreChange);

  return () => {
    window.removeEventListener(themeChangeEvent, onStoreChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onPreferenceChange);
  };
}

function getThemeSnapshot(): Theme {
  return getCurrentTheme();
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(themeStorageKey);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function setThemeAttribute(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function applyTheme(theme: Theme) {
  setThemeAttribute(theme);
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Theme persistence is nice-to-have; the visible theme still updates.
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

function Hamburger({
  open,
  reduceMotion,
}: {
  open: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <motion.span
        className="absolute inset-x-0 top-1/2 block h-px bg-current"
        initial={false}
        animate={open ? { y: 0, rotate: 45 } : { y: -5, rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="absolute inset-x-0 top-1/2 block h-px bg-current"
        initial={false}
        animate={open ? { y: 0, rotate: -45 } : { y: 5, rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="10" cy="10" r="3.25" />
      <path d="M10 2.75V1.5" />
      <path d="M10 18.5v-1.25" />
      <path d="m4.2 4.2-.9-.9" />
      <path d="m16.7 16.7-.9-.9" />
      <path d="M2.75 10H1.5" />
      <path d="M18.5 10h-1.25" />
      <path d="m4.2 15.8-.9.9" />
      <path d="m16.7 3.3-.9.9" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
