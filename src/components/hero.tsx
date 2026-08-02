import { BrandMark } from "./brand-mark";
import { PillLink } from "./pill-link";

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
    note: "Web + mobile alignment",
  },
  {
    label: "AI enablement",
    value: "Context · skills · deterministic gates",
    note: "Local hooks · CI pipelines",
  },
];

export function Hero() {
  return (
    <>
      <section
        id="top"
        className="container-wide relative isolate pt-28 pb-40 sm:pt-32 sm:pb-44"
      >
        <BrandMark className="pointer-events-none absolute right-[-7rem] top-12 -z-10 h-[30rem] w-[30rem] text-border opacity-20 sm:right-[-10rem] sm:top-10 sm:h-[37rem] sm:w-[37rem] sm:opacity-25 lg:right-[-13rem] lg:top-4 lg:h-[43rem] lg:w-[43rem]" />
        <div className="max-w-4xl">
          <h1 className="font-editorial max-w-[12ch] text-[4rem] font-normal leading-[0.9] text-text text-pretty sm:text-[6rem] lg:text-[7rem]">
            Connor Dibble
          </h1>
          <p className="mt-6 max-w-[34rem] text-balance font-mono text-caption text-accent">
            Senior Software Engineer / Digital Experience Platform Lead
          </p>
          <p className="mt-2 max-w-[34rem] text-balance font-mono text-caption text-text-subtle">
            Frontend platforms / technical direction / applied AI
          </p>
          <p className="mt-5 max-w-[41rem] text-body leading-relaxed text-text-muted text-pretty">
            I set frontend technical direction across the statefarm.com Digital
            Experience suite: 8 product teams and 50+ engineers. I steward
            SFDS, a governed developer platform used by 1000+ engineers and
            designers, and help keep shared customer experiences coherent across
            web, mobile, and internal surfaces. My current work also includes
            AI-assisted development workflows and platform controls that help
            teams use AI effectively without losing reviewability or system
            intent.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <PillLink href="/writing" label="Writing" />
            <PillLink
              href="https://github.com/connordibble"
              label="GitHub"
              external
            />
            <PillLink href="/resume.pdf" label="Resume" external />
          </div>
        </div>
      </section>

      <aside
        className="container-wide pb-8 sm:pb-10"
        aria-labelledby="current-work-heading"
      >
        <div className="pb-3">
          <h2
            id="current-work-heading"
            className="font-mono text-caption text-text-subtle"
          >
            Current work
          </h2>
        </div>
        <dl className="divide-y divide-border border-y border-border">
          {currentWork.map((item) => (
            <div
              key={item.label}
              className="grid gap-1 py-4 sm:grid-cols-[minmax(8rem,0.7fr)_minmax(0,1.25fr)_minmax(9rem,0.75fr)] sm:items-baseline sm:gap-5"
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
