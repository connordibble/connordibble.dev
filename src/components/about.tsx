import Link from "next/link";
import { SectionLabel } from "./section-label";

export function About() {
  return (
    <section id="about" className="container-wide pt-8 pb-10 sm:pt-10 sm:pb-14">
      <SectionLabel mark="rings">About</SectionLabel>
      <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
        I&apos;m a software engineer who likes problems that cross layers:
        product workflows, frontend architecture, APIs and data contracts,
        delivery infrastructure, and the organizational work required to make a
        platform last. At State Farm, I lead the statefarm.com Digital
        Experience platform and steward SFDS, serving 1000+ engineers and
        designers across customer, agent, and internal products. My path here
        includes React and Angular applications, Java and Node.js services,
        event-driven systems, and applied AI tooling. Through Proceris, I also
        build small AI products and stay close to product discovery, customer
        conversations, and the full arc from idea to working software.
      </p>
      <Link
        href="/about"
        className="arrow-link text-link mt-5 inline-flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors duration-150"
      >
        <span>More about me</span>
        <span aria-hidden>
          →
        </span>
      </Link>
    </section>
  );
}
