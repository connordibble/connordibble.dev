"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Theme = "dark" | "light";

const themeStorageKey = "connordibble-theme";
const themeChangeEvent = "connordibble-theme-change";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-shell/95 backdrop-blur-sm",
        "border-b transition-[border-color] duration-150 ease-out",
        scrolled || open ? "border-border" : "border-transparent",
      ].join(" ")}
    >
      <nav className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="whitespace-nowrap font-mono text-caption text-text hover:text-accent transition-colors duration-150"
        >
          Connor Dibble
        </Link>

        <ul className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-caption text-text-muted hover:text-accent transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:ml-1">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="sm:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-text hover:text-accent transition-colors duration-150"
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
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.22,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            className="sm:hidden overflow-hidden bg-shell"
          >
            <ul className="container-wide flex flex-col py-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.18,
                    ease: "easeOut",
                    delay:
                      open && !shouldReduceMotion ? 0.05 + i * 0.025 : 0,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-mono text-body text-text hover:text-accent transition-colors duration-150"
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
      className="theme-toggle group relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-text-muted transition-[background-color,color,transform] duration-150 active:scale-[0.96] active:bg-border active:text-accent aria-pressed:text-accent"
    >
      <SunIcon
        className={[
          "absolute h-4 w-4 transition-all duration-150",
          theme === "light" ? "scale-100 opacity-100" : "scale-75 opacity-0",
        ].join(" ")}
      />
      <MoonIcon
        className={[
          "absolute h-4 w-4 transition-all duration-150",
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
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
      />
      <motion.span
        className="absolute inset-x-0 top-1/2 block h-px bg-current"
        initial={false}
        animate={open ? { y: 0, rotate: -45 } : { y: 5, rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
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
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14.75 13.36c-4.02.58-7.44-2.84-6.86-6.86.12-.83.42-1.61.86-2.29.22-.34-.1-.75-.48-.62A6.73 6.73 0 0 0 3.8 10a6.7 6.7 0 0 0 6.7 6.7 6.73 6.73 0 0 0 6.41-4.47c.13-.38-.28-.7-.62-.48-.68.44-1.46.74-2.29.86Z" />
    </svg>
  );
}
