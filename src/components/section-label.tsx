import type { ReactNode } from "react";
import { SectionMark, type SectionMarkVariant } from "./section-mark";

type SectionLabelProps = {
  children: ReactNode;
  mark?: SectionMarkVariant;
  rule?: boolean;
  /**
   * Render as a plain element instead of a heading. Use "p" when the label is
   * an eyebrow above an h1 (detail pages), so the document heading order
   * never starts h2 -> h1.
   */
  as?: "h2" | "p";
};

export function SectionLabel({
  children,
  mark,
  rule = true,
  as: Tag = "h2",
}: SectionLabelProps) {
  if (Tag === "p") {
    return (
      <div className="inline-flex items-center gap-2">
        {mark ? <SectionMark variant={mark} /> : null}
        <Tag className="font-mono text-caption text-text-subtle">
          {children}
        </Tag>
      </div>
    );
  }

  return (
    <div
      className={[
        "flex items-start justify-between gap-6",
        rule ? "border-t border-border pt-5" : "",
      ].join(" ")}
    >
      <Tag className="max-w-2xl text-headline font-semibold text-text text-pretty">
        {children}
      </Tag>
      {mark ? (
        <span className="mt-1 shrink-0">
          <SectionMark variant={mark} />
        </span>
      ) : null}
    </div>
  );
}
