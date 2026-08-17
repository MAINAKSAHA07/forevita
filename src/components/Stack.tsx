import { notInStack, stackGroups, toConfirm } from '../data/plan'
import { Section } from './Section'

export function Stack() {
  return (
    <Section id="stack">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Technology stack</h2>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted">
        TypeScript throughout. Data, auth, and uploads sit on Supabase. Clinical knowledge is Open Knowledge Format. Claude sits behind an internal adapter.
      </p>
      <div className="mt-6 grid min-w-0 gap-8 md:grid-cols-2">
        {stackGroups.map((group) => (
          <div key={group.title} className="min-w-0">
            <h3 className="text-lg font-medium text-ink">{group.title}</h3>
            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <li key={item} className="min-w-0 border-t border-line pt-2 text-sm break-words text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 grid min-w-0 gap-6 border-t border-line pt-6 lg:grid-cols-2">
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-ink">Not in this stack</h3>
          <p className="mt-2 text-sm text-muted">Held until vendor contracts exist.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {notInStack.map((item) => (
              <li key={item} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-ink">Still to confirm</h3>
          <p className="mt-2 text-sm text-muted">Technical choices that do not block week one design work.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {toConfirm.map((item) => (
              <li key={item} className="rounded-full bg-accent-soft px-3 py-1.5 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
