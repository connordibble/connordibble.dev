"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Interactive figure for "The Model Can Draft the Incline Curve"
 * (work/essay-drafts/05). Lives in its own file so the other essay figures
 * stay server components; this one holds state for the segment inspector.
 *
 * The workout is illustrative, not partner data. The figure exists to show
 * the shape of the review artifact: timestamped control values, the trainer
 * cue each one came from, and one reviewer correction.
 */

type Segment = {
  id: string;
  label: string;
  /** Session minutes. */
  start: number;
  end: number;
  cue: string;
  draftIncline: number;
  approvedIncline: number;
  note?: string;
};

const SESSION_MINUTES = 30;

/* The corrected segment doubles as the initial selection and the find()
   fallback, so it gets a name. */
const surgeSegment: Segment = {
  id: "surge",
  label: "surge",
  start: 14,
  end: 19,
  cue: "give me more here",
  draftIncline: 9,
  approvedIncline: 7,
  note: "An ambiguous cue: the draft read it as grade and guessed high. The reviewer set 7.0 against the series' progression notes.",
};

const segments: Segment[] = [
  {
    id: "warmup",
    label: "warmup",
    start: 0,
    end: 5,
    cue: "easy pace to start",
    draftIncline: 1,
    approvedIncline: 1,
  },
  {
    id: "climb-1",
    label: "climb",
    start: 5,
    end: 11,
    cue: "we're climbing now",
    draftIncline: 6,
    approvedIncline: 6,
  },
  {
    id: "recover",
    label: "recover",
    start: 11,
    end: 14,
    cue: "shake it out",
    draftIncline: 2,
    approvedIncline: 2,
  },
  surgeSegment,
  {
    id: "climb-2",
    label: "climb",
    start: 19,
    end: 25,
    cue: "last hill, hold it",
    draftIncline: 8,
    approvedIncline: 8,
  },
  {
    id: "cooldown",
    label: "cooldown",
    start: 25,
    end: 30,
    cue: "walk it home",
    draftIncline: 1,
    approvedIncline: 1,
  },
];

// Chart geometry. Inclines plot on a 0–10 scale; x is session minutes.
const W = 600;
const H = 150;
const TOP = 16;
const BASE = 134;

const x = (minute: number) => (minute / SESSION_MINUTES) * W;
const y = (incline: number) => BASE - (incline / 10) * (BASE - TOP - 4);

function profilePath(): string {
  let d = "";
  for (const seg of segments) {
    d +=
      d === ""
        ? `M ${x(seg.start)} ${y(seg.approvedIncline)}`
        : ` V ${y(seg.approvedIncline)}`;
    d += ` H ${x(seg.end)}`;
  }
  return d;
}

function formatTime(minute: number): string {
  return `${minute}:00`;
}

export function InclineReviewFigure() {
  const [activeId, setActiveId] = useState(surgeSegment.id);
  const shouldReduceMotion = useReducedMotion();
  const active = segments.find((seg) => seg.id === activeId) ?? surgeSegment;
  const corrected = active.approvedIncline !== active.draftIncline;

  return (
    <div className="rounded-md border border-border bg-panel p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-caption text-text-subtle">
          draft incline profile
        </p>
        <p className="whitespace-nowrap font-mono text-caption text-text-subtle">
          30:00 · illustrative
        </p>
      </div>

      <div className="mt-3 rounded-sm border border-border bg-canvas px-2 pt-2 pb-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Stepped incline profile for an illustrative thirty-minute treadmill workout. The surge segment shows the model's draft at 9.0 and the reviewer's approved 7.0."
          className="block w-full"
        >
          {[0, 5, 10].map((line) => (
            <line
              key={`grid-${line}`}
              x1={0}
              x2={W}
              y1={y(line)}
              y2={y(line)}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className={line === 0 ? "stroke-border-strong" : "stroke-border"}
            />
          ))}

          {segments.map((seg) => (
            <rect
              key={`zone-${seg.id}`}
              x={x(seg.start)}
              y={TOP}
              width={x(seg.end) - x(seg.start)}
              height={BASE - TOP}
              className={[
                "fill-accent-soft transition-opacity duration-150",
                seg.id === activeId ? "opacity-70" : "opacity-0",
              ].join(" ")}
            />
          ))}

          {segments.slice(1).map((seg) => (
            <line
              key={`tick-${seg.id}`}
              x1={x(seg.start)}
              x2={x(seg.start)}
              y1={BASE - 5}
              y2={BASE + 5}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className="stroke-border"
            />
          ))}

          {segments
            .filter((seg) => seg.draftIncline !== seg.approvedIncline)
            .map((seg) => (
              <line
                key={`draft-${seg.id}`}
                x1={x(seg.start)}
                x2={x(seg.end)}
                y1={y(seg.draftIncline)}
                y2={y(seg.draftIncline)}
                strokeWidth={1.5}
                strokeDasharray="5 4"
                vectorEffect="non-scaling-stroke"
                className="stroke-text-subtle opacity-70"
              />
            ))}

          <path
            d={profilePath()}
            fill="none"
            strokeWidth={1.5}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="stroke-text-subtle"
          />

          {segments.map((seg) => {
            const isCorrected = seg.draftIncline !== seg.approvedIncline;
            return (
              <line
                key={`run-${seg.id}`}
                x1={x(seg.start)}
                x2={x(seg.end)}
                y1={y(seg.approvedIncline)}
                y2={y(seg.approvedIncline)}
                strokeWidth={2.5}
                vectorEffect="non-scaling-stroke"
                className={[
                  isCorrected ? "stroke-accent" : "stroke-text",
                  "transition-opacity duration-150",
                  seg.id === activeId || isCorrected
                    ? "opacity-100"
                    : "opacity-0",
                ].join(" ")}
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex gap-1" role="group" aria-label="Workout segments">
        {segments.map((seg, index) => {
          const isActive = seg.id === activeId;
          return (
            <button
              key={seg.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`${seg.label}, ${formatTime(seg.start)} to ${formatTime(seg.end)}`}
              onClick={() => setActiveId(seg.id)}
              style={{ flexGrow: seg.end - seg.start, flexBasis: 0 }}
              className={[
                "min-w-0 overflow-hidden rounded-xs border px-1 py-1.5 font-mono text-caption transition-colors duration-150",
                isActive
                  ? "border-accent/50 bg-panel-raised text-text"
                  : "border-border bg-panel text-text-subtle hover:border-border-strong hover:text-text",
              ].join(" ")}
            >
              <span className="hidden sm:inline">{seg.label}</span>
              <span className="sm:hidden">{index + 1}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 min-h-[8.75rem] sm:min-h-[6.5rem]">
        {/* Keyed remount + fade-in only: gating the swap on an exit animation
            leaves stale content behind when rAF is throttled. */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-caption text-text-subtle">
            {formatTime(active.start)}–{formatTime(active.end)} · {active.label}
          </p>
          <p className="mt-1.5 text-body-small text-text-muted">
            cue: &ldquo;{active.cue}&rdquo;
          </p>
          <p className="mt-1.5 font-mono text-caption text-text-muted">
            {corrected ? (
              <>
                drafted {active.draftIncline.toFixed(1)}{" "}
                <span aria-hidden>→</span>
                <span className="sr-only">revised to</span>{" "}
                <span className="text-accent">
                  approved {active.approvedIncline.toFixed(1)}
                </span>
              </>
            ) : (
              <>drafted {active.draftIncline.toFixed(1)} · accepted as drafted</>
            )}
          </p>
          {active.note ? (
            <p className="mt-1.5 text-body-small text-text-muted">
              {active.note}
            </p>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
