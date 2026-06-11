import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "About — Connor Dibble",
  description:
    "A more personal view of Connor Dibble's engineering taste, working style, and interests beyond the portfolio.",
};

const notes = [
  {
    title: "Engineering Taste",
    body: "I like boring leverage: component APIs and service contracts that are hard to misuse, distribution models that make upgrades survivable, documentation that stays close to the source of truth, and validation that catches drift before review.",
  },
  {
    title: "Working Style",
    body: "People tend to pull me into ambiguous platform problems: choose the distribution model, define the API boundary, draw the line between atom and pattern, make the migration path realistic, and write down enough context that teams can move without a meeting.",
  },
  {
    title: "Outside the Editor",
    body: "I'm training for my first half marathon, I'll watch almost any sport, and I still like the hardware side of computers enough that a PC build can steal an evening. Family is the anchor.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="container-wide pt-20 pb-8 sm:pt-28 sm:pb-10">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
          <h1 className="mt-6 text-[40px] font-semibold tracking-tight text-text text-pretty sm:text-display">
            About Connor
          </h1>
          <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
            I&apos;ve spent most of my career at State Farm, moving from
            product engineering on Drive Safe &amp; Save telematics into design
            systems and now leading the statefarm.com Digital Experience suite.
            I&apos;m drawn to the infrastructure between design and engineering:
            web components, design tokens, GraphQL/REST contracts, Figma
            tooling, agent workflows, and the governance decisions that either
            make the right path obvious or leave every team to rediscover the
            same problems. Outside work, Proceris is where I test small AI
            product ideas around the documentation and compliance overhead that
            quietly slows engineering teams down.
          </p>
        </section>

        <section className="container-wide py-12 sm:py-16">
          <SectionLabel mark="rings">What I Care About</SectionLabel>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {notes.map((note) => (
              <section
                key={note.title}
                className="grid gap-3 py-6 sm:grid-cols-[180px_1fr] sm:gap-8"
              >
                <h2 className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
                  {note.title}
                </h2>
                <p className="text-body-small leading-relaxed text-text-muted text-pretty">
                  {note.body}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section className="container-wide pb-16 sm:pb-24">
          <SectionLabel mark="triangle">Elsewhere</SectionLabel>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/writing"
              className="pill-link inline-flex items-center gap-2 rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text transition-colors duration-150"
            >
              <span>Writing</span>
              <span aria-hidden>→</span>
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-link inline-flex items-center gap-2 rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text transition-colors duration-150"
            >
              <span>Resume</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
