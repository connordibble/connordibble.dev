"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { SectionLabel } from "./section-label";

type TraceKind =
  | "prototype"
  | "contract"
  | "review"
  | "checks"
  | "release"
  | "adoption"
  | "signals";

type TraceStage = {
  id: string;
  step: string;
  label: string;
  title: string;
  description: string;
  kicker: string;
  status: string;
  kind: TraceKind;
};

const traceStages: readonly TraceStage[] = [
  {
    id: "prototype",
    step: "01",
    label: "Prototype",
    title: "Make the idea tangible.",
    description:
      "A working demo makes the question visible. It is a starting point, not a promise.",
    kicker: "FIRST PROOF",
    status: "DRAFT",
    kind: "prototype",
  },
  {
    id: "contract",
    step: "02",
    label: "Contract",
    title: "Name what can be trusted.",
    description:
      "Component and API contracts turn a good idea into a supported shape.",
    kicker: "COMPONENT / API",
    status: "DEFINED",
    kind: "contract",
  },
  {
    id: "review",
    step: "03",
    label: "Human review",
    title: "Put judgment where it belongs.",
    description:
      "A person can inspect, edit, accept, or reject the output before it travels further.",
    kicker: "DESIGNRAIL",
    status: "REVIEW",
    kind: "review",
  },
  {
    id: "checks",
    step: "04",
    label: "Deterministic checks",
    title: "Make the rules repeatable.",
    description:
      "The same checks run locally and in CI, regardless of who produced the artifact.",
    kicker: "VALIDATION",
    status: "READY",
    kind: "checks",
  },
  {
    id: "release",
    step: "05",
    label: "Release controls",
    title: "Ship with a way back.",
    description:
      "Versioning, monitoring, and rollback make change survivable once other people depend on it.",
    kicker: "DELIVERY",
    status: "OPERABLE",
    kind: "release",
  },
  {
    id: "adoption",
    step: "06",
    label: "Team adoption",
    title: "Give people a reason to choose it.",
    description:
      "A platform wins when the supported path is easier to adopt than the local workaround.",
    kicker: "SFDS / SUPPORTED PATH",
    status: "IN USE",
    kind: "adoption",
  },
  {
    id: "signals",
    step: "07",
    label: "Production signals",
    title: "Let usage change the next version.",
    description:
      "Source quotes, runtime signals, and incidents give the next decision something real to work from.",
    kicker: "FEEDBACK LOOP",
    status: "OBSERVED",
    kind: "signals",
  },
];

