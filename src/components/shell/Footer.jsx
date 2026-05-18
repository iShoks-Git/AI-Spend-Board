export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-ember to-copper text-ink-950">
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2 22 20 H 2 Z" fill="currentColor"/></svg>
              </span>
              <span className="font-display text-xl">Forge</span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">
              A precision instrument for AI cost intelligence. Sculpted in software,
              engineered for the era of intelligence on tap.
            </p>
          </div>
          {[
            { title: "Product",  links: ["Dashboard", "Connectors", "Recommendations", "Changelog"] },
            { title: "Company",  links: ["Manifesto", "Customers", "Press", "Contact"] },
          ].map(col => (
            <div key={col.title}>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">{col.title}</p>
              <ul className="space-y-2 text-sm text-white/70">
                {col.links.map(l => <li key={l}><a href="#" className="transition-colors hover:text-bone">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Forge Industries. All rights reserved.</p>
          <p className="font-mono">v1.0 · sculpted in motion</p>
        </div>
      </div>
    </footer>
  );
}
