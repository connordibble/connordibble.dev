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
    <section id="contact" className="container-wide py-12 sm:py-16">
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
