import Link from "next/link";
import type { WritingPost } from "@/data/writing";

type WritingCardProps = {
  post: WritingPost;
};

export function WritingCard({ post }: WritingCardProps) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="writing-card-link surface-link relative block h-full min-h-[15rem] rounded-md border border-border bg-panel p-6"
    >
      <span
        aria-hidden
        className="writing-card-link-arrow pointer-events-none absolute right-5 top-5 font-mono text-caption text-text-muted opacity-0 transition-[color,opacity,transform] duration-200"
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
            className="tag-token px-2 py-1"
          >
            {topic}
          </li>
        ))}
      </ul>
    </Link>
  );
}
