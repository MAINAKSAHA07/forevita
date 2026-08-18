import { motion, useReducedMotion } from 'motion/react'
import memberImg from '../assets/surface-member.jpg'
import clinicianImg from '../assets/surface-clinician.jpg'
import adminImg from '../assets/surface-admin.jpg'
import { premiumPrice, surfaces } from '../data/plan'
import { usd } from '../lib/format'
import { Section } from './Section'

const images = {
  member: memberImg,
  clinician: clinicianImg,
  admin: adminImg,
} as const

const alts = {
  member: 'Person reviewing health information on a laptop in a cool, quiet room',
  clinician: 'Clinician reviewing a queue on a large monitor in a calm office',
  admin: 'Rows of sealed diagnostic kits on a stainless packing table',
} as const

export function Surfaces() {
  const reduce = useReducedMotion()
  const member = surfaces.find((surface) => surface.id === 'member')
  const rest = surfaces.filter((surface) => surface.id !== 'member')

  if (!member) return null

  return (
    <Section id="surfaces">
      <h2 className="text-display max-w-[16ch] text-2xl font-medium text-ink sm:text-3xl md:text-4xl">Three surfaces, one product</h2>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted">
        Member web carries the journey. Clinicians chart in Canvas. ForeVita admin and AI sit on top through API consumption.
      </p>
      <div className="mt-6 grid gap-3 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
        <motion.article
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
          className="flex min-w-0 flex-col overflow-hidden rounded-[16px] bg-elevated lg:col-span-2 lg:row-span-2"
        >
          <img
            src={images[member.id]}
            alt={alts[member.id]}
            width={1200}
            height={800}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover lg:min-h-[280px] lg:flex-1 lg:aspect-auto"
          />
          <div className="p-4 sm:p-5">
            <h3 className="text-xl font-medium text-ink sm:text-2xl">{member.title}</h3>
            <p className="mt-2 max-w-[52ch] text-sm text-muted sm:text-base">{member.body}</p>
            <p className="mt-2 text-sm text-muted">
              Premium is {usd.format(premiumPrice)} per month, added in week 3 with a card on file.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-ink sm:grid-cols-3">
              {member.points.map((point) => (
                <li key={point} className="min-w-0 border-t border-line pt-2">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
        {rest.map((surface, index) => (
          <motion.article
            key={surface.id}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.45, delay: reduce ? 0 : 0.06 * (index + 1) }}
            className="grid min-w-0 overflow-hidden rounded-[16px] bg-elevated sm:grid-cols-2 lg:grid-cols-1"
          >
            <img
              src={images[surface.id]}
              alt={alts[surface.id]}
              width={1200}
              height={800}
              loading="lazy"
              className="aspect-[4/3] h-full max-h-48 w-full object-cover sm:max-h-none"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-ink">{surface.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{surface.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
