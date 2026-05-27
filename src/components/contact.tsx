import { PillLink } from "./pill-link";
import { SectionLabel } from "./section-label";

type ContactLink = {
  href: string;
  label: string;
  external: boolean;
  ariaLabel: string;
};

const links: ContactLink[] = [
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
    <section
      id="contact"
      className="container-wide relative isolate py-16 sm:py-24"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-0 -z-10 hidden h-64 w-64 text-border-strong opacity-50 md:block"
      >
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="99" />
      </svg>
      <SectionLabel mark="triangle">Contact</SectionLabel>
      <ul className="mt-8 flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <PillLink
              href={link.href}
              label={link.label}
              external={link.external}
              ariaLabel={link.ariaLabel}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