function TraceArtifact({ stage }: { stage: TraceStage }) {
  return (
    <div className="platform-trace-artifact" data-kind={stage.kind}>
      <div className="platform-trace-artifact-header">
        <span>{stage.kicker}</span>
        <span>{stage.status}</span>
      </div>

      {stage.kind === "prototype" ? (
        <div className="platform-trace-prototype-card">
          <p className="platform-trace-artifact-label">CAPABILITY PROPOSAL</p>
          <p className="platform-trace-artifact-title">One useful behavior</p>
          <div className="platform-trace-field">
            <span>Question</span>
            <strong>Can a person trust the next step?</strong>
          </div>
          <div className="platform-trace-field">
            <span>State</span>
            <span className="platform-trace-status">Observable</span>
          </div>
        </div>
      ) : null}

      {stage.kind === "contract" ? (
        <div className="platform-trace-contract-grid">
          <div className="platform-trace-contract-card">
            <p className="platform-trace-artifact-label">INTENT</p>
            <strong>Component intent</strong>
            <span>Button</span>
            <span>primary · disabled</span>
          </div>
          <span className="platform-trace-connector" aria-hidden>
            →
          </span>
          <div className="platform-trace-contract-card">
            <p className="platform-trace-artifact-label">CONTRACT</p>
            <strong>Supported shape</strong>
            <span>props · slots</span>
            <span>tokens · states</span>
          </div>
        </div>
      ) : null}

      {stage.kind === "review" ? (
        <div className="platform-trace-review-card">
          <div className="platform-trace-review-row">
            <span>Recommended mapping</span>
            <strong>sl-button</strong>
          </div>
          <div className="platform-trace-review-row">
            <span>Compliance findings</span>
            <span className="platform-trace-status">Attached</span>
          </div>
          <div className="platform-trace-review-decision">
            <span>Human decision</span>
            <strong>Accept with edit</strong>
          </div>
        </div>
      ) : null}

      {stage.kind === "checks" ? (
        <ul className="platform-trace-check-list">
          {[
            "Component contract",
            "Accessibility behavior",
            "Token usage",
          ].map((check) => (
            <li key={check}>
              <span>{check}</span>
              <span className="platform-trace-status">READY</span>
            </li>
          ))}
        </ul>
      ) : null}

      {stage.kind === "release" ? (
        <div className="platform-trace-release-card">
          <div className="platform-trace-release-title">
            <span className="platform-trace-artifact-label">CHANGE</span>
            <strong>Versioned release</strong>
          </div>
          <ol className="platform-trace-release-track" aria-label="Release sequence">
            {[
              "CI",
              "Publish",
              "Monitor",
              "Rollback",
            ].map((step, index) => (
              <li key={step} data-active={index < 3 ? "true" : undefined}>
                <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {stage.kind === "adoption" ? (
        <div className="platform-trace-adoption-card">
          <div className="platform-trace-adoption-metric">
            <strong>100+</strong>
            <span>product teams</span>
          </div>
          <div className="platform-trace-adoption-metric">
            <strong>1,000+</strong>
            <span>engineers &amp; designers</span>
          </div>
          <div className="platform-trace-adoption-note">
            <span>Supported path</span>
            <span>docs · office hours · champions</span>
          </div>
        </div>
      ) : null}

      {stage.kind === "signals" ? (
        <div className="platform-trace-signals-card">
          <div className="platform-trace-signals-metrics">
            <div>
              <strong>800+</strong>
              <span>datapoints</span>
            </div>
            <div>
              <strong>197</strong>
              <span>participants</span>
            </div>
          </div>
          <div className="platform-trace-signal-row">
            <span>Source quotes</span>
            <span className="platform-trace-status">Traceable</span>
          </div>
          <div className="platform-trace-signal-row">
            <span>Operational path</span>
            <span>Monitoring · GitOps rollback</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function handleStageKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  currentIndex: number,
  setActiveIndex: (index: number) => void,
) {
  const lastIndex = traceStages.length - 1;
  let nextIndex: number | null = null;

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
  } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = lastIndex;
  }

  if (nextIndex === null) {
    return;
  }

  event.preventDefault();
  const nextStage = traceStages[nextIndex];
  if (!nextStage) {
    return;
  }

  setActiveIndex(nextIndex);
  requestAnimationFrame(() => {
    document
      .getElementById(`platform-trace-tab-${nextStage.id}`)
      ?.focus();
  });
}

export function PrototypePlatformTrace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = traceStages[activeIndex];
  if (!activeStage) {
    return null;
  }

  const activeTabId = `platform-trace-tab-${activeStage.id}`;

  return (
    <section
      id="platform-trace"
      aria-labelledby="platform-trace-heading"
      className="container-wide site-section platform-trace-section pt-12 pb-12 sm:pt-20 sm:pb-16"
    >
      <SectionLabel as="p" mark="triangle" rule={false}>
        Prototype → platform
      </SectionLabel>
      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(18rem,0.72fr)] lg:items-end lg:gap-12">
        <h2
          id="platform-trace-heading"
          className="platform-trace-heading max-w-[14ch] font-editorial text-[2.75rem] font-normal leading-[0.98] text-text text-pretty sm:text-[4rem]"
        >
          A prototype is only the first proof.
        </h2>
        <p className="max-w-[34rem] text-body-small leading-relaxed text-text-muted text-pretty lg:pb-1">
          The rest is contract, review, checks, release, adoption, and
          feedback. Select a stage to see what makes an idea dependable.
        </p>
      </div>

      <div className="platform-trace-shell mt-10 grid min-w-0 gap-8 rounded-md border border-border bg-panel p-4 sm:mt-12 sm:p-6 lg:grid-cols-[minmax(13rem,0.56fr)_minmax(0,1.75fr)] lg:gap-10 lg:p-8">
        <nav aria-label="Prototype to platform stages" className="min-w-0">
          <ol className="platform-trace-stage-list" role="tablist">
            {traceStages.map((stage, index) => (
              <li key={stage.id}>
                <button
                  id={`platform-trace-tab-${stage.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-controls="platform-trace-panel"
                  tabIndex={activeIndex === index ? 0 : -1}
                  data-active={activeIndex === index ? "true" : undefined}
                  className="platform-trace-stage-tab"
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) =>
                    handleStageKeyDown(event, index, setActiveIndex)
                  }
                >
                  <span className="platform-trace-stage-number" aria-hidden>
                    {stage.step}
                  </span>
                  <span className="platform-trace-stage-label">{stage.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div
          id="platform-trace-panel"
          key={activeStage.id}
          role="tabpanel"
          aria-labelledby={activeTabId}
          tabIndex={0}
          className="platform-trace-panel"
        >
          <div className="platform-trace-panel-copy">
            <p className="font-mono text-caption text-accent">
              {activeStage.step} / {activeStage.label}
            </p>
            <h3 className="mt-4 max-w-[18ch] text-headline font-medium leading-tight text-text text-pretty">
              {activeStage.title}
            </h3>
            <p className="mt-4 max-w-[30rem] text-body-small leading-relaxed text-text-muted text-pretty">
              {activeStage.description}
            </p>
          </div>
          <TraceArtifact stage={activeStage} />
        </div>
      </div>

      <p className="mt-5 max-w-[65ch] font-mono text-caption leading-relaxed text-text-subtle">
        Evidence from <Link className="text-link" href="/projects/designrail">DesignRail</Link>, SFDS, and the <Link className="text-link" href="/projects/agent-convention-feedback">convention feedback pilot</Link>.
      </p>
    </section>
  );
}
