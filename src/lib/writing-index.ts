import { getProjectBySlug } from "@/data/projects";
import type { WritingPost } from "@/data/writing";

/** Lean, serializable shape the writing index needs; keeps essay bodies out
 * of the client payload. */
export type WritingIndexPost = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  date: string;
  displayDate: string;
  readTime: string;
  readMinutes: number;
  featured: boolean;
  topics: string[];
  projects: WritingIndexProject[];
};

export type WritingIndexProject = {
  slug: string;
  title: string;
};

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title A-Z" },
  { value: "shortest", label: "Reading time, shortest first" },
  { value: "longest", label: "Reading time, longest first" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const DEFAULT_SORT: SortValue = "newest";

export function isSortValue(value: string | null): value is SortValue {
  return SORT_OPTIONS.some((option) => option.value === value);
}

/** Ascending; the pagination bar stays hidden until results outgrow the
 * smallest size. */
export const PAGE_SIZES = [10, 20, 50] as const;

export type PageSize = (typeof PAGE_SIZES)[number];

export const DEFAULT_PAGE_SIZE: PageSize = 10;

export function isPageSize(value: number): value is PageSize {
  return PAGE_SIZES.some((size) => size === value);
}

/**
 * Page numbers for the pagination control: first and last page always
 * visible, one sibling on each side of the current page, and `"gap"` where
 * pages are elided. Renders a constant seven slots once the page count
 * exceeds seven, so the control never changes width while paging.
 */
export function paginationItems(
  current: number,
  pageCount: number,
): (number | "gap")[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  const siblingsStart = Math.max(Math.min(current - 1, pageCount - 4), 3);
  const siblingsEnd = Math.min(Math.max(current + 1, 5), pageCount - 2);
  return [
    1,
    siblingsStart > 3 ? "gap" : 2,
    ...Array.from(
      { length: siblingsEnd - siblingsStart + 1 },
      (_, index) => siblingsStart + index,
    ),
    siblingsEnd < pageCount - 2 ? "gap" : pageCount - 1,
    pageCount,
  ];
}

/** Parse the leading minute count out of strings like "10 min read". */
export function parseReadMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function toIndexPost(post: WritingPost): WritingIndexPost {
  const projects = (post.related ?? [])
    .filter((ref) => ref.kind === "project")
    .flatMap((ref) => {
      const project = getProjectBySlug(ref.slug);
      return project ? [{ slug: project.slug, title: project.title }] : [];
    });

  return {
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    summary: post.summary,
    date: post.date,
    displayDate: post.displayDate,
    readTime: post.readTime,
    readMinutes: parseReadMinutes(post.readTime),
    featured: post.featured,
    topics: post.topics,
    projects,
  };
}

export type WritingIndexFilters = {
  q: string;
  topics: string[];
  projects: string[];
  featured: boolean;
  sort: SortValue;
};

export const DEFAULT_FILTERS: WritingIndexFilters = {
  q: "",
  topics: [],
  projects: [],
  featured: false,
  sort: DEFAULT_SORT,
};

function searchHaystack(post: WritingIndexPost): string {
  return [
    post.title,
    post.subtitle,
    post.summary,
    ...post.topics,
    ...post.projects.map((project) => project.title),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterAndSortPosts(
  posts: WritingIndexPost[],
  filters: WritingIndexFilters,
): WritingIndexPost[] {
  const query = filters.q.trim().toLowerCase();

  // Multi-select facets: OR within a facet, AND across facets.
  const matched = posts.filter(
    (post) =>
      (filters.topics.length === 0 ||
        post.topics.some((topic) => filters.topics.includes(topic))) &&
      (filters.projects.length === 0 ||
        post.projects.some((project) =>
          filters.projects.includes(project.slug),
        )) &&
      (!filters.featured || post.featured) &&
      (!query || searchHaystack(post).includes(query)),
  );

  return matched.sort((a, b) => {
    switch (filters.sort) {
      case "oldest":
        return a.date.localeCompare(b.date);
      case "title":
        return a.title.localeCompare(b.title);
      case "shortest":
        return a.readMinutes - b.readMinutes || a.title.localeCompare(b.title);
      case "longest":
        return b.readMinutes - a.readMinutes || a.title.localeCompare(b.title);
      case "newest":
        return b.date.localeCompare(a.date);
    }
  });
}
