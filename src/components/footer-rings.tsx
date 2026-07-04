export function FooterRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="absolute right-[-8rem] bottom-[-6rem] h-[20rem] w-[20rem] text-border-strong opacity-30 sm:right-[-15rem] sm:bottom-[-11rem] sm:h-[30rem] sm:w-[30rem] lg:right-[-13rem] xl:right-[-11rem]"
      >
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="99" />
      </svg>
    </div>
  );
}
