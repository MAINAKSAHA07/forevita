import { useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArchitectureGraph } from '../charts/ArchitectureGraph'
import { architectureNodes, okfVsRag, projectBeats, type ArchitectureId } from '../data/plan'
import { useTheme } from '../theme'
import { Section } from './Section'

export function System() {
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  const [activeId, setActiveId] = useState<ArchitectureId>('okf')
  const active = architectureNodes.find((node) => node.id === activeId) ?? architectureNodes[0]
  if (!active) return null

  return (
    <Section id="system">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">How the product is wired</h2>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
        Three surfaces share one API. The API holds the member record in Supabase, charges through Stripe, and grounds Claude in an Open Knowledge Format bundle rather than a vector index.
      </p>
      <div className="mt-6 grid min-w-0 gap-5">
        {projectBeats.map((beat) => (
          <article key={beat.title} className="min-w-0 border-t border-line pt-3">
            <h3 className="text-base font-medium text-ink">{beat.title}</h3>
            <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">{beat.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 min-w-0 rounded-[16px] border border-line bg-elevated p-2 sm:p-3">
        <ArchitectureGraph activeId={activeId} onSelect={setActiveId} reduced={Boolean(reduce)} theme={theme} />
      </div>
      <div className="mt-4" aria-live="polite">
        <p className="font-mono text-xs text-muted">{active.label}</p>
        <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-ink">{active.detail}</p>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-medium text-ink sm:text-2xl">Why Open Knowledge Format, not RAG</h3>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
          OKF is a vendor-neutral wiki for models: one markdown file per concept, YAML frontmatter, explicit links. RAG reconstructs meaning from similar fragments at query time. A formula a member might act on needs the first, not the second.
        </p>
        <ul className="mt-6">
          {okfVsRag.map((row) => (
            <li key={row.topic} className="grid gap-2 border-t border-line py-4 md:grid-cols-3">
              <p className="text-sm font-medium text-ink">{row.topic}</p>
              <p className="text-sm leading-relaxed text-ink md:col-span-1">
                <span className="font-medium">OKF. </span>
                {row.okf}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">RAG. </span>
                {row.rag}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
