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
    "A more personal view of Connor Dibble’s engineering taste, working style, and interests beyond the portfolio.",
  path: "/about",
});

const notes = [
  {
    title: "Engineering Taste",
    body: "I like boring force multipliers: clear boundaries, APIs that are hard to misuse, invariants enforced in the layer that can actually guarantee them, and delivery models that make the correct path the easiest one.",
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
              I lead the statefarm.com Digital Experience suite across 8
              product teams and 40-50 engineers, and steward SFDS, an
              enterprise design system used by 1000+ engineers and designers. I
              started on customer-facing telematics products, working across
              frontend applications, backend services, and event-driven
              integrations before moving into platform work shared by many
              products and teams. The through-line is finding the decisions that
              help teams move faster without giving up reliability,
              accessibility, or long-term control. A lot of that work is
              teaching: per-framework migration guides, weekly office hours,
              and a network of design and engineering champions embedded
              across the org.
            </p>
            <p>
              I’m happiest when a problem is both technically deep and
              organizationally messy. I like tracing it far enough to find the
              real constraint, whether it lives in a component boundary, a data
              invariant, a delivery model, or the economics of a system at
              scale. The implementation matters, but so do the discovery,
              migration path, operating model, and explanation. Good platform
              work has to make sense to the engineer integrating it, the
              designer evolving it, and the leader deciding whether to trust
              it.
            </p>
            <p>
              Through Proceris, I build small AI products and stay close to the
              full product loop: finding a painful workflow, talking with
              prospective users, building across the stack, and learning
              whether an idea earns its way into someone’s work.
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
