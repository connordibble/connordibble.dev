import { SectionLabel } from "./section-label";

const links = [
  {
    href: "mailto:dibbleconnor@gmail.com",
    label: "Email",
    external: false,
    ariaLabel: "Email Connor Dibble",
  },
  {
    href: "/resume.pdf",
    label: "Resume",
    external: true,
    ariaLabel: "Open Connor Dibble resume PDF",
  },
  {
    href: "https://github.com/connordibble",
    label: "GitHub",
    external: true,
    ariaLabel: "View Connor Dibble on GitHub",
  },
  {
    href: "https://www.linkedin.com/in/connor-j-dibble",
    label: "LinkedIn",
    external: true,
    ariaLabel: "View Connor Dibble on LinkedIn",
  },
];

export function Contact() {
  return (
    <section id="contact" className="container-wide py-16 sm:py-24">
      <SectionLabel>Contact</SectionLabel>
      <ul className="mt-8 flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-label={link.ariaLabel}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text transition-colors duration-150 hover:border-border-strong hover:text-accent"
            >
              <span>{link.label}</span>
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
