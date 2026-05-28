type PillLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  ariaLabel?: string;
};

export function PillLink({ href, label, external, ariaLabel }: PillLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="pill-link inline-flex items-center gap-2 rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text transition-colors duration-150"
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}
