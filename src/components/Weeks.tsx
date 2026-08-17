import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { WeekGantt } from '../charts/WeekGantt'
import { weeks } from '../data/plan'
import { useTheme } from '../theme'
import { Section } from './Section'

export function Weeks() {
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  const [week, setWeek] = useState(1)
  const current = weeks.find((item) => item.id === week) ?? weeks[0]
  if (!current) return null

  return (
    <Section id="weeks">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Week by week</h2>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
        Drag across the chart or choose a week. Motion continues from where you leave the pointer. Build occupies weeks 1 to 4. Week 5 is the acceptance walkthrough.
      </p>
      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Delivery weeks">
        {weeks.map((item) => {
          const selected = item.id === week
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onPointerDown={() => setWeek(item.id)}
              onClick={() => setWeek(item.id)}
              className="relative min-h-10 min-w-10 rounded-full px-3 py-2 text-sm transition-transform duration-100 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97] sm:px-4"
            >
              {selected ? (
                <motion.span
                  layoutId={reduce ? undefined : 'week-pill'}
                  className="absolute inset-0 rounded-full bg-accent-solid"
                  transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-line" />
              )}
              <span className={`relative font-mono ${selected ? 'text-on-accent' : 'text-ink'}`}>W{item.id}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-4 min-w-0 overflow-x-auto rounded-[16px] border border-line bg-elevated p-2 sm:p-3">
        <WeekGantt week={week} onWeekChange={setWeek} reduced={Boolean(reduce)} theme={theme} />
      </div>
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[0.9fr_1.1fr]" aria-live="polite">
        <div className="min-w-0">
          <p className="font-mono text-xs text-muted">Week {current.id}</p>
          <h3 className="mt-2 text-xl font-medium text-ink sm:text-2xl">{current.title}</h3>
          <p className="mt-3 max-w-[52ch] text-muted">{current.summary}</p>
        </div>
        <ol className="grid min-w-0 gap-3 sm:grid-cols-2">
          {current.items.map((item, index) => (
            <li key={item} className="min-w-0 border-t border-line pt-3 text-sm leading-relaxed text-ink">
              <span className="mr-2 font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
