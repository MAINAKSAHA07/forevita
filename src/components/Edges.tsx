import { excluded, stubbed } from '../data/plan'
import { Section } from './Section'

export function Edges() {
  return (
    <Section id="edges">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Stubbed or excluded</h2>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted">
        Vendor-dependent steps keep a visible stub. Exclusions are out of this engagement, not hidden later.
      </p>
      <div className="mt-6 grid min-w-0 gap-8 md:grid-cols-2">
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-ink">Stubbed pending contracts</h3>
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
