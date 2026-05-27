export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-shell border-t border-border">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 -z-10 h-40 w-40 -translate-y-1/2 text-border-strong opacity-50 sm:right-8 sm:h-52 sm:w-52 md:h-64 md:w-64"
      >
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="99" />
      </svg>
      <div className="container-wide py-12 sm:py-16">
        <p className="font-mono text-caption text-text-subtle">
          © 2026 Connor Dibble
        </p>
      </div>
    </footer>
  );
}
