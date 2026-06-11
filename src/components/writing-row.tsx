import Link from "next/link";

export type WritingRowPost = {
  slug: string;
  title: string;
  summary: string;
  displayDate: string;
  readTime: string;
};

export function WritingRow({ post }: { post: WritingRowPost }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="writing-row-link block px-2 py-6 transition-colors duration-150"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="writing-row-title flex items-center gap-2 text-section-title font-medium text-text text-pretty transition-colors duration-150">
          <span>{post.title}</span>
          <span
            aria-hidden
            className="writing-row-arrow font-mono text-body-small text-text-muted opacity-0 transition-all duration-200 ease-out"
          >
            →
          </span>
        </h3>
        <p className="shrink-0 font-mono text-caption text-text-subtle">
          {post.displayDate} · {post.readTime}
        </p>
      </div>
      <p className="mt-3 max-w-3xl text-body-small text-text-muted leading-relaxed text-pretty">
        {post.summary}
      </p>
    </Link>
  );
}
