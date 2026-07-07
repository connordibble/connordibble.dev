import Link from "next/link";
import { SectionLabel } from "./section-label";

export function About() {
  return (
    <section id="about" className="container-wide site-section pt-10 pb-8 sm:pt-12 sm:pb-10">
      <SectionLabel mark="rings" rule={false}>
        Systems that hold together
      </SectionLabel>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-5">
          <p className="max-w-[32rem] text-body leading-relaxed text-text">
            At State Farm, I lead the statefarm.com Digital Experience platform
            across 8 product teams and 40-50 engineers, and steward SFDS for
            1000+ engineers and designers.
          </p>
          <p className="max-w-[34rem] text-body text-text-muted leading-relaxed text-pretty">
            The useful work sits between product intent, system contracts, and
            the teams that inherit both. I like problems that cross frontend
            architecture, APIs and data contracts, delivery infrastructure, and
            the operating model required to make a platform last.
          </p>
          <Link
            href="/about"
            className="arrow-link text-link inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
          >
            <span>More about me</span>
            <span aria-hidden>
              →
            </span>
          </Link>
        </div>
        <p className="max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
          My path here runs through React and Angular applications, Java and
          Node.js services, event-driven systems, release governance, and
          applied AI tooling. Through Proceris and open source, I stay close to
          the full product loop: customer conversations, technical discovery,
          implementation, and the checks that keep software understandable
          after launch.
        </p>
      </div>
    </section>
  );
}
