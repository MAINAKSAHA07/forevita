import { gates } from '../data/plan'
import { Section } from './Section'

export function Release() {
  return (
    <Section id="release">
      <h2 className="text-display max-w-[18ch] text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Conditions for real members</h2>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">
        The five-week build is complete in shape. It is not cleared for members until these close. None of them are delivery work. None compress into this engagement.
      </p>
      <p className="mt-4 font-mono text-sm text-accent">0 of 10 closed. Evaluation deploy only.</p>
      <ol className="mt-5 grid min-w-0 gap-2 md:grid-cols-2 md:gap-3">
        {gates.map((gate, index) => (
          <li key={gate} className="flex min-w-0 gap-3 rounded-[16px] bg-elevated p-4">
            <span className="tabular shrink-0 font-mono text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>
            <span className="min-w-0 text-sm leading-relaxed text-ink">{gate}</span>
          </li>
        ))}
      </ol>
    </Section>
  )
}
