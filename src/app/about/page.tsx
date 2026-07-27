import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SectionLabel } from "@/components/section-label";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About | Connor Dibble",
  description:
    "Connor Dibble on technical direction, developer platforms, agent context, and the operating systems behind durable software.",
  path: "/about",
});

const notes = [
  {
    title: "Engineering Taste",
    body: "I like boring force multipliers: clear boundaries, APIs that are hard to misuse, context close to the work, invariants enforced in the layer that can guarantee them, and delivery models that make the correct path the easiest one.",
  },
  {
    title: "Working Style",
    body: "I tend to start with evidence and the people closest to the problem. Then I make the tradeoffs explicit, choose the smallest architecture that preserves the important guarantees, and leave behind enough context, tooling, and feedback loops for the system to outgrow my direct involvement.",
  },
  {
    title: "Outside the Editor",
    body: "I’m 6′8″, so basketball found me early, but I’ll play or watch nearly any sport. I’m training for my first half marathon and still enjoy losing an evening to a PC build. An earlier chapter was Fukuoka, Japan, where I led volunteer trainings in Japanese and taught English to 100+ students. Family is the anchor.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="container-wide pt-32 pb-10 sm:pt-36 sm:pb-14">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
          <h1 className="mt-6 max-w-3xl text-[3rem] font-semibold leading-[1.02] text-text text-pretty sm:text-[4.25rem]">
            About me
          </h1>
          <div className="mt-6 max-w-[65ch] space-y-5 text-body text-text-muted leading-relaxed text-pretty">
            <p>
              I set technical direction across the statefarm.com Digital
              Experience suite: 8 product teams and 40–50 engineers and
              analysts. SFDS reaches beyond that area as a governed developer
              platform and the standard migration path for more than 100
              product teams. It carries shared architecture, documentation,
              release policy, and supported implementation paths to 1000+
              engineers and designers. I lead platform initiatives from
              discovery through adoption, mentor engineers, and help teams turn
              local solutions into durable shared systems.
            </p>
            <p>
              I’m happiest when a problem is technically deep and
              organizationally messy. I trace it far enough to find the real
              constraint, whether it lives in a system contract, a data
              invariant, missing repository context, a delivery model, or the
              economics of a service at scale. The implementation matters, as
              do the migration path, governance, observability, and explanation.
              A platform earns trust when an engineer can integrate it, an agent
              can follow its boundaries, and a leader can understand how it is
              operated.
            </p>
            <p>
              Through Proceris and public tools such as dibble and
              agent-readiness-kit, I stay close to the full product loop:
              finding a painful workflow, talking with prospective users,
              building across the stack, and packaging the context and checks
              that make AI-assisted work reviewable across agent environments
              and CI.
            </p>
          </div>
        </section>

        <section className="container-wide py-14 sm:py-20">
          <SectionLabel mark="rings">What I Care About</SectionLabel>
          <div className="mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
            {notes.map((note) => (
              <section
                key={note.title}
                className="border-t border-border pt-4"
              >
                <h3 className="font-mono text-caption text-text">
                  {note.title}
                </h3>
                <p className="mt-3 text-body-small leading-relaxed text-text-muted text-pretty">
                  {note.body}
                </p>
              </section>
            ))}
          </div>
          <div className="mt-10 max-w-5xl border-t border-border pt-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <p className="max-w-2xl text-body-small leading-relaxed text-text-muted text-pretty">
              For a deeper look at how I think and what I ship, my writing and
              resume are the best next stops.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
              <Link
                href="/writing"
                className="pill-link surface-link inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text"
              >
                <span>Writing</span>
                <span aria-hidden>→</span>
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-link surface-link inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text"
              >
                <span>Resume</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
