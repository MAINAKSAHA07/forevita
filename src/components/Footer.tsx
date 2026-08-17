export function Footer() {
  return (
    <footer className="page-gutter border-t border-line py-8">
      <div className="page-width flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink" translate="no">
            ForeVita
          </p>
          <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted">
            Four week MVP scope for client evaluation. Not cleared for use by real members until the release gates close.
          </p>
        </div>
        <p className="font-mono text-xs text-muted">Companion to the delivery plan</p>
      </div>
    </footer>
  )
}
