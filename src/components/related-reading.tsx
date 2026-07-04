import Link from "next/link";
import { SectionLabel } from "./section-label";
import type { RelatedItem } from "@/lib/related";

const cardClass = [
  "writing-card-link surface-link relative block h-full rounded-md border border-border bg-panel p-5",
].join(" ");

const arrowClass =
  "writing-card-link-arrow pointer-events-none absolute right-4 top-4 font-mono text-caption text-text-muted opacity-0 transition-[color,opacity,transform] duration-200";

function CardBody({ item }: { item: RelatedItem }) {
  return (
    <>
      <span aria-hidden className={arrowClass}>
        {item.external ? (
          <span className="block origin-center -rotate-45">→</span>
        ) : (
          "→"
        )}
      </span>
      <p className="font-mono text-caption text-text-subtle">
        {item.eyebrow}
      </p>
      <h3 className="mt-2 pr-6 text-section-title font-medium text-text text-pretty">
        {item.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-body-small text-text-muted leading-relaxed text-pretty">
        {item.blurb}
      </p>
    </>
  );
}

export function RelatedReading({ items }: { items: RelatedItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16 max-w-3xl border-t border-border pt-10">
      <SectionLabel mark="rings">Related</SectionLabel>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) =>
          item.external ? (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                <CardBody item={item} />
              </a>
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href} className={cardClass}>
                <CardBody item={item} />
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
