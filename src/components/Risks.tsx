import { useState } from 'react'
import { RiskBubbles } from '../charts/RiskBubbles'
import { risks } from '../data/plan'
import { useTheme } from '../theme'
import { useReducedMotion } from 'motion/react'
import { Section } from './Section'

type RiskId = (typeof risks)[number]['id']

export function Risks() {
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  const [activeId, setActiveId] = useState<RiskId>('scope')
  const active = risks.find((risk) => risk.id === activeId) ?? risks[0]
  if (!active) return null

  return (
    <Section id="risks">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Risks for this engagement</h2>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted">
        Positions are qualitative judgments from the scope statement, not measured probabilities. Select a bubble to read the mitigation.
      </p>
      <div className="mt-6 grid min-w-0 items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0 overflow-x-auto rounded-[16px] border border-line bg-elevated p-2 sm:p-3">
          <RiskBubbles activeId={activeId} onSelect={setActiveId} reduced={Boolean(reduce)} theme={theme} />
        </div>
        <div className="min-w-0" aria-live="polite">
          <p className="font-mono text-xs text-muted">
            Impact {active.impact} of 5. Likelihood {active.likelihood} of 5.
          </p>
          <h3 className="mt-2 text-xl font-medium text-ink sm:text-2xl">{active.title}</h3>
          <p className="mt-3 text-muted">{active.mitigation}</p>
          <ul className="mt-4 space-y-1">
            {risks.map((risk) => (
              <li key={risk.id}>
                <button
                  type="button"
                  onPointerDown={() => setActiveId(risk.id)}
                  onClick={() => setActiveId(risk.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                    risk.id === activeId ? 'bg-accent-soft text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {risk.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
