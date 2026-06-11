"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WritingRow } from "./writing-row";
import {
  DEFAULT_SORT,
  filterAndSortPosts,
  isSortValue,
  SORT_OPTIONS,
  type SortValue,
  type WritingIndexPost,
} from "@/lib/writing-index";

const SEARCH_DEBOUNCE_MS = 250;

const fieldClass =
  "h-10 w-full rounded-sm border border-border bg-panel px-3 font-mono text-body-small text-text transition-colors duration-150 placeholder:text-text-subtle";

const labelClass =
  "font-mono text-caption uppercase tracking-[0.12em] text-text-subtle";

type WritingIndexProps = {
  posts: WritingIndexPost[];
};

export function WritingIndex({ posts }: WritingIndexProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const topicOptions = useMemo(
    () => [...new Set(posts.flatMap((post) => post.topics))].sort(),
    [posts],
  );
  const projectOptions = useMemo(() => {
    const bySlug = new Map(
      posts
        .flatMap((post) => post.projects)
        .map((project) => [project.slug, project]),
    );
    return [...bySlug.values()].sort((a, b) => a.title.localeCompare(b.title));
  }, [posts]);

  // The URL is the source of truth. Unknown topic/project values are dropped
  // so the selects never display a state they aren't applying.
  const rawTopic = searchParams.get("topic") ?? "";
  const topic = topicOptions.includes(rawTopic) ? rawTopic : "";
  const rawProject = searchParams.get("project") ?? "";
  const project = projectOptions.some((option) => option.slug === rawProject)
    ? rawProject
    : "";
  const rawSort = searchParams.get("sort");
  const sort: SortValue = isSortValue(rawSort) ? rawSort : DEFAULT_SORT;
  const featured = searchParams.get("featured") === "1";

  const narrowingCount =
    (topic ? 1 : 0) + (project ? 1 : 0) + (featured ? 1 : 0);

  // Disclosure for the narrowing filters. It stays closed by default even on
  // filtered URLs: applied state is always visible through the chips and the
  // count badge, so the panel only opens when the reader wants to edit.
  const [filtersOpen, setFiltersOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Search keeps local state so filtering is keystroke-instant, then syncs to
  // the URL on a debounce. When the URL's q changes from outside (back or
  // forward navigation), adopt it during render; when the change is just our
  // own debounced write landing, leave the user's in-flight input alone.
  const urlQ = searchParams.get("q") ?? "";
  const [q, setQ] = useState(urlQ);
  const [prevUrlQ, setPrevUrlQ] = useState(urlQ);
  if (urlQ !== prevUrlQ) {
    setPrevUrlQ(urlQ);
    if (urlQ !== q.trim()) {
      setQ(urlQ);
    }
  }

  const debounceRef = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    },
    [],
  );

  const replaceParams = (
    patch: Partial<{
      q: string;
      topic: string;
      project: string;
      sort: SortValue;
      featured: boolean;
    }>,
  ) => {
    const next = { q: q.trim(), topic, project, sort, featured, ...patch };
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.topic) params.set("topic", next.topic);
    if (next.project) params.set("project", next.project);
    if (next.sort !== DEFAULT_SORT) params.set("sort", next.sort);
    if (next.featured) params.set("featured", "1");
    const query = params.toString();
    // Native replaceState (blessed by the Next docs for client-side filter
    // state) keeps useSearchParams in sync without an RSC round-trip, and
    // unlike router.replace it also works when the document was hard-loaded
    // on a parameterized URL.
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  const onSearchChange = (value: string) => {
    setQ(value);
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      replaceParams({ q: value.trim() });
    }, SEARCH_DEBOUNCE_MS);
  };

  const clearFilters = () => {
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }
    setQ("");
    window.history.replaceState(null, "", pathname);
  };

  const results = useMemo(
    () => filterAndSortPosts(posts, { q, topic, project, featured, sort }),
    [posts, q, topic, project, featured, sort],
  );

  const isFiltering =
    q.trim() !== "" || topic !== "" || project !== "" || featured ||
    sort !== DEFAULT_SORT;

  // Applied-filter chips: always-visible names for the narrowing filters,
  // each removable on its own. The search query is not chipped because the
  // input showing it never collapses.
  const activeChips = [
    ...(topic
      ? [
          {
            key: "topic",
            label: `Topic · ${topic}`,
            remove: () => replaceParams({ topic: "" }),
          },
        ]
      : []),
    ...(project
      ? [
          {
            key: "project",
            label: `Project · ${
              projectOptions.find((option) => option.slug === project)?.title ??
              project
            }`,
            remove: () => replaceParams({ project: "" }),
          },
        ]
      : []),
    ...(featured
      ? [
          {
            key: "featured",
            label: "Featured",
            remove: () => replaceParams({ featured: false }),
          },
        ]
      : []),
  ];

  return (
    <div className="mt-8">
      <form
        role="search"
        aria-label="Filter essays"
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex min-w-0 grow basis-[15rem] flex-col gap-1.5">
            <span className={labelClass}>Search</span>
            <input
              type="search"
              value={q}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Title, topic, project"
              className={fieldClass}
            />
          </label>
          <label className="flex grow basis-[13.5rem] flex-col gap-1.5 sm:grow-0">
            <span className={labelClass}>Sort</span>
            <select
              value={sort}
              onChange={(event) =>
                replaceParams({ sort: event.target.value as SortValue })
              }
              className={fieldClass}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="writing-filters"
            onClick={() => setFiltersOpen((open) => !open)}
            className="pill-link flex h-10 items-center gap-2 rounded-sm border border-border bg-panel px-3 font-mono text-body-small text-text transition-colors duration-150"
          >
            <span>Filters</span>
            {narrowingCount > 0 ? (
              <span className="rounded-xs border border-accent/50 px-1.5 font-mono text-caption text-text">
                {narrowingCount}
              </span>
            ) : null}
            <span
              aria-hidden
              className={[
                "block font-mono text-caption text-text-subtle transition-transform duration-200 ease-out",
                filtersOpen ? "rotate-90" : "",
              ].join(" ")}
            >
              →
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen ? (
            <motion.div
              id="writing-filters"
              key="writing-filters"
              initial={
                shouldReduceMotion ? false : { height: 0, opacity: 0 }
              }
              animate={{ height: "auto", opacity: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { height: 0, opacity: 0 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
                ease: "easeOut",
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-end gap-x-3 gap-y-4 rounded-md border border-border p-4">
                <label className="flex grow basis-[11rem] flex-col gap-1.5 sm:grow-0">
                  <span className={labelClass}>Topic</span>
                  <select
                    value={topic}
                    onChange={(event) =>
                      replaceParams({ topic: event.target.value })
                    }
                    className={fieldClass}
                  >
                    <option value="">All topics</option>
                    {topicOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex grow basis-[11rem] flex-col gap-1.5 sm:grow-0">
                  <span className={labelClass}>Project</span>
                  <select
                    value={project}
                    onChange={(event) =>
                      replaceParams({ project: event.target.value })
                    }
                    className={fieldClass}
                  >
                    <option value="">All projects</option>
                    {projectOptions.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex h-10 cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(event) =>
                      replaceParams({ featured: event.target.checked })
                    }
                    className="h-4 w-4 accent-accent"
                  />
                  <span className="font-mono text-caption text-text-muted">
                    Featured only
                  </span>
                </label>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-3">
          <p
            aria-live="polite"
            className="font-mono text-caption text-text-subtle"
          >
            {results.length} {results.length === 1 ? "essay" : "essays"}
          </p>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.remove}
              aria-label={`Remove filter: ${chip.label}`}
              className="pill-link flex items-center gap-1.5 rounded-xs border border-border bg-panel px-2 py-1 font-mono text-caption text-text-muted transition-colors duration-150"
            >
              <span>{chip.label}</span>
              <span aria-hidden>×</span>
            </button>
          ))}
          {isFiltering ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-link ml-auto font-mono text-caption text-text-muted transition-colors duration-150"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </form>

      {results.length > 0 ? (
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {results.map((post) => (
            <li key={post.slug}>
              <WritingRow post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-md border border-border bg-panel px-6 py-10 text-center">
          <p className="text-body-small text-text-muted">
            No essays match the current filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="text-link mt-3 font-mono text-caption text-text-muted transition-colors duration-150"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
