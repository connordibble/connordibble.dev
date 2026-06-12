import { FooterRings } from "./footer-rings";

/** The rings bleed well above the footer itself, so dense pages (the writing
 * index) opt out to keep decoration from layering under controls. */
export function Footer({ rings = true }: { rings?: boolean }) {
  return (
    <footer className="relative bg-shell border-t border-border">
      {rings ? <FooterRings /> : null}
      <div className="container-wide relative z-10 py-10 sm:py-12">
        <p className="font-mono text-caption text-text-subtle">
          © {new Date().getFullYear()} Connor Dibble
        </p>
      </div>
    </footer>
  );
}
