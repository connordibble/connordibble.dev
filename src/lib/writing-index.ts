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
