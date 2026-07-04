import { BrandMark } from "./brand-mark";
import { PillLink } from "./pill-link";

export function Hero() {
  return (
    <section
      id="top"
      className="container-wide relative isolate pt-32 pb-14 sm:pt-36 sm:pb-[4.5rem] lg:pt-40"
    >
      <BrandMark className="pointer-events-none absolute right-[-8.5rem] top-6 -z-10 h-[30rem] w-[30rem] text-border opacity-20 sm:right-[-10rem] sm:top-4 sm:h-[34rem] sm:w-[34rem] sm:opacity-25 lg:right-[-8rem] lg:top-8 lg:h-[39rem] lg:w-[39rem] lg:opacity-30" />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end">
        <div className="min-w-0">
          <p className="font-mono text-caption text-text-subtle">
            Platform engineering / design systems / AI tooling
          </p>
          <h1 className="mt-5 max-w-4xl text-[3.25rem] font-semibold leading-[0.95] text-text text-pretty sm:text-[4.5rem] lg:text-[5.25rem]">
            Connor Dibble
          </h1>
          <p className="mt-7 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
            Most of my work sits where product workflows become software. I
            build design systems, AI-assisted implementation workflows, and
            developer-facing tools that help large engineering orgs move from
            design intent to production code safely.
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
        </div>

        <aside className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="font-mono text-caption text-text-subtle">
            Current work
          </p>
          <dl className="mt-5 grid gap-5">
            <div>
              <dt className="font-mono text-caption text-text-subtle">
                Platform
              </dt>
              <dd className="mt-1 text-body-small text-text">
                statefarm.com Digital Experience
              </dd>
            </div>
            <div>
              <dt className="font-mono text-caption text-text-subtle">
                Open source
              </dt>
              <dd className="mt-1 text-body-small text-text">
                dibble agent-tooling collection
              </dd>
            </div>
            <div>
              <dt className="font-mono text-caption text-text-subtle">
                Independent lab
              </dt>
              <dd className="mt-1 text-body-small text-text">
                Proceris AI product work
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
