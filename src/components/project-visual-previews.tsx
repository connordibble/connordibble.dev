import Image from "next/image";

export function DesignRailProjectPreview() {
  return (
    <section
      aria-labelledby="designrail-preview-heading"
      className="project-preview-shell project-preview-designrail"
    >
      <div className="project-preview-copy">
        <p className="font-mono text-caption text-accent">Review surface / DesignRail</p>
        <h2
          id="designrail-preview-heading"
          className="mt-4 max-w-[20ch] text-headline font-medium leading-tight text-text text-pretty"
        >
          Keep intent, mapping, and the decision visible.
        </h2>
        <p className="mt-4 max-w-[32rem] text-body-small leading-relaxed text-text-muted text-pretty">
          One frame gives the reviewer enough context to make a decision before
          generated UI becomes exportable.
        </p>
        <ol className="project-preview-flow mt-8" aria-label="DesignRail review trace">
          {[
            ["01", "Intent"],
            ["02", "Mapping"],
            ["03", "Findings"],
            ["04", "Decision"],
          ].map(([step, label]) => (
            <li key={step}>
              <span>{step}</span>
              <strong>{label}</strong>
            </li>
          ))}
        </ol>
      </div>
      <figure className="project-preview-figure">
        <a
          href="/projects/designrail-review.jpg"
          aria-label="Open the full-size DesignRail review workspace"
          className="surface-link block overflow-hidden rounded-sm border border-border-strong bg-canvas"
        >
          <Image
            src="/projects/designrail-review.jpg"
            width={1728}
            height={1040}
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 76vw, 52vw"
            alt="DesignRail review workspace showing source intent, a recommended component mapping, compliance findings, and a human decision."
            className="h-auto w-full"
            priority
          />
        </a>
        <figcaption className="mt-3 max-w-[65ch] font-mono text-caption leading-relaxed text-text-subtle">
          The review workspace keeps source intent, the proposed mapping,
          compliance findings, and the human decision in one auditable view.
        </figcaption>
      </figure>
    </section>
  );
}

export function AgentConventionProjectPreview() {
  return (
    <section
      aria-labelledby="agent-feedback-preview-heading"
      className="project-preview-shell project-preview-feedback"
    >
      <div className="project-preview-copy">
        <p className="font-mono text-caption text-accent">
          Convention pilot / feedback platform
        </p>
        <h2
          id="agent-feedback-preview-heading"
          className="mt-4 max-w-[20ch] text-headline font-medium leading-tight text-text text-pretty"
        >
          Keep the pattern attached to the words behind it.
        </h2>
        <p className="mt-4 max-w-[32rem] text-body-small leading-relaxed text-text-muted text-pretty">
          Themes are useful when leaders can still trace them back to the
          feedback that produced them.
        </p>
      </div>

      <div className="project-feedback-board" aria-label="Feedback evidence loop">
        <div className="project-feedback-board-header">
          <span>Evidence loop</span>
          <span>Live pilot</span>
        </div>
        <ol className="project-feedback-flow">
          {[
            ["01", "Signal captured"],
            ["02", "Theme synthesized"],
            ["03", "Source quote retained"],
            ["04", "Team action"],
          ].map(([step, label]) => (
            <li key={step}>
              <span>{step}</span>
              <strong>{label}</strong>
            </li>
          ))}
        </ol>
        <div className="project-feedback-metrics">
          <div>
            <strong>800+</strong>
            <span>datapoints</span>
          </div>
          <div>
            <strong>197</strong>
            <span>participants</span>
          </div>
          <div>
            <strong>10,000+</strong>
            <span>agency force</span>
          </div>
        </div>
        <div className="project-feedback-ops">
          <span>Monitoring</span>
          <span>GitOps rollback</span>
          <span>Traceable evidence</span>
        </div>
      </div>
    </section>
  );
}
