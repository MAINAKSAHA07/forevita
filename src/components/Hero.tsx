import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import heroKit from '../assets/hero-kit.jpg'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="page-gutter pb-8 pt-[calc(var(--nav-h)+0.75rem)] md:pb-10">
      <div className="page-width grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0 max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Four week MVP</p>
          <h1 className="text-display mt-3 text-[1.85rem] font-medium text-ink sm:text-4xl md:text-5xl lg:text-6xl">
            Four Weeks to a Complete Member Journey
          </h1>
          <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-muted">
            Stages 00 through 06 on responsive web, plus Canvas for clinical ops, ForeVita AI, and admin. Thin in depth, complete in shape.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#weeks"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent-solid px-5 py-2.5 text-sm font-medium whitespace-nowrap text-on-accent transition-transform duration-100 ease-out hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none active:scale-[0.97]"
            >
              Read the Plan
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#release"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-elevated px-5 py-2.5 text-sm font-medium whitespace-nowrap text-ink transition-transform duration-100 ease-out hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97]"
            >
              Release Gates
            </a>
          </div>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          className="min-w-0"
        >
          <img
            src={heroKit}
            alt="Hands opening a forest-green at-home health kit on a cool stone surface"
            width={1536}
            height={1024}
            fetchPriority="high"
            className="aspect-[16/10] w-full rounded-[16px] object-cover sm:aspect-[16/9]"
          />
        </motion.div>
      </div>
    </section>
  )
}
