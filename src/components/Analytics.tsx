import { ScopeBars } from '../charts/ScopeBars'
import { WeekLoad } from '../charts/WeekLoad'
import { useTheme } from '../theme'
import { Section } from './Section'

export function Analytics() {
  const { theme } = useTheme()

  return (
    <Section id="analytics">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">How the work is weighted</h2>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
        These charts count requirements and workstreams from the scope statement. They are not live product metrics.
      </p>
      <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-2">
        <figure className="min-w-0 rounded-[16px] border border-line bg-elevated p-3 sm:p-4">
          <figcaption className="text-sm font-medium text-ink">Requirement volume by domain</figcaption>
          <p className="mt-1 text-sm text-muted">Member portal holds most of the surface area. Admin is the next largest slice.</p>
          <ScopeBars theme={theme} />
        </figure>
        <figure className="min-w-0 rounded-[16px] border border-line bg-elevated p-3 sm:p-4">
          <figcaption className="text-sm font-medium text-ink">Active workstreams by week</figcaption>
          <p className="mt-1 text-sm text-muted">Stacked presence, not hours. Week 4 carries the most concurrent streams.</p>
          <WeekLoad theme={theme} />
        </figure>
      </div>
    </Section>
  )
}
