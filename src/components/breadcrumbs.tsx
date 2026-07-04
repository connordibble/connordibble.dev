import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type Crumb = {
  label: string;
  /** Omit on the final crumb (the current page). */
  href?: string;
};

/**
 * Breadcrumb trail for nested routes. The last item renders as the current
 * page (non-link, aria-current); every other item links toward home. Emits a
 * schema.org BreadcrumbList alongside the visible nav.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-caption text-text-muted">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-1.5"
            >
              {!isCurrent && item.href ? (
                <Link
                  href={item.href}
                  className="text-link whitespace-nowrap transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="block max-w-[14rem] truncate text-text-subtle sm:max-w-[28rem]"
                >
                  {item.label}
                </span>
              )}
              {!isCurrent ? (
                <span aria-hidden className="text-text-subtle">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        // Escape "<" so labels can never terminate the script element early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </nav>
  );
}
