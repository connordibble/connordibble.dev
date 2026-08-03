import Link from "next/link";
import { BrandMark } from "./brand-mark";

const currentWork = [
  {
    label: "Technical direction",
    value: "statefarm.com Digital Experience",
    note: "8 teams · 50+ engineers",
  },
  {
    label: "Enterprise platform",
    value: "SFDS · 100+ product teams",
    note: "1000+ engineers & designers",
  },
  {
    label: "Frontend platform",
    value: "Web Components · cross-framework architecture",
    note: "Web + mobile",
  },
  {
    label: "AI tooling",
    value: "Agent context · skills · checks",
    note: "Local hooks · CI",
  },
];

export function Hero() {
  return (
    <>
      <section
        id="top"
        className="container-wide home-hero relative isolate overflow-clip pt-28 pb-24 sm:pt-36 sm:pb-28"
      >
        <BrandMark className="home-hero-mark pointer-events-none absolute -z-10 text-border" />
        <div className="home-hero-grid relative grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-start lg:gap-24">
          <div className="home-hero-title min-w-0">
            <p className="font-mono text-caption text-accent">
              Frontend platforms / design systems / AI-assisted development
            </p>
            <h1 className="mt-6 max-w-[12ch] font-editorial text-[4rem] font-normal leading-[0.9] text-text text-pretty sm:text-[6rem] lg:text-[7rem]">
              Connor Dibble
            </h1>
            <div className="mt-7 max-w-[22rem]">
              <p className="font-mono text-caption text-text">
                Senior Software Engineer / Digital Experience Platform Lead
              </p>
              <p className="mt-2 font-mono text-caption text-text-subtle">
                Frontend architecture / design systems / technical direction
              </p>
            </div>
          </div>
          <div className="home-hero-summary min-w-0 lg:pt-1">
            <p className="max-w-[41rem] text-body leading-relaxed text-text-muted text-pretty">
              I set frontend direction for statefarm.com across 8 product teams
              and 50+ engineers. I steward SFDS, a shared platform used by 100+
              teams and 1,000+ engineers and designers. I also build
              AI-assisted tools that keep generated code reviewable.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/writing"
                className="arrow-link text-link inline-flex min-h-11 items-center gap-1 whitespace-nowrap font-mono text-caption text-text-muted"
              >
                <span>Writing</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://github.com/connordibble"
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link text-link inline-flex min-h-11 items-center gap-1 whitespace-nowrap font-mono text-caption text-text-muted"
              >
                <span>GitHub</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link text-link inline-flex min-h-11 items-center gap-1 whitespace-nowrap font-mono text-caption text-text-muted"
              >
                <span>Resume</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <aside
        className="container-wide current-work pt-8 pb-8 sm:pt-10 sm:pb-10"
        aria-labelledby="current-work-heading"
      >
        <div className="current-work-heading pb-3">
          <h2
            id="current-work-heading"
            className="font-mono text-caption text-text-subtle"
          >
            Current work
          </h2>
        </div>
        <dl className="current-work-list divide-y divide-border border-y border-border">
          {currentWork.map((item) => (
            <div
              key={item.label}
              className="current-work-row grid gap-1 py-4 sm:grid-cols-[minmax(8rem,0.7fr)_minmax(0,1.25fr)_minmax(9rem,0.75fr)] sm:items-baseline sm:gap-5"
            >
              <dt className="font-mono text-caption text-text-subtle">
                {item.label}
              </dt>
              <dd className="min-w-0 text-body-small text-text">
                {item.value}
              </dd>
              <dd className="min-w-0 font-mono text-caption text-text-subtle">
                {item.note}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </>
  );
}
