import Link from "next/link";
import { SectionLabel } from "./section-label";

const practices = [
  {
    heading: "Keep project knowledge in the repository",
    body: "I package recurring instructions as portable skills and enforce repeatable rules with scripts. In dibble, the same checks can run from an agent hook, a terminal, or CI.",
    href: "/projects/dibble",
    label: "dibble",
  },
  {
    heading: "Verify the result in the application",
    body: "Section One checks published stories and links against the accepted edition and exercises team pages in a browser. Passing those checks still leaves a separate question: does the reporting support the copy?",
    href: "/projects/section-one",
    label: "Section One",
  },
  {
    heading: "Make approval part of the product",
    body: "DesignRail lets a reviewer inspect a proposed component mapping, resolve findings, and record a decision before export. The decision has a place in the application, beyond an instruction in a prompt.",
    href: "/projects/designrail",
    label: "DesignRail",
  },
  {
    heading: "Measure the cost of maintaining it",
    body: "For Section One, I’m evaluating expansion through review effort, corrections, and model usage. The product is live; unattended weekly publishing and demonstrated model savings are still ahead.",
    href: "/writing/the-cost-of-the-next-team",
    label: "The Cost of the Next Team",
  },
];

// Retain the existing section anchor for links from earlier homepage versions.
export function PrototypePlatformTrace() {
  return (
    <section
      id="platform-trace"
      aria-labelledby="agent-engineering-heading"
      className="container-wide site-section scroll-mt-28 border-b border-border pt-12 pb-12 sm:pt-20 sm:pb-16"
    >
      <SectionLabel as="p" rule={false}>
        Engineering practice
      </SectionLabel>
      <h2
        id="agent-engineering-heading"
        className="mt-5 max-w-2xl text-headline font-medium leading-tight text-text text-pretty"
      >
        How I build with agents
      </h2>
      <p className="mt-5 max-w-2xl text-body leading-relaxed text-text-muted text-pretty">
        I give coding agents project context and ways to check their work.
        These projects show how I handle verification and human decisions,
        and what I still need to measure.
      </p>
      <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {practices.map((practice) => (
          <div key={practice.href} className="min-w-0 border-t border-border pt-5">
            <h3 className="text-section-title font-medium leading-snug text-text text-pretty">
              {practice.heading}
            </h3>
            <p className="mt-3 text-body-small leading-relaxed text-text-muted text-pretty">
              {practice.body}
            </p>
            <Link
              href={practice.href}
              className="text-link mt-3 inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-mono text-caption text-text-muted"
            >
              <span>{practice.label}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
