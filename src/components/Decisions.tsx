import { decisionGroups, openNote } from '../data/plan'
import { Section } from './Section'

export function Decisions() {
  return (
    <Section id="decisions">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Open decisions</h2>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">{openNote}</p>
      <div className="mt-6 grid min-w-0 gap-8 md:grid-cols-2">
        {decisionGroups.map((group) => (
          <div key={group.title} className="min-w-0">
            <h3 className="text-lg font-medium text-ink">{group.title}</h3>
            <ul className="mt-3">
              {group.items.map((item) => (
                <li key={item} className="border-t border-line py-2.5 text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
