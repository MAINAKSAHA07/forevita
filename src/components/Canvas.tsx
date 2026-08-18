import { CheckCircle, GearSix, Hammer, Package, Question, WarningCircle } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { CanvasCoverageRing } from '../charts/CanvasCoverageRing'
import { CanvasLayerStack } from '../charts/CanvasLayerStack'
import { CanvasStageHeatmap } from '../charts/CanvasStageHeatmap'
import {
  canvasAssessmentNote,
  canvasAssessmentStats,
  canvasIntegration,
  canvasOpenQuestions,
  canvasPartialGaps,
  canvasScope,
  canvasTiers,
  type CanvasTierId,
} from '../data/plan'
import { useTheme } from '../theme'
import { Section } from './Section'

const tierIcons: Record<CanvasTierId, typeof CheckCircle> = {
  included: CheckCircle,
  configure: GearSix,
  build: Hammer,
  addons: Package,
}

export function Canvas() {
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  const [activeId, setActiveId] = useState<CanvasTierId>('included')
  const activeTier = canvasTiers.find((tier) => tier.id === activeId) ?? canvasTiers[0]
  const items = canvasScope[activeId]
  const TierIcon = tierIcons[activeId]

  return (
    <Section id="canvas">
      <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="min-w-0">
          <p className="font-mono text-xs tracking-wide text-accent uppercase">Clinical backbone</p>
          <h2 className="text-display mt-2 text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl md:text-4xl">
            What Canvas covers
          </h2>
          <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-muted">
            Two hundred thirty-eight requirements mapped to Canvas capability. The platform carries clinical ops and FHIR. ForeVita builds plugins, the member surface, and the full AI layer on top.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {canvasAssessmentStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.35, delay: index * 0.04 }}
                className="rounded-[14px] border border-line/80 bg-elevated/70 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4"
              >
                <dt className="text-[11px] leading-snug text-muted sm:text-xs">{item.label}</dt>
                <dd className="tabular mt-1 font-mono text-xl font-medium text-ink sm:text-2xl">{item.value}</dd>
              </motion.div>
            ))}
          </dl>
          <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-muted">{canvasAssessmentNote}</p>
        </div>

        <motion.figure
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
          className="min-w-0 rounded-[18px] border border-line/80 bg-elevated/60 p-3 backdrop-blur-md sm:p-5"
        >
          <figcaption className="text-sm font-medium text-ink">Coverage at a glance</figcaption>
          <p className="mt-1 text-xs text-muted">Verdict mix across all assessed rows</p>
          <CanvasCoverageRing theme={theme} />
        </motion.figure>
      </div>

      <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
        <div className="min-w-0 rounded-[18px] border border-line/80 bg-elevated/50 p-4 backdrop-blur-sm sm:p-5">
          <h3 className="text-lg font-medium tracking-[-0.01em] text-ink sm:text-xl">Platform stack</h3>
          <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">
            Canvas is the thick clinical base. Configure sits above it. Plugins and the member surface float on top without a parallel EMR.
          </p>
          <div className="mt-5">
            <CanvasLayerStack />
          </div>
        </div>

        <figure className="min-w-0 rounded-[18px] border border-line/80 bg-elevated/50 p-3 backdrop-blur-sm sm:p-4">
          <figcaption className="text-sm font-medium text-ink">Verdict by journey stage</figcaption>
          <p className="mt-1 text-xs text-muted">Labs and Rx carry the most partial rows. AI stays mostly ForeVita.</p>
          <CanvasStageHeatmap theme={theme} />
        </figure>
      </div>

      <div className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium tracking-[-0.01em] text-ink sm:text-xl">Scope tiers</h3>
            <p className="mt-1 max-w-[48ch] text-sm text-muted">Tap a tier to see what is included, configured, built, or out of scope.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Canvas scope tiers">
            {canvasTiers.map((tier) => {
              const selected = tier.id === activeId
              const Icon = tierIcons[tier.id]
              const count = canvasScope[tier.id].length
              return (
                <button
                  key={tier.id}
                  type="button"
                  role="tab"
                  id={`canvas-tab-${tier.id}`}
                  aria-selected={selected}
                  aria-controls="canvas-panel"
                  onPointerDown={() => setActiveId(tier.id)}
                  onClick={() => setActiveId(tier.id)}
                  className="relative min-h-10 rounded-full px-3 py-2 text-sm transition-transform duration-100 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97] sm:px-4"
                >
                  {selected ? (
                    <motion.span
                      layoutId={reduce ? undefined : 'canvas-pill'}
                      className="absolute inset-0 rounded-full bg-accent-solid shadow-[0_4px_20px_-6px_rgba(28,79,54,0.5)]"
                      transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full border border-line bg-elevated/80 backdrop-blur-sm" />
                  )}
                  <span className={`relative inline-flex items-center gap-1.5 ${selected ? 'text-on-accent' : 'text-ink'}`}>
                    <Icon size={16} weight={selected ? 'fill' : 'regular'} aria-hidden="true" />
                    <span>{tier.label}</span>
                    <span className={`tabular font-mono text-[11px] ${selected ? 'text-on-accent/80' : 'text-muted'}`}>{count}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          id="canvas-panel"
          role="tabpanel"
          aria-labelledby={`canvas-tab-${activeId}`}
          aria-live="polite"
          className="mt-6 overflow-hidden rounded-[18px] border border-line/80 bg-elevated/40 backdrop-blur-sm"
        >
          <div className="border-b border-line/80 px-4 py-4 sm:px-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <TierIcon size={18} weight="fill" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-muted">{activeTier.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink">{activeTier.note}</p>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={activeId}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
              className="grid min-w-0 gap-px bg-line/60 sm:grid-cols-2"
            >
              {items.map((item, index) => (
                <li
                  key={item.title}
                  className="group bg-elevated/90 px-4 py-4 transition-colors duration-150 sm:px-5 sm:py-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="tabular mt-0.5 font-mono text-[10px] text-muted">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h4 className="text-sm font-medium text-ink sm:text-base">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-12 grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <WarningCircle size={20} weight="duotone" className="text-accent" aria-hidden="true" />
            <h3 className="text-lg font-medium text-ink sm:text-xl">Partial P0 gaps</h3>
          </div>
          <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted">
            Canvas supports these, but ForeVita must design plugin or portal work on top. Forty-five P0 rows are partial in the assessment.
          </p>
          <ul className="mt-4 grid gap-2">
            {canvasPartialGaps.map((item) => (
              <li
                key={item.id}
                className="rounded-[14px] border border-line/80 border-l-[3px] border-l-accent bg-elevated/60 px-4 py-3 backdrop-blur-sm transition-transform duration-100 ease-out active:scale-[0.99]"
              >
                <p className="font-mono text-[10px] text-muted">{item.id}</p>
                <h4 className="mt-1 text-sm font-medium text-ink">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Question size={20} weight="duotone" className="text-accent" aria-hidden="true" />
            <h3 className="text-lg font-medium text-ink sm:text-xl">Open questions</h3>
          </div>
          <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted">
            All ten P0 rows flagged Needs discussion in the Canvas input sheet. Resolve before build locks.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {canvasOpenQuestions.map((item) => (
              <li
                key={item.id}
                className="rounded-[14px] border border-line/80 border-l-[3px] border-l-[#6ba584] bg-elevated/60 px-4 py-3 backdrop-blur-sm transition-transform duration-100 ease-out active:scale-[0.99]"
              >
                <p className="font-mono text-[10px] text-muted">{item.id}</p>
                <h4 className="mt-1 text-sm font-medium text-ink">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-[18px] border border-line/80 bg-gradient-to-br from-accent-soft/40 via-elevated/80 to-elevated/40 p-5 backdrop-blur-sm sm:p-6">
        <h3 className="text-lg font-medium tracking-[-0.01em] text-ink sm:text-xl">How ForeVita uses Canvas</h3>
        <ol className="relative mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
          {canvasIntegration.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4, delay: index * 0.05 }}
              className="relative min-w-0 rounded-[14px] border border-line/70 bg-elevated/80 px-4 py-4 backdrop-blur-sm"
            >
              <span className="tabular inline-flex size-7 items-center justify-center rounded-full bg-accent-solid font-mono text-xs text-on-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h4 className="mt-3 text-sm font-medium text-ink sm:text-base">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
