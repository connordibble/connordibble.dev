"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
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
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
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
    router.replace(pathname, { scroll: false });
  };

  const results = useMemo(
    () => filterAndSortPosts(posts, { q, topic, project, featured, sort }),
    [posts, q, topic, project, featured, sort],
  );

  const isFiltering =
    q.trim() !== "" || topic !== "" || project !== "" || featured ||
    sort !== DEFAULT_SORT;

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
          <label className="flex grow basis-[11rem] flex-col gap-1.5 sm:grow-0">
            <span className={labelClass}>Topic</span>
            <select
              value={topic}
              onChange={(event) => replaceParams({ topic: event.target.value })}
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
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <label className="flex cursor-pointer items-center gap-2">
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
          <p
            aria-live="polite"
            className="font-mono text-caption text-text-subtle"
          >
            {results.length} {results.length === 1 ? "essay" : "essays"}
          </p>
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
