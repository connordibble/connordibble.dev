import { FooterRings } from "./footer-rings";

export function Footer() {
  return (
    <footer className="relative isolate bg-shell border-t border-border">
      <FooterRings />
      <div className="container-wide relative z-10 py-10 sm:py-12">
        <p className="font-mono text-caption text-text-subtle">
          © 2026 Connor Dibble
        </p>
      </div>
    </footer>
  );
}
