import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "./section-label";

const reviewStages = [
  {
    step: "01",
    title: "Intent",
    description: "Normalize semantics, states, and tokens.",
  },
  {
    step: "02",
    title: "Mapping",
    description: "Map intent to a component and its props.",
  },
  {
    step: "03",
    title: "Decision",
    description: "Accept, edit, or reject before export.",
  },
] as const;

export function DesignRailWorkbench() {
  return (
    <section
      id="designrail"
      aria-labelledby="designrail-heading"
      className="container-wide site-section workbench-section pt-12 pb-12 sm:pt-20 sm:pb-16"
    >
      <div className="workbench-intro">
        <SectionLabel as="p" mark="triangle" rule={false}>
          DesignRail / open source
        </SectionLabel>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(18rem,0.72fr)] lg:items-end lg:gap-12">
          <h2
            id="designrail-heading"
            className="workbench-heading max-w-[14ch] font-editorial text-[2.75rem] font-normal leading-[0.98] text-text text-pretty sm:text-[4rem]"
          >
            Review before export.
          </h2>
          <div className="min-w-0 lg:pb-1">
            <p className="max-w-[34rem] text-body-small leading-relaxed text-text-muted text-pretty">
              DesignRail adds a review step before generated UI becomes
              exportable. Inspect the mapping, its findings, and the final
              decision in one place.
            </p>
            <Link
              href="/projects/designrail"
              className="arrow-link text-link mt-5 inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
            >
              <span>Read the case study</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="workbench-shell mt-10 grid min-w-0 gap-8 rounded-md border border-border bg-panel p-4 sm:mt-12 sm:p-6 lg:grid-cols-[minmax(13rem,0.56fr)_minmax(0,1.75fr)] lg:gap-10 lg:p-8">
        <div className="workbench-copy flex min-w-0 flex-col">
          <div>
            <p className="font-mono text-caption text-accent">What the reviewer sees</p>
            <p className="mt-3 max-w-[28rem] text-body-small leading-relaxed text-text-muted text-pretty">
              Proposed mapping, findings, and the decision before export.
            </p>
          </div>

          <ol className="workbench-stages mt-8" aria-label="DesignRail review sequence">
            {reviewStages.map((stage, index) => (
              <li
                key={stage.step}
                className={[
                  "workbench-stage relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3",
                  index < reviewStages.length - 1 ? "pb-7" : "",
                ].join(" ")}
              >
                {index < reviewStages.length - 1 ? (
                  <span aria-hidden className="workbench-stage-line" />
                ) : null}
                <span className="workbench-stage-number font-mono text-caption text-text-subtle">
                  {stage.step}
                </span>
                <div className="min-w-0">
                  <h3 className="font-medium text-body-small text-text">{stage.title}</h3>
                  <p className="mt-1 max-w-[18rem] text-caption leading-relaxed text-text-subtle">
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-auto max-w-[28rem] border-t border-border pt-5 font-mono text-caption leading-relaxed text-text-subtle">
            Only accepted or edited mappings export.
          </p>
        </div>

        <figure className="workbench-figure min-w-0">
          <Link
            href="/projects/designrail"
            aria-label="Open the DesignRail case study"
            className="workbench-image-link surface-link relative block overflow-hidden rounded-sm border border-border-strong bg-canvas"
          >
            <Image
              src="/projects/designrail-review.jpg"
              width={1728}
              height={1040}
              sizes="(max-width: 1023px) 92vw, 64vw"
              alt="DesignRail review workspace showing source intent, a recommended component mapping, compliance findings, and a human decision."
              className="h-auto w-full"
            />
            <span aria-hidden className="workbench-callout workbench-callout-intent">
              source intent
            </span>
            <span aria-hidden className="workbench-callout workbench-callout-mapping">
              proposed mapping
            </span>
            <span aria-hidden className="workbench-callout workbench-callout-decision">
              human decision
            </span>
          </Link>
          <figcaption className="mt-3 max-w-[65ch] font-mono text-caption leading-relaxed text-text-subtle">
            Intent, mapping, findings, and decision share one review surface.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
