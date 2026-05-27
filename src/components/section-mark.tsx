const variants = {
  rings: (
    <>
      <circle cx="10" cy="10" r="3" />
      <circle cx="10" cy="10" r="7" />
    </>
  ),
  asterisk: (
    <>
      <line x1="10" y1="4" x2="10" y2="16" strokeLinecap="round" />
      <line x1="4" y1="10" x2="16" y2="10" strokeLinecap="round" />
      <line x1="5.5" y1="5.5" x2="14.5" y2="14.5" strokeLinecap="round" />
      <line x1="14.5" y1="5.5" x2="5.5" y2="14.5" strokeLinecap="round" />
    </>
  ),
  ticks: (
    <>
      <line x1="10" y1="3" x2="10" y2="6" />
      <line x1="10" y1="9" x2="10" y2="11" />
      <line x1="10" y1="14" x2="10" y2="17" />
    </>
  ),
  grid: (
    <>
      <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="6" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="6" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  triangle: <path d="M5 4 L16 10 L5 16 Z" />,
} as const;

export type SectionMarkVariant = keyof typeof variants;

export function SectionMark({ variant }: { variant: SectionMarkVariant }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className="shrink-0 text-border-strong"
    >
      {variants[variant]}
    </svg>
  );
}
