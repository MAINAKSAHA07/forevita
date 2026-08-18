import { ScopeBars } from '../charts/ScopeBars'
import { WeekLoad } from '../charts/WeekLoad'
import { useTheme } from '../theme'
import { Section } from './Section'

export function Analytics() {
  const { theme } = useTheme()

  return (
    <Section id="analytics">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">How Canvas answers the sheet</h2>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
        All 238 rows from the Canvas capability assessment. Native is included. Plugin and partial are ForeVita work on Canvas. Open needs a decision. ForeVita only is the AI layer and the public marketing bridge.
      </p>
      <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-2">
        <figure className="min-w-0 rounded-[16px] border border-line bg-elevated p-3 sm:p-4">
          <figcaption className="text-sm font-medium text-ink">Requirements by Canvas verdict</figcaption>
          <p className="mt-1 text-sm text-muted">Plugin work is the bulk. Native is small. Forty-six rows stay outside Canvas on purpose.</p>
          <ScopeBars theme={theme} />
        </figure>
        <figure className="min-w-0 rounded-[16px] border border-line bg-elevated p-3 sm:p-4">
          <figcaption className="text-sm font-medium text-ink">Verdict by product area</figcaption>
          <p className="mt-1 text-sm text-muted">Journey is mostly plugin. Platform is mixed. AI is mostly ForeVita, with plugin overlays for review and context.</p>
          <WeekLoad theme={theme} />
        </figure>
      </div>
    </Section>
  )
}
