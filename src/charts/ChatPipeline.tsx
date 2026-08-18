import { Funnel, PlugsConnected, ShieldCheck, Sparkle } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { chatPipeline, type ChatPipelineId } from '../data/plan'

const icons = {
  scope: Funnel,
  wire: PlugsConnected,
  infer: Sparkle,
  gate: ShieldCheck,
} as const

type ChatPipelineProps = {
  activeAgentCode?: string
}

export function ChatPipeline({ activeAgentCode = 'S1' }: ChatPipelineProps) {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState<ChatPipelineId>('scope')
  const activeIndex = chatPipeline.findIndex((step) => step.id === activeId)
  const active = chatPipeline[activeIndex] ?? chatPipeline[0]
  const ActiveIcon = icons[active.id]

  return (
    <div className="min-w-0">
      <div
        className="relative flex min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0"
        role="tablist"
        aria-label="Inference pipeline steps"
      >
        <div
          className="pointer-events-none absolute top-[1.65rem] right-4 left-4 hidden h-px bg-line sm:block"
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute top-[1.65rem] left-4 hidden h-px w-[calc(100%-2rem)] origin-left bg-accent sm:block"
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: activeIndex <= 0 ? 0 : activeIndex / (chatPipeline.length - 1) }}
          transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
        />

        {chatPipeline.map((step, index) => {
          const selected = step.id === activeId
          const Icon = icons[step.id]
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`pipeline-tab-${step.id}`}
              aria-selected={selected}
              aria-controls="pipeline-panel"
              onPointerDown={() => setActiveId(step.id)}
              onClick={() => setActiveId(step.id)}
              className="relative flex w-[min(68vw,11rem)] shrink-0 snap-start flex-col items-center px-2 pt-1 transition-transform duration-100 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97] sm:w-auto"
            >
              <span className="relative flex size-11 items-center justify-center">
                {selected ? (
                  <motion.span
                    layoutId={reduce ? undefined : 'pipeline-node'}
                    className="absolute inset-0 rounded-full bg-accent-solid shadow-[0_4px_20px_-6px_rgba(28,79,54,0.55)]"
                    transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full border border-line bg-elevated/90 backdrop-blur-sm" />
                )}
                <Icon
                  size={20}
                  weight={selected ? 'fill' : 'regular'}
                  className={`relative ${selected ? 'text-on-accent' : 'text-muted'}`}
                  aria-hidden="true"
                />
              </span>
              <span className={`mt-2 font-mono text-[11px] ${selected ? 'text-accent' : 'text-muted'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`mt-0.5 text-sm font-medium ${selected ? 'text-ink' : 'text-muted'}`}>{step.label}</span>
            </button>
          )
        })}
      </div>

      <div
        id="pipeline-panel"
        role="tabpanel"
        aria-labelledby={`pipeline-tab-${active.id}`}
        aria-live="polite"
        className="mt-6 overflow-hidden rounded-[18px] border border-line/80 bg-elevated/50 backdrop-blur-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
            className="grid min-w-0 gap-6 p-4 sm:p-5 lg:grid-cols-[1fr_0.9fr]"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <ActiveIcon size={18} weight="fill" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs text-muted">
                    Step {String(activeIndex + 1).padStart(2, '0')} · Agent {activeAgentCode}
                  </p>
                  <h4 className="mt-1 text-lg font-medium tracking-[-0.01em] text-ink">{active.title}</h4>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink">{active.body}</p>
              <p className="mt-3 max-w-[52ch] border-l-2 border-accent pl-3 text-sm leading-relaxed text-muted">{active.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.systems.map((system) => (
                  <span
                    key={system}
                    className="rounded-full border border-line/80 bg-canvas/80 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur-sm"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>

            <PipelineDiagram stepId={active.id} reduce={Boolean(reduce)} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function PipelineDiagram({ stepId, reduce }: { stepId: ChatPipelineId; reduce: boolean }) {
  const nodes =
    stepId === 'scope'
      ? [
          { label: 'Member', sub: 'question' },
          { label: 'API', sub: 'auth + scope' },
        ]
      : stepId === 'wire'
        ? [
            { label: 'OKF', sub: 'bundle' },
            { label: 'Adapter', sub: 'assemble' },
            { label: 'Context', sub: 'ready' },
          ]
        : stepId === 'infer'
          ? [
              { label: 'Adapter', sub: 'call' },
              { label: 'Claude', sub: 'stream' },
              { label: 'Member', sub: 'SSE tokens' },
            ]
          : [
              { label: 'Draft', sub: 'lint' },
              { label: 'Gate', sub: 'route' },
              { label: 'Release', sub: 'or hold' },
            ]

  return (
    <figure className="flex min-h-[140px] min-w-0 flex-col justify-center rounded-[14px] border border-line/70 bg-canvas/60 p-4 backdrop-blur-sm">
      <figcaption className="font-mono text-[10px] tracking-wide text-muted uppercase">Data path</figcaption>
      <div className="mt-3 flex min-w-0 items-center justify-between gap-1">
        {nodes.map((node, index) => (
          <div key={node.label} className="flex min-w-0 flex-1 items-center gap-1">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35, delay: index * 0.05 }}
              className="min-w-0 flex-1 rounded-[10px] border border-line/80 bg-elevated/90 px-2 py-2 text-center shadow-sm"
            >
              <p className="truncate text-xs font-medium text-ink">{node.label}</p>
              <p className="mt-0.5 truncate font-mono text-[10px] text-muted">{node.sub}</p>
            </motion.div>
            {index < nodes.length - 1 ? (
              <motion.span
                initial={reduce ? false : { opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3, delay: index * 0.05 + 0.04 }}
                className="h-px w-3 shrink-0 origin-left bg-accent/60 sm:w-4"
                aria-hidden="true"
              />
            ) : null}
          </div>
        ))}
      </div>
      {stepId === 'infer' ? (
        <div className="mt-3 overflow-hidden rounded-[8px] border border-line/60 bg-elevated/80 px-3 py-2">
          <p className="font-mono text-[10px] text-muted">stream</p>
          <p className="mt-1 truncate text-xs text-ink">
            <motion.span
              initial={false}
              animate={reduce ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
              transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-accent"
            >
              ▌
            </motion.span>
            <span className="text-muted"> Based on your AMH and cycle day…</span>
          </p>
        </div>
      ) : null}
      {stepId === 'gate' ? (
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] text-accent">pass</span>
          <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">hold tier 2</span>
          <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">crisis route</span>
        </div>
      ) : null}
    </figure>
  )
}
