import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
      {children}
    </h2>
  );
}
