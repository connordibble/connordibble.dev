import { BrandMark } from "./brand-mark";
import { PillLink } from "./pill-link";

const currentWork = [
  {
    label: "Platform",
    value: "statefarm.com Digital Experience",
    note: "Enterprise web platform",
  },
  {
    label: "Open source",
    value: "dibble agent-tooling collection",
    note: "Agent craft and checks",
  },
  {
    label: "Independent lab",
    value: "Proceris AI product work",
    note: "Product discovery",
  },
];

export function Hero() {
  return (
    <section
      id="top"
      className="container-wide relative isolate pt-32 pb-8 sm:pt-36 sm:pb-10 lg:pt-40"
    >
      <BrandMark className="pointer-events-none absolute right-[-7rem] top-12 -z-10 h-[30rem] w-[30rem] text-border opacity-20 sm:right-[-10rem] sm:top-10 sm:h-[37rem] sm:w-[37rem] sm:opacity-25 lg:right-[-13rem] lg:top-4 lg:h-[43rem] lg:w-[43rem]" />
      <div className="max-w-4xl">
        <h1 className="font-editorial max-w-[12ch] text-[4rem] font-normal leading-[0.9] text-text text-pretty sm:text-[6rem] lg:text-[7rem]">
          Connor Dibble
        </h1>
        <p className="mt-6 max-w-[34rem] text-balance font-mono text-caption text-accent">
          Platform engineering / design systems / AI tooling
        </p>
        <p className="mt-5 max-w-[41rem] text-body leading-relaxed text-text-muted text-pretty">
          I lead the statefarm.com Digital Experience platform across 8 product
          teams and steward SFDS for 1000+ engineers and designers. I also
          build open-source agent tooling and small AI products where product
          workflows need to become reliable software.
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

      <aside className="mt-12 sm:mt-14" aria-labelledby="current-work-heading">
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
    </section>
  );
}
