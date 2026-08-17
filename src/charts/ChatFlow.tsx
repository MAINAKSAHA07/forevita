import { Fragment } from 'react'
import { chatAgents, type ChatAgentId } from '../data/plan'

const hops = ['Signup', 'Upgrade'] as const

type ChatFlowProps = {
  activeId: ChatAgentId
}

export function ChatFlow({ activeId }: ChatFlowProps) {
  return (
    <div className="flex min-w-max snap-x snap-mandatory items-stretch sm:w-full sm:min-w-0" aria-hidden="true">
      {chatAgents.map((agent, index) => {
        const selected = agent.id === activeId
        const who = agent.who.split(',')[0] ?? agent.who
        return (
          <Fragment key={agent.id}>
            {index > 0 ? (
              <div className="flex w-16 shrink-0 flex-col items-center justify-center self-center sm:w-20 md:w-24">
                <p className="font-mono text-[11px] text-muted">{hops[index - 1]}</p>
                <div className="mt-1.5 h-px w-full bg-line" />
              </div>
            ) : null}
            <div
              className={`flex w-[min(72vw,15.5rem)] shrink-0 snap-start flex-col rounded-[16px] border px-4 py-3.5 sm:w-auto sm:min-w-0 sm:flex-1 ${
                selected ? 'border-accent bg-accent-soft' : 'border-line bg-elevated'
              }`}
            >
              <span className={`font-mono text-xs ${selected ? 'text-accent' : 'text-muted'}`}>AI {agent.code}</span>
              <span className="mt-1 text-sm font-medium leading-snug text-ink">{agent.name}</span>
              <span className="mt-1 text-xs leading-snug text-muted">{who}</span>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
