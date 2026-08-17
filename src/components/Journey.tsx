import { motion, useReducedMotion } from 'motion/react'
import labStill from '../assets/lab-still.jpg'
import { stages } from '../data/plan'

export function Journey() {
  const reduce = useReducedMotion()

  return (
    <section id="journey" className="section">
      <div className="page-gutter page-width">
        <h2 className="text-display text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Stages 00 through 06</h2>
        <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted">
          The member journey is present end to end. Flick the row. Each stage ships thin, then deepens after this engagement.
        </p>
      </div>
      <div className="page-gutter page-width mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {stages.map((stage, index) => (
          <motion.article
            key={stage.code}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4, delay: reduce ? 0 : index * 0.04 }}
            className="w-[min(78vw,300px)] shrink-0 snap-start rounded-[16px] border border-line bg-elevated p-4"
          >
            <p className="font-mono text-xs text-muted">
              {stage.code} / W{stage.week}
            </p>
            <h3 className="mt-2 text-lg font-medium text-ink sm:text-xl">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stage.note}</p>
            <p className="mt-3 text-xs text-accent">Thin on purpose</p>
          </motion.article>
        ))}
        <article className="relative w-[min(78vw,260px)] shrink-0 snap-start overflow-hidden rounded-[16px]">
          <img
            src={labStill}
            alt="Quiet laboratory still life with a glass vial on cool grey linen"
            width={1200}
            height={800}
            loading="lazy"
            className="h-full min-h-[200px] w-full object-cover"
          />
        </article>
      </div>
    </section>
  )
}
