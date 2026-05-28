import Link from "next/link";

type PillLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  ariaLabel?: string;
};

const className =
  "pill-link inline-flex items-center gap-2 rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text transition-colors duration-150";

export function PillLink({ href, label, external, ariaLabel }: PillLinkProps) {
  const labelContent = (
    <>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </>
  );

  if (!external && href.startsWith("/")) {
    return (
      <Link href={href} aria-label={ariaLabel} className={className}>
        {labelContent}
      </Link>
    );
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {labelContent}
    </a>
  );
}
