import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section page-gutter ${className}`.trim()}>
      <div className="page-width">{children}</div>
    </section>
  )
}
