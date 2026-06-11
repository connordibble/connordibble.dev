import type { ComponentType } from "react";
import type { WritingFigureVariant } from "@/data/writing";

type WritingFigureProps = {
  variant: WritingFigureVariant;
  caption: string;
};

const figures = {
  "draft-to-truth": DraftToTruthFigure,
  "write-paths": WritePathsFigure,
  "snippet-vs-component": SnippetVsComponentFigure,
  "audience-altitude": AudienceAltitudeFigure,
  "three-surfaces": ThreeSurfacesFigure,
  "distribution-paths": DistributionPathsFigure,
  "page-request-anatomy": PageRequestAnatomyFigure,
  "cache-tiers": CacheTiersFigure,
  "cache-contract": CacheContractFigure,
  "traffic-result": TrafficResultFigure,
} satisfies Record<WritingFigureVariant, ComponentType>;

export function WritingFigure({ variant, caption }: WritingFigureProps) {
  const Figure = figures[variant];
  return (
    <figure>
      <Figure />
      <figcaption className="mt-3 font-mono text-caption text-text-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}

type ZoneProps = {
  label: string;
  items: string[];
  emphasis?: boolean;
  accentItem?: string;
};

function Zone({ label, items, emphasis, accentItem }: ZoneProps) {
  return (
    <div
      className={[
        "flex-1 rounded-md border p-4",
        emphasis
          ? "border-border-strong bg-panel-raised"
          : "border-border bg-panel",
      ].join(" ")}
    >
      <p className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
        {label}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xs border border-border bg-canvas px-2 py-1.5 font-mono text-caption text-text-muted"
          >
            {item}
          </li>
        ))}
        {accentItem ? (
          <li className="rounded-xs border border-accent/50 bg-canvas px-2 py-1.5 font-mono text-caption text-text">
            {accentItem}
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function ZoneArrow() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center font-mono text-body-small text-text-subtle"
    >
      <span className="sm:hidden">↓</span>
      <span className="hidden sm:inline">→</span>
    </div>
  );
}

function DraftToTruthFigure() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
      <Zone
        label="Probabilistic"
        items={["GitHub PRs + issues", "Inngest jobs", "Claude draft"]}
      />
      <ZoneArrow />
      <Zone
        label="The contract"
        emphasis
        items={[
          "bounded prompt inputs",
          "JSON Schema tool definition",
          "Zod parse before persist",
        ]}
      />
      <ZoneArrow />
      <Zone
        label="Durable truth"
        items={["RPC override guard", "RLS-scoped writes"]}
        accentItem="user_override = true"
      />
    </div>
  );
}

const writePathCells: { header: string[]; rows: string[][] } = {
  header: ["", "Override unlocked", "Override locked"],
  rows: [
    ["Automatic", "Writes a fresh draft", "Skips the row entirely"],
    [
      "Manual re-run",
      "Refreshes AI fields",
      "Refreshes AI fields, preserves override + notes",
    ],
  ],
};

function WritePathsFigure() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="grid grid-cols-[minmax(76px,auto)_1fr_1fr] gap-px bg-border">
        {writePathCells.header.map((label, column) => (
          <div
            key={`header-${column}`}
            className={[
              "p-3 font-mono text-caption uppercase tracking-[0.12em] text-text-subtle",
              column === 2 ? "bg-panel-raised" : "bg-panel",
            ].join(" ")}
          >
            {label}
          </div>
        ))}
        {writePathCells.rows.map((row, rowIndex) =>
          row.map((cell, column) => (
            <div
              key={`cell-${rowIndex}-${column}`}
              className={[
                "p-3 leading-relaxed",
                column === 0
                  ? "bg-panel font-mono text-caption text-text"
                  : column === 2
                    ? "bg-panel-raised text-body-small text-text-muted"
                    : "bg-panel text-body-small text-text-muted",
              ].join(" ")}
            >
              {cell}
            </div>
          )),
        )}
      </div>
    </div>
  );
}

type FigureTableProps = {
  header: string[];
  rows: string[][];
  keyPrefix: string;
};

function FigureTable({ header, rows, keyPrefix }: FigureTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="grid grid-cols-[minmax(88px,auto)_1fr_1fr] gap-px bg-border">
        {header.map((label, column) => (
          <div
            key={`${keyPrefix}-header-${column}`}
            className="bg-panel-raised px-3 py-2 font-mono text-caption uppercase tracking-[0.12em] text-text-subtle"
          >
            {label}
          </div>
        ))}
        {rows.map((row, rowIndex) =>
          row.map((cell, column) => (
            <div
              key={`${keyPrefix}-${rowIndex}-${column}`}
              className={[
                "px-3 py-2.5 font-mono text-caption",
                column === 0 ? "bg-panel text-text" : "bg-panel text-text-muted",
              ].join(" ")}
            >
              {cell}
            </div>
          )),
        )}
      </div>
    </div>
  );
}

