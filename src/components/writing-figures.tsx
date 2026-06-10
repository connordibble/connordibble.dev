export type WritingFigureVariant = "draft-to-truth" | "write-paths";

type WritingFigureProps = {
  variant: WritingFigureVariant;
  caption: string;
};

export function WritingFigure({ variant, caption }: WritingFigureProps) {
  return (
    <figure>
      {variant === "draft-to-truth" ? (
        <DraftToTruthFigure />
      ) : (
        <WritePathsFigure />
      )}
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
