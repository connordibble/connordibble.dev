import { FooterRings } from "./footer-rings";

/** The rings bleed well above the footer itself, so dense pages (the writing
 * index) opt out to keep decoration from layering under controls. */
export function Footer({ rings = true }: { rings?: boolean }) {
  return (
    <footer className="relative bg-shell border-t border-border">
      {rings ? <FooterRings /> : null}
      <div className="container-wide relative z-10 py-12 sm:py-16">
        <p className="max-w-4xl text-headline font-semibold leading-tight text-text text-balance">
          Build systems people can still reason about.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:mt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-caption text-text-subtle">
            Connor Dibble / {new Date().getFullYear()}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
            <a
              href="mailto:dibbleconnor@gmail.com"
              className="text-link whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
            >
              Email
            </a>
            <a
              href="https://github.com/connordibble"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/connor-j-dibble"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
