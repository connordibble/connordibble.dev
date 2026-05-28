import Link from "next/link";
import type { WritingPost } from "@/data/writing";

type WritingCardProps = {
  post: WritingPost;
};

export function WritingCard({ post }: WritingCardProps) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="writing-card-link relative block h-full rounded-md border border-border bg-panel p-6 transition-colors duration-150 ease-out"
    >
      <span
        aria-hidden
        className="writing-card-link-arrow pointer-events-none absolute right-5 top-5 font-mono text-caption text-text-muted opacity-0 transition-all duration-200 ease-out"
      >
        →
      </span>
      <p className="font-mono text-caption text-text-subtle">
        {post.displayDate} · {post.readTime}
      </p>
      <h3 className="mt-3 pr-6 text-section-title font-medium text-text text-pretty">
        {post.title}
      </h3>
      <p className="mt-3 text-body-small text-text-muted leading-relaxed text-pretty">
        {post.summary}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {post.topics.map((topic) => (
          <li
            key={topic}
            className="rounded-xs border border-border bg-canvas px-2 py-1 font-mono text-caption text-text-muted"
          >
            {topic}
          </li>
        ))}
      </ul>
    </Link>
  );
}
