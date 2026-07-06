import { PillLink } from "./pill-link";
import { SectionLabel } from "./section-label";

type WritingContactProps = {
  essayTitle?: string;
  className?: string;
};

const linkedinHref = "https://www.linkedin.com/in/connor-j-dibble";

export function WritingContact({
  essayTitle,
  className = "",
}: WritingContactProps) {
  const subject = essayTitle
    ? `Comparing notes on ${essayTitle}`
    : "Comparing notes on your writing";
  const emailHref = `mailto:dibbleconnor@gmail.com?subject=${encodeURIComponent(subject)}`;

  return (
    <section
      className={[
        "max-w-3xl",
        className,
      ].join(" ")}
    >
      <SectionLabel mark="triangle" rule={false}>
        Compare notes
      </SectionLabel>
      <p className="mt-5 max-w-2xl text-body-small leading-relaxed text-text-muted text-pretty">
        {essayTitle
          ? "If this essay connects to a problem you’re working through, I’m always glad to compare notes on the approach, tradeoffs, or where your experience differs."
          : "Working through a similar problem in system design, platform engineering, or applied AI? I’m always looking to compare notes on approaches, tradeoffs, and what worked in practice."}
      </p>
      <ul className="mt-6 flex flex-wrap gap-3">
        <li>
          <PillLink
            href={emailHref}
            label="Email me"
            ariaLabel={
              essayTitle
                ? `Email Connor Dibble about ${essayTitle}`
                : "Email Connor Dibble about his writing"
            }
          />
        </li>
        <li>
          <PillLink
            href={linkedinHref}
            label="Connect on LinkedIn"
            ariaLabel="Connect with Connor Dibble on LinkedIn"
          />
        </li>
      </ul>
    </section>
  );
}
