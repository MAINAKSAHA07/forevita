import { canvasTiers, excluded, stubbed } from '../data/plan'
import { Section } from './Section'

export function Edges() {
  return (
    <Section id="edges">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Still stubbed or excluded</h2>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted">
        Canvas covers most clinical vendor work. What remains stubbed is ForeVita-specific. Exclusions are out of this engagement, not hidden later.
      </p>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="Canvas scope reminder">
        {canvasTiers.map((tier) => (
          <a
            key={tier.id}
            href="#canvas"
            className="rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-transform duration-100 ease-out hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97]"
          >
            {tier.label}: {tier.note}
          </a>
        ))}
      </div>
      <div className="mt-8 grid min-w-0 gap-8 md:grid-cols-2">
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-ink">ForeVita stubs in the MVP</h3>
          <ul className="mt-3">
            {stubbed.map((item) => (
              <li key={item} className="border-t border-line py-2.5 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-ink">Excluded from this engagement</h3>
          <ul className="mt-3">
            {excluded.map((item) => (
              <li key={item} className="border-t border-line py-2.5 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
