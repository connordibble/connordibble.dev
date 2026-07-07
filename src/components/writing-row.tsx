import Link from "next/link";

export type WritingRowPost = {
  slug: string;
  title: string;
  summary: string;
  displayDate: string;
  readTime: string;
};

type WritingRowProps = {
  post: WritingRowPost;
  compact?: boolean;
};

export function WritingRow({ post, compact = false }: WritingRowProps) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className={[
        "writing-row-link surface-link block rounded-sm px-3",
        compact ? "py-4" : "py-6",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="writing-row-title flex items-center gap-2 text-section-title font-medium text-text text-pretty transition-colors duration-150">
          <span>{post.title}</span>
          <span
            aria-hidden
            className="writing-row-arrow font-mono text-body-small text-text-muted opacity-0 transition-[opacity,transform,color] duration-200"
          >
            →
          </span>
        </h3>
        <p className="shrink-0 font-mono text-caption text-text-subtle">
          {post.displayDate} · {post.readTime}
        </p>
      </div>
      <p
        className={[
          "text-body-small text-text-muted leading-relaxed text-pretty",
          compact ? "mt-2 max-w-2xl" : "mt-3 max-w-3xl",
        ].join(" ")}
      >
        {post.summary}
      </p>
    </Link>
  );
}
