"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
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
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="whitespace-nowrap font-mono text-caption text-text hover:text-accent transition-colors duration-150"
        >
          Connor Dibble
        </a>

        <ul className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-caption text-text-muted hover:text-accent transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="sm:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-text hover:text-accent transition-colors duration-150"
        >
          <Hamburger open={open} />
        </button>
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
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-mono text-body text-text hover:text-accent transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <motion.span
        className="absolute inset-x-0 top-1/2 block h-px bg-current"
        initial={false}
        animate={open ? { y: 0, rotate: 45 } : { y: -5, rotate: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.span
        className="absolute inset-x-0 top-1/2 block h-px bg-current"
        initial={false}
        animate={open ? { y: 0, rotate: -45 } : { y: 5, rotate: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </span>
  );
}
