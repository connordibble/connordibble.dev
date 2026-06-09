import { BrandMark } from "./brand-mark";
import { PillLink } from "./pill-link";

export function Hero() {
  return (
    <section
      id="top"
      className="container-wide relative isolate overflow-hidden pt-20 pb-8 sm:pt-28 sm:pb-10"
    >
      <BrandMark
        className="pointer-events-none absolute top-3 right-[-2.25rem] -z-10 h-64 w-64 text-border opacity-[0.14] sm:top-8 sm:right-[-1.5rem] sm:h-72 sm:w-72 md:hidden"
      />
      <BrandMark
        className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden h-80 w-80 -translate-y-1/2 text-border-strong opacity-50 md:block"
      />
      <p className="text-body-small text-text-subtle">
        Senior Software Engineer, Frontend Platform & Design Systems
      </p>
      <h1 className="mt-3 text-[40px] sm:text-display font-semibold tracking-tight text-text text-pretty">
        Connor Dibble
      </h1>
      <p className="mt-6 max-w-144 text-body text-text-muted leading-relaxed text-pretty">
        Enterprise design systems, AI tooling, and product platforms that turn
        design intent into reliable, production-ready software.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <PillLink href="/writing" label="Writing" />
        <PillLink
          href="https://github.com/connordibble"
          label="GitHub"
          external
        />
        <PillLink href="/resume.pdf" label="Resume" external />
      </div>
    </section>
  );
}
