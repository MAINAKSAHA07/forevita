import { GitCommit, LinkSimple, PencilSimple, PushPin } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { chatOkfWiring, type ChatOkfId } from '../data/plan'

const icons = {
  author: PencilSimple,
  scope: GitCommit,
  assemble: LinkSimple,
  pin: PushPin,
} as const

const conceptGraph = [
  { id: 'protocol', label: 'protocol.ov', version: 'v4' },
  { id: 'band', label: 'band.amh', version: 'v12' },
  { id: 'explainer', label: 'explainer.amh', version: 'v3' },
  { id: 'guard', label: 'guard.tier2', version: 'v7' },
] as const

const graphByStep: Record<ChatOkfId, string[]> = {
  author: ['protocol', 'band', 'explainer', 'guard'],
  scope: ['explainer', 'band'],
  assemble: ['protocol', 'band', 'explainer'],
  pin: ['band', 'protocol'],
}

export function ChatOkfWiring() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState<ChatOkfId>('author')
  const activeIndex = chatOkfWiring.findIndex((step) => step.id === activeId)
  const active = chatOkfWiring[activeIndex] ?? chatOkfWiring[0]
  const ActiveIcon = icons[active.id]
  const lit = new Set(graphByStep[active.id])

  return (
    <div className="min-w-0">
      <div
        className="relative flex min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0"
        role="tablist"
        aria-label="OKF wiring steps"
      >
        {chatOkfWiring.map((step, index) => {
          const selected = step.id === activeId
          const Icon = icons[step.id]
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`okf-tab-${step.id}`}
              aria-selected={selected}
              aria-controls="okf-panel"
              onPointerDown={() => setActiveId(step.id)}
              onClick={() => setActiveId(step.id)}
              className="relative flex w-[min(68vw,12rem)] shrink-0 snap-start flex-col items-start rounded-[14px] border px-3 py-3 text-left transition-transform duration-100 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97] sm:w-auto"
            >
              {selected ? (
                <motion.span
                  layoutId={reduce ? undefined : 'okf-card'}
                  className="absolute inset-0 rounded-[14px] border border-accent/40 bg-accent-soft/80"
                  transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-[14px] border border-line/80 bg-elevated/80 backdrop-blur-sm" />
              )}
              <span className="relative flex items-center gap-2">
                <span
                  className={`flex size-8 items-center justify-center rounded-full ${
                    selected ? 'bg-accent-solid text-on-accent' : 'bg-canvas text-muted'
                  }`}
                >
                  <Icon size={16} weight={selected ? 'fill' : 'regular'} aria-hidden="true" />
                </span>
                <span className={`font-mono text-[11px] ${selected ? 'text-accent' : 'text-muted'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </span>
              <span className={`relative mt-2 text-sm font-medium ${selected ? 'text-ink' : 'text-muted'}`}>
                {step.label}
              </span>
            </button>
          )
        })}
      </div>

      <div
        id="okf-panel"
        role="tabpanel"
        aria-labelledby={`okf-tab-${active.id}`}
        aria-live="polite"
        className="mt-5 overflow-hidden rounded-[18px] border border-line/80 bg-elevated/50 backdrop-blur-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
            className="grid min-w-0 gap-6 p-4 sm:p-5 lg:grid-cols-[0.92fr_1.08fr]"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <ActiveIcon size={18} weight="fill" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs text-muted">
                    Wire {String(activeIndex + 1).padStart(2, '0')} · Open Knowledge Format
                  </p>
                  <h4 className="mt-1 text-lg font-medium tracking-[-0.01em] text-ink">{active.title}</h4>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink">{active.body}</p>
              <p className="mt-3 max-w-[52ch] border-l-2 border-accent pl-3 text-sm leading-relaxed text-muted">
                {active.detail}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.files.map((file) => (
                  <span
                    key={file}
                    className="rounded-full border border-line/80 bg-canvas/80 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur-sm"
                  >
                    {file}
                  </span>
                ))}
              </div>
            </div>

            <figure className="flex min-w-0 flex-col justify-center rounded-[14px] border border-line/70 bg-canvas/60 p-4 backdrop-blur-sm">
              <figcaption className="font-mono text-[10px] tracking-wide text-muted uppercase">
                Concept graph
              </figcaption>
              <ol className="mt-3 space-y-0">
                {conceptGraph.map((node, index) => {
                  const on = lit.has(node.id)
                  return (
                    <li key={node.id}>
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: on ? 1 : 0.38,
                          scale: on ? 1 : 0.98,
                        }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                        className={`flex items-center justify-between rounded-[10px] border px-3 py-2 ${
                          on
                            ? 'border-accent/40 bg-elevated shadow-sm'
                            : 'border-line/70 bg-elevated/50'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate font-mono text-xs text-ink">{node.label}</p>
                          <p className="mt-0.5 text-[10px] text-muted">
                            {on ? 'in bundle' : 'out of scope'}
                          </p>
                        </div>
                        <span className={`font-mono text-[10px] ${on ? 'text-accent' : 'text-muted'}`}>
                          {node.version}
                        </span>
                      </motion.div>
                      {index < conceptGraph.length - 1 ? (
                        <div className="flex h-4 items-center pl-5" aria-hidden="true">
                          <motion.span
                            initial={false}
                            animate={{
                              opacity:
                                on && lit.has(conceptGraph[index + 1]?.id ?? '') ? 1 : 0.25,
                            }}
                            className="h-full w-px bg-accent"
                          />
                          <span className="ml-2 font-mono text-[9px] text-muted">named link</span>
                        </div>
                      ) : null}
                    </li>
                  )
                })}
              </ol>
            </figure>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
