type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeWidth="34"
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M278 166H216C164 166 126 204 126 256C126 308 164 346 216 346H278" />
      <path d="M262 166V346" />
      <path d="M262 166H306C358 166 386 204 386 256C386 308 358 346 306 346H262" />
    </svg>
  );
}
