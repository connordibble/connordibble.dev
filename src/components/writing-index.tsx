"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WritingRow } from "./writing-row";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT,
  filterAndSortPosts,
  isPageSize,
  isSortValue,
  PAGE_SIZES,
  paginationItems,
  SORT_OPTIONS,
  type PageSize,
  type SortValue,
  type WritingIndexPost,
} from "@/lib/writing-index";

const SEARCH_DEBOUNCE_MS = 250;

const fieldClass =
  "min-h-11 w-full rounded-sm border border-border bg-panel px-3 font-mono text-body-small text-text transition-colors duration-150 placeholder:text-text-subtle";

const selectClass = `${fieldClass} styled-select appearance-none pr-[2.25rem]`;

const labelClass =
  "font-mono text-caption text-text-subtle";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
    </svg>
  );
}

function SelectField({ children }: { children: ReactNode }) {
  return (
    <span className="select-field relative block">
      {children}
      <ChevronDownIcon className="select-chevron pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
    </span>
  );
}

function toggleListValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

type FacetOption = {
  value: string;
  label: string;
  count: number;
};

/**
 * A multi-select facet rendered as exposed checkbox pills. Every value stays
 * visible with a live result count, so adding or removing one is a single
 * tap, with no need to reopen a menu per selection.
 */
function FacetGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: FacetOption[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className={labelClass}>{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className={[
                "cursor-pointer",
                option.count === 0 && !checked ? "opacity-60" : "",
              ].join(" ")}
            >
              <input
                type="checkbox"
                name={`${legend.toLowerCase()}[]`}
                checked={checked}
                onChange={() => onToggle(option.value)}
                className="facet-pill-input sr-only"
              />
              <span className="facet-pill flex items-center gap-1.5 rounded-xs border border-border bg-panel px-2.5 py-1.5 font-mono text-caption text-text-muted transition-colors duration-150">
                <span>{option.label}</span>
                <span className="text-text-subtle">{option.count}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function isTouchLikePointer(event: PointerEvent<HTMLSelectElement>) {
  if (event.pointerType === "touch" || event.pointerType === "pen") {
    return true;
  }

  if (event.pointerType === "mouse") {
    return false;
  }

  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

function closeOpenSelectOnTriggerTap(event: PointerEvent<HTMLSelectElement>) {
  const select = event.currentTarget;

  // Let option taps and desktop mouse clicks keep their native behavior. This
  // only fills the mobile gap where tapping the opened select trigger does not
  // close the customizable picker.
  if (event.target !== select || !isTouchLikePointer(event)) {
    return;
  }

  try {
    if (select.matches(":open")) {
      event.preventDefault();
      select.blur();
    }
  } catch {
    // Browsers without :open support use their native picker behavior.
  }
}

type WritingIndexProps = {
  posts: WritingIndexPost[];
};

export function WritingIndex({ posts }: WritingIndexProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derived values below are plain render computations: the React Compiler
  // memoizes them, and manual useMemo here trips its preserve-manual-
  // memoization analysis once arrays flow through the URL-patch closures.
  const topicOptions = [...new Set(posts.flatMap((post) => post.topics))].sort();
  const projectOptions = [
    ...new Map(
      posts
        .flatMap((post) => post.projects)
        .map((project) => [project.slug, project] as const),
    ).values(),
  ].sort((a, b) => a.title.localeCompare(b.title));

  // The URL is the source of truth. The multi-select facets serialize as
  // comma-separated values (`topic=a,b`), deduped and restricted to known
  // values so the UI never shows a filter it isn't applying.
  const topicParam = searchParams.get("topic") ?? "";
  const topics = [...new Set(topicParam.split(","))].filter((value) =>
    topicOptions.includes(value),
  );
  const projectParam = searchParams.get("project") ?? "";
  const projects = [...new Set(projectParam.split(","))].filter((value) =>
    projectOptions.some((option) => option.slug === value),
  );
  const rawSort = searchParams.get("sort");
  const sort: SortValue = isSortValue(rawSort) ? rawSort : DEFAULT_SORT;
  const featured = searchParams.get("featured") === "1";
  const perParam = Number(searchParams.get("per") ?? "");
  const per: PageSize = isPageSize(perParam) ? perParam : DEFAULT_PAGE_SIZE;
  const pageParam = Number(searchParams.get("page") ?? "1");

  const narrowingCount = topics.length + projects.length + (featured ? 1 : 0);

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

  const listRef = useRef<HTMLUListElement>(null);
  const debounceRef = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    },
    [],
  );

  const buildQuery = (next: {
    q: string;
    topics: string[];
    projects: string[];
    sort: SortValue;
    featured: boolean;
    per: PageSize;
    page: number;
  }) => {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.topics.length > 0) params.set("topic", next.topics.join(","));
    if (next.projects.length > 0)
      params.set("project", next.projects.join(","));
    if (next.sort !== DEFAULT_SORT) params.set("sort", next.sort);
    if (next.featured) params.set("featured", "1");
    if (next.per !== DEFAULT_PAGE_SIZE) params.set("per", String(next.per));
    if (next.page > 1) params.set("page", String(next.page));
    return params.toString();
  };

  const replaceParams = (
    patch: Partial<{
      q: string;
      topics: string[];
      projects: string[];
      sort: SortValue;
      featured: boolean;
      per: PageSize;
    }>,
  ) => {
    // Any refinement resets to the first page; the size preference persists.
    const query = buildQuery({
      q: q.trim(),
      topics,
      projects,
      sort,
      featured,
      per,
      page: 1,
      ...patch,
    });
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
    // Filters and page reset; the per-page display preference survives.
    const params = new URLSearchParams();
    if (per !== DEFAULT_PAGE_SIZE) params.set("per", String(per));
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  const results = filterAndSortPosts(posts, {
    q,
    topics,
    projects,
    featured,
    sort,
  });

  // Per-value facet counts with every other filter applied. A facet's own
  // selection is excluded from its counts, so each pill answers "what does
  // adding this value get me" under OR semantics.
  const topicPool = filterAndSortPosts(posts, {
    q,
    topics: [],
    projects,
    featured,
    sort,
  });
  const topicCounts = new Map(
    topicOptions.map((topic) => [
      topic,
      topicPool.filter((post) => post.topics.includes(topic)).length,
    ]),
  );
  const projectPool = filterAndSortPosts(posts, {
    q,
    topics,
    projects: [],
    featured,
    sort,
  });
  const projectCounts = new Map(
    projectOptions.map((option) => [
      option.slug,
      projectPool.filter((post) =>
        post.projects.some((project) => project.slug === option.slug),
      ).length,
    ]),
  );

  // Out-of-range or hand-edited page values clamp into range instead of
  // showing an empty page. The bar (numbers and size select) stays hidden
  // until results outgrow the smallest page size.
  const pageCount = Math.max(1, Math.ceil(results.length / per));
  const page = Number.isInteger(pageParam)
    ? Math.min(Math.max(pageParam, 1), pageCount)
    : 1;
  const pagedResults = results.slice((page - 1) * per, page * per);
  const rangeStart = (page - 1) * per + 1;
  const rangeEnd = Math.min(page * per, results.length);
  const showPaginationBar = results.length > PAGE_SIZES[0];

  const hrefForPage = (target: number) => {
    const query = buildQuery({
      q: q.trim(),
      topics,
      projects,
      sort,
      featured,
      per,
      page: target,
    });
    return query ? `${pathname}?${query}` : pathname;
  };

  const goToPage = (target: number) => {
    if (target === page) return;
    // pushState rather than replaceState: each page is a navigation step, so
    // the back button walks back through pages. The Next router syncs
    // useSearchParams for both.
    window.history.pushState(null, "", hrefForPage(target));
    listRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const isFiltering =
    q.trim() !== "" || topics.length > 0 || projects.length > 0 || featured ||
    sort !== DEFAULT_SORT;

  // Applied-filter chips: always-visible names for the narrowing filters,
  // one chip per selected value, each removable on its own. The search query
  // is not chipped because the input showing it never collapses.
  const activeChips = [
    ...topics.map((value) => ({
      key: `topic:${value}`,
      label: `Topic · ${value}`,
      remove: () => replaceParams({ topics: topics.filter((t) => t !== value) }),
    })),
    ...projects.map((slug) => ({
      key: `project:${slug}`,
      label: `Project · ${
        projectOptions.find((option) => option.slug === slug)?.title ?? slug
      }`,
      remove: () =>
        replaceParams({ projects: projects.filter((p) => p !== slug) }),
    })),
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
              name="q"
              autoComplete="off"
              value={q}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Title, topic, or project…"
              className={fieldClass}
            />
          </label>
          <label className="flex grow basis-[13.5rem] flex-col gap-1.5 sm:grow-0">
            <span className={labelClass}>Sort</span>
            <SelectField>
              <select
                name="sort"
                value={sort}
                onPointerDown={closeOpenSelectOnTriggerTap}
                onChange={(event) =>
                  replaceParams({ sort: event.target.value as SortValue })
                }
                className={selectClass}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </SelectField>
          </label>
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="writing-filters"
            onClick={() => setFiltersOpen((open) => !open)}
            className="pill-link flex min-h-11 items-center gap-2 rounded-sm border border-border bg-panel px-3 font-mono text-body-small text-text transition-colors duration-150"
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
                "block font-mono text-caption text-text-subtle transition-transform duration-200",
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
              initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 rounded-md border border-border p-4">
                <FacetGroup
                  legend="Topic"
                  options={topicOptions.map((topic) => ({
                    value: topic,
                    label: topic,
                    count: topicCounts.get(topic) ?? 0,
                  }))}
                  selected={topics}
                  onToggle={(value) =>
                    replaceParams({ topics: toggleListValue(topics, value) })
                  }
                />
                <FacetGroup
                  legend="Project"
                  options={projectOptions.map((option) => ({
                    value: option.slug,
                    label: option.title,
                    count: projectCounts.get(option.slug) ?? 0,
                  }))}
                  selected={projects}
                  onToggle={(value) =>
                    replaceParams({ projects: toggleListValue(projects, value) })
                  }
                />
                <label className="flex w-fit cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
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
            {pageCount > 1
              ? `${rangeStart}–${rangeEnd} of ${results.length} essays`
              : `${results.length} ${results.length === 1 ? "essay" : "essays"}`}
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
        <>
          <ul
            ref={listRef}
            className="mt-6 scroll-mt-[5rem] divide-y divide-border border-y border-border"
          >
            {pagedResults.map((post) => (
              <li key={post.slug}>
                <WritingRow post={post} />
              </li>
            ))}
          </ul>
          {showPaginationBar ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              {pageCount > 1 ? (
                <nav
                  aria-label="Pagination"
                  className="flex flex-wrap items-center gap-2"
                >
                  {page > 1 ? (
                    <a
                      href={hrefForPage(page - 1)}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(page - 1);
                      }}
                      aria-label="Previous page"
                      className="pill-link flex min-h-11 items-center gap-1.5 rounded-xs border border-border bg-panel px-2.5 font-mono text-caption text-text-muted transition-colors duration-150"
                    >
                      <span aria-hidden>←</span>
                      <span>Prev</span>
                    </a>
                  ) : (
                    <span
                      aria-hidden
                      className="flex min-h-11 items-center gap-1.5 rounded-xs border border-border bg-panel px-2.5 font-mono text-caption text-text-subtle opacity-50"
                    >
                      <span>←</span>
                      <span>Prev</span>
                    </span>
                  )}
                  {paginationItems(page, pageCount).map((item, index) =>
                    item === "gap" ? (
                      <span
                        key={`gap-${index}`}
                        aria-hidden
                        className="px-1 font-mono text-caption text-text-subtle"
                      >
                        …
                      </span>
                    ) : (
                      <a
                        key={item}
                        href={hrefForPage(item)}
                        onClick={(event) => {
                          event.preventDefault();
                          goToPage(item);
                        }}
                        aria-label={`Page ${item}`}
                        aria-current={item === page ? "page" : undefined}
                        className={[
                          "flex min-h-11 min-w-11 items-center justify-center rounded-xs border px-1 font-mono text-caption transition-colors duration-150",
                          item === page
                            ? "border-accent/60 bg-accent-soft text-text"
                            : "pill-link border-border bg-panel text-text-muted",
                        ].join(" ")}
                      >
                        {item}
                      </a>
                    ),
                  )}
                  {page < pageCount ? (
                    <a
                      href={hrefForPage(page + 1)}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(page + 1);
                      }}
                      aria-label="Next page"
                      className="pill-link flex min-h-11 items-center gap-1.5 rounded-xs border border-border bg-panel px-2.5 font-mono text-caption text-text-muted transition-colors duration-150"
                    >
                      <span>Next</span>
                      <span aria-hidden>→</span>
                    </a>
                  ) : (
                    <span
                      aria-hidden
                      className="flex min-h-11 items-center gap-1.5 rounded-xs border border-border bg-panel px-2.5 font-mono text-caption text-text-subtle opacity-50"
                    >
                      <span>Next</span>
                      <span>→</span>
                    </span>
                  )}
                </nav>
              ) : null}
              <label className="ml-auto flex items-center gap-2">
                <span className={labelClass}>Per page</span>
                <SelectField>
                  <select
                    name="per"
                    value={per}
                    onPointerDown={closeOpenSelectOnTriggerTap}
                    onChange={(event) => {
                      const nextPer = Number(event.target.value);
                      if (isPageSize(nextPer)) {
                        replaceParams({ per: nextPer });
                      }
                    }}
                    className={selectClass}
                  >
                    {PAGE_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </SelectField>
              </label>
            </div>
          ) : null}
        </>
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
