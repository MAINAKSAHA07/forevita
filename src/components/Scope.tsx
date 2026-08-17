import { motion, useReducedMotion } from 'motion/react'
import { ShapeDepth } from '../charts/ShapeDepth'
import { assumptions, metrics } from '../data/plan'
import { useTheme } from '../theme'
import { Section } from './Section'

export function Scope() {
  const reduce = useReducedMotion()
  const { theme } = useTheme()

  return (
    <Section id="plan">
      <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="min-w-0">
          <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">The first shippable increment</h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
            Every stage of the journey is present and operable. Depth is deliberately shallow: one phase agent, one extraction format, a subset of lab exceptions, and vendor steps served by stubs until contracts exist.
          </p>
          <dl className="mt-6 grid grid-cols-2 overflow-hidden rounded-[16px] border border-line bg-elevated sm:grid-cols-4">
            {metrics.map((item) => (
              <div key={item.label} className="border-line px-4 py-4 border-t first:border-t-0 sm:border-t-0 sm:border-l sm:px-5 sm:first:border-l-0">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="tabular mt-1 font-mono text-2xl text-ink sm:text-3xl">{item.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {assumptions.map((item) => (
              <li key={item} className="border-t border-line pt-3 text-sm leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
          className="min-w-0 rounded-[16px] border border-line bg-elevated p-3 sm:p-4"
        >
          <p className="font-mono text-xs text-muted">Shape is complete. Depth stays thin.</p>
          <ShapeDepth reduced={Boolean(reduce)} theme={theme} />
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              Outer ring: stage present
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full bg-accent-soft" aria-hidden="true" />
              Inner ring: thin depth
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
