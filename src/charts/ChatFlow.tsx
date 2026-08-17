import { Fragment } from 'react'
import { chatAgents, type ChatAgentId } from '../data/plan'

const hops = ['Signup', 'Upgrade'] as const

type ChatFlowProps = {
  activeId: ChatAgentId
  onSelect: (id: ChatAgentId) => void
}

export function ChatFlow({ activeId, onSelect }: ChatFlowProps) {
  return (
    <div className="flex min-w-max snap-x snap-mandatory items-stretch sm:w-full sm:min-w-0" role="group" aria-label="Chat agent flow">
      {chatAgents.map((agent, index) => {
        const selected = agent.id === activeId
        const who = agent.who.split(',')[0] ?? agent.who
        return (
          <Fragment key={agent.id}>
            {index > 0 ? (
              <div className="flex w-16 shrink-0 flex-col items-center justify-center self-center sm:w-20 md:w-24" aria-hidden="true">
                <p className="font-mono text-[11px] text-muted">{hops[index - 1]}</p>
                <div className="mt-1.5 h-px w-full bg-line" />
              </div>
            ) : null}
            <button
              type="button"
              aria-pressed={selected}
              aria-label={`${agent.code}. ${agent.name}`}
              onPointerDown={() => onSelect(agent.id)}
              onClick={() => onSelect(agent.id)}
              className={`flex w-[min(72vw,15.5rem)] shrink-0 snap-start flex-col items-start rounded-[16px] border px-4 py-3.5 text-left transition-[transform,background-color,border-color,color] duration-100 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97] sm:w-auto sm:min-w-0 sm:flex-1 ${
                selected ? 'border-accent bg-accent-soft' : 'border-line bg-elevated'
              }`}
            >
              <span className={`font-mono text-xs ${selected ? 'text-accent' : 'text-muted'}`}>AI {agent.code}</span>
              <span className="mt-1 text-sm font-medium leading-snug text-ink">{agent.name}</span>
              <span className="mt-1 text-xs leading-snug text-muted">{who}</span>
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}
