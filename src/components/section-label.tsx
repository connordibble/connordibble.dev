import type { ReactNode } from "react";
import { SectionMark, type SectionMarkVariant } from "./section-mark";

type SectionLabelProps = {
  children: ReactNode;
  mark?: SectionMarkVariant;
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
  as: Tag = "h2",
}: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      {mark ? <SectionMark variant={mark} /> : null}
      <Tag className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
        {children}
      </Tag>
    </div>
  );
}
