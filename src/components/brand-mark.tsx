type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeWidth="38"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M278 160H214C160.981 160 120 200.981 120 256C120 311.019 160.981 352 214 352H278" />
      <path d="M260 160V352H304C357.019 352 392 311.019 392 256C392 200.981 357.019 160 304 160H260" />
    </svg>
  );
}