function SnippetVsComponentFigure() {
  return (
    <FigureTable
      keyPrefix="svc"
      header={["", "Legacy snippets", "Web components"]}
      rows={[
        [
          "Markup lives",
          "Pasted into each app's codebase",
          "Inside the component, behind Shadow DOM",
        ],
        [
          "Internals owned by",
          "Any engineer who can edit the paste",
          "The design system team",
        ],
        [
          "Updates ship by",
          "Re-pasting HTML by hand, hoping nothing drifted",
          "A version bump, or live over the CDN",
        ],
        [
          "Framework lifecycle",
          "Manual jQuery init and teardown",
          "Custom elements manage their own",
        ],
      ]}
    />
  );
}

function AudienceAltitudeFigure() {
  return (
    <FigureTable
      keyPrefix="aa"
      header={["Audience", "What they asked", "What the answer had to carry"]}
      rows={[
        [
          "Engineers",
          "What does integration cost, and what breaks?",
          "Per-framework seams, migration path, working examples",
        ],
        [
          "Team leads",
          "What does my roadmap absorb, and when?",
          "Sequencing, deprecation windows, effort honesty",
        ],
        [
          "XD designers",
          "Who owns design intent once it becomes code?",
          "Token pipeline, shared definition of done",
        ],
        [
          "Executives",
          "What is the duplicated spend and the risk?",
          "Forked implementations of one system, brand and accessibility exposure, quantified",
        ],
      ]}
    />
  );
}

function ThreeSurfacesFigure() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <Zone
          label="Customer-facing"
          items={["brand fidelity", "WCAG at full scale", "performance budgets"]}
        />
        <Zone
          label="Internal tools"
          items={["delivery speed", "data density", "hours-long sessions"]}
        />
        <Zone
          label="Agent-facing"
          items={[
            "workflow-heavy sessions",
            "complex components, data tables",
            "token-driven variants",
          ]}
        />
      </div>
      <div className="rounded-md border border-accent/50 bg-panel px-3 py-2 text-center font-mono text-caption text-text">
        one token set · one component API · one release train
      </div>
    </div>
  );
}

function DistributionPathsFigure() {
  return (
    <FigureTable
      keyPrefix="dp"
      header={["Channel", "The guarantee", "Reach for it when"]}
      rows={[
        [
          "npm",
          "Pinned versions, lockfile resiliency, SSR support",
          "App bundles, server rendering, reproducible builds",
        ],
        [
          "Multi-CDN",
          "Fixes propagate immediately, survives a provider outage",
          "Shared shells, legacy stacks, updates without a redeploy",
        ],
      ]}
    />
  );
}

function PageRequestAnatomyFigure() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <Zone label="One page" items={["a single customer visit"]} />
        <div className="hidden items-center font-mono text-caption text-text-subtle sm:flex">
          →
        </div>
        <Zone
          label="Components"
          items={["entry point", "per-component chunks"]}
        />
        <div className="hidden items-center font-mono text-caption text-text-subtle sm:flex">
          →
        </div>
        <Zone
          label="Shared layer"
          items={["shared libraries", "dependencies", "base styles"]}
        />
      </div>
      <div className="rounded-md border border-accent/50 bg-panel px-3 py-2 text-center font-mono text-caption text-text">
        hundreds of CDN requests per customer per page · five-minute browser
        cache
      </div>
    </div>
  );
}

function CacheTiersFigure() {
  return (
    <FigureTable
      keyPrefix="ct"
      header={["Tier", "Before", "After"]}
      rows={[
        [
          "Browser",
          "Five-minute TTL on everything",
          "One-year TTL on hashed files, usage-tuned TTL on entry points",
        ],
        [
          "CDN edge",
          "Timer-based expiry",
          "Max TTL, invalidation automated in CI/CD per release",
        ],
        ["Pricing", "Pay as you go", "Planned capacity, sized with finops"],
      ]}
    />
  );
}

function CacheContractFigure() {
  return (
    <FigureTable
      keyPrefix="cc"
      header={["File class", "TTL", "Cache busts when"]}
      rows={[
        [
          "Entry point (stable URL)",
          "Lenient, tuned to observed usage",
          "The TTL expires",
        ],
        [
          "Hashed shared files",
          "One year, effectively indefinite",
          "Contents change and the filename moves",
        ],
      ]}
    />
  );
}

function TrafficResultFigure() {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-panel p-4">
      <div className="flex flex-col gap-1.5">
        <div className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
          before
        </div>
        <div className="h-3 w-full rounded-sm bg-border" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="font-mono text-caption uppercase tracking-[0.12em] text-text">
          after
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-1/3 rounded-sm bg-accent" />
          <span className="font-mono text-caption text-text-muted">
            ≈ one third
          </span>
        </div>
      </div>
    </div>
  );
}
