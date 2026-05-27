import type { ReactNode } from "react";
import { SectionMark, type SectionMarkVariant } from "./section-mark";

type SectionLabelProps = {
  children: ReactNode;
  mark?: SectionMarkVariant;
};

export function SectionLabel({ children, mark }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      {mark ? <SectionMark variant={mark} /> : null}
      <h2 className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
        {children}
      </h2>
    </div>
  );
}
