export function FooterRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-0 z-0 h-[24rem] w-full overflow-hidden sm:h-[30rem]"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="absolute right-[-3.5rem] bottom-[-3rem] h-[18rem] w-[18rem] text-border-strong opacity-45 sm:right-[clamp(1.5rem,6vw,8rem)] sm:bottom-[-3.5rem] sm:h-[26rem] sm:w-[26rem]"
      >
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="99" />
      </svg>
    </div>
  );
}
