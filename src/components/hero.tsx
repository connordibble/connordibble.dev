export function Hero() {
  return (
    <section id="top" className="container-wide pt-20 pb-8 sm:pt-28 sm:pb-10">
      <p className="text-body-small text-text-subtle">Senior Software Engineer</p>
      <h1 className="mt-3 text-[40px] sm:text-display font-semibold tracking-tight text-text text-pretty">
        Connor Dibble
      </h1>
      <p className="mt-6 max-w-144 text-body text-text-muted leading-relaxed text-pretty">
        Enterprise design systems. AI tooling. The platform that turns design
        intent into production code.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="https://github.com/connordibble"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text transition-colors duration-150 hover:border-border-strong hover:text-accent"
        >
          <span>GitHub</span>
          <span aria-hidden="true">→</span>
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text transition-colors duration-150 hover:border-border-strong hover:text-accent"
        >
          <span>Resume</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
