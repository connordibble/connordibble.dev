import Link from "next/link";
import { SectionLabel } from "./section-label";

export function About() {
  return (
    <section id="about" className="container-wide site-section pt-14 pb-10 sm:pt-[4.5rem] sm:pb-12">
      <SectionLabel mark="rings">Systems that hold together</SectionLabel>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-5">
          <p className="max-w-[32rem] text-body leading-relaxed text-text">
            The useful work is usually between layers: product intent, system
            contracts, and the teams that inherit both.
          </p>
          <p className="max-w-[34rem] text-body text-text-muted leading-relaxed text-pretty">
            I&apos;m a software engineer who likes problems that cross layers:
            product workflows, frontend architecture, APIs and data contracts,
            delivery infrastructure, and the organizational work required to
            make a platform last.
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
          At State Farm, I lead the statefarm.com Digital Experience platform
          and steward SFDS, serving 1000+ engineers and designers across
          customer, agent, and internal products. My path here includes React
          and Angular applications, Java and Node.js services, event-driven
          systems, and applied AI tooling. Through Proceris, I also build small
          AI products and stay close to product discovery, customer
          conversations, and the full arc from idea to working software.
        </p>
      </div>
    </section>
  );
}
