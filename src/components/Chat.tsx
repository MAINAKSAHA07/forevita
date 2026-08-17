import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { ChatFlow } from '../charts/ChatFlow'
import { chatAgents, chatGuardrails, chatKnowledge, chatOkfWiring, chatPipeline, premiumPrice, type ChatAgentId } from '../data/plan'
import { usd } from '../lib/format'
import { Section } from './Section'

export function Chat() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState<ChatAgentId>('s1')
  const active = chatAgents.find((agent) => agent.id === activeId) ?? chatAgents[0]
  if (!active) return null

  return (
    <Section id="chat">
      <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">How the chatbot works</h2>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
        One reasoning stack, three agents. Claude brings pretrained language and medical literacy. ForeVita wires Open Knowledge Format on every call. S1 answers before an account exists. S2 knows the record. S3 is the phase specialist behind {usd.format(premiumPrice)} per month. Member data never trains the model.
      </p>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Chat agents">
        {chatAgents.map((agent) => {
          const selected = agent.id === activeId
          return (
            <button
              key={agent.id}
              type="button"
              role="tab"
              id={`chat-tab-${agent.id}`}
              aria-selected={selected}
              aria-controls="chat-panel"
              onPointerDown={() => setActiveId(agent.id)}
              onClick={() => setActiveId(agent.id)}
              className="relative min-h-10 rounded-full px-4 py-2 text-sm transition-transform duration-100 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97]"
            >
              {selected ? (
                <motion.span
                  layoutId={reduce ? undefined : 'chat-pill'}
                  className="absolute inset-0 rounded-full bg-accent-solid"
                  transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-line" />
              )}
              <span className={`relative ${selected ? 'text-on-accent' : 'text-ink'}`}>
                <span className="font-mono">{agent.code}</span>
                <span className="ml-2 hidden sm:inline">{agent.name}</span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="mt-5 min-w-0 overflow-x-auto pb-1 ps-1 [scrollbar-width:thin] sm:overflow-visible sm:ps-0">
        <ChatFlow activeId={activeId} />
      </div>
      <div
        id="chat-panel"
        role="tabpanel"
        aria-labelledby={`chat-tab-${active.id}`}
        aria-live="polite"
        className="mt-6 grid min-w-0 gap-6 border-t border-line pt-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="min-w-0">
          <p className="font-mono text-xs text-muted">
            AI {active.code} · Journey {active.nodes}
          </p>
          <h3 className="mt-2 text-xl font-medium text-ink">{active.name}</h3>
          <p className="mt-1 text-sm text-muted">{active.who}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink">{active.does}</p>
          <figure className="mt-4 max-w-[52ch] border-l-2 border-accent pl-4">
            <blockquote className="text-sm leading-relaxed text-muted">“{active.example}”</blockquote>
            <figcaption className="mt-2 text-sm leading-relaxed text-ink">{active.experience}</figcaption>
          </figure>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink">Can see</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{active.sees}</p>
          <p className="mt-4 text-sm font-medium text-ink">OKF bundle wired</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{active.okf}</p>
          <p className="mt-4 text-sm font-medium text-ink">Cannot</p>
          <ul className="mt-1">
            {active.cannot.map((item) => (
              <li key={item} className="border-t border-line py-2 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-ink">{active.review}</p>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-medium text-ink sm:text-2xl">From question to answer</h3>
        <ol className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {chatPipeline.map((step, index) => (
            <li key={step.title} className="min-w-0 border-t border-line pt-3">
              <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</p>
              <h4 className="mt-1 text-base font-medium text-ink">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-medium text-ink sm:text-2xl">How OKF is wired</h3>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
          Admin authors concepts. The API scopes them per agent. The adapter assembles the bundle by link before Claude is called. Provenance rides back on every streamed reply.
        </p>
        <ol className="mt-6">
          {chatOkfWiring.map((step, index) => (
            <li key={step.title} className="border-t border-line py-4">
              <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</p>
              <h4 className="mt-1 text-base font-medium text-ink">{step.title}</h4>
              <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-medium text-ink sm:text-2xl">What it knows</h3>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
          Pretrained base plus wired OKF. There is no ForeVita fine-tune. Clinical behaviour is assembled from versioned concepts on each call. Member data never becomes training data.
        </p>
        <ul className="mt-6">
          {chatKnowledge.map((item) => (
            <li key={item.title} className="border-t border-line py-4">
              <h4 className="text-base font-medium text-ink">{item.title}</h4>
              <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-medium text-ink sm:text-2xl">Tested guardrails, not prompt instructions</h3>
        <ul className="mt-4 grid min-w-0 gap-x-8 sm:grid-cols-2">
          {chatGuardrails.map((item) => (
            <li key={item} className="border-t border-line py-2.5 text-sm text-muted">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
