import { motion, useReducedMotion } from 'motion/react'
import { canvasLayerStack } from '../data/plan'

export function CanvasLayerStack() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-md" aria-label="Stack from Canvas clinical base up to ForeVita member surface">
      <div className="flex flex-col-reverse gap-2">
        {canvasLayerStack.map((layer, index) => {
          const isBase = layer.id === 'canvas'
          return (
            <motion.div
              key={layer.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4, delay: index * 0.06 }}
              className={`relative overflow-hidden rounded-[14px] border px-4 py-3 backdrop-blur-md transition-transform duration-100 ease-out active:scale-[0.99] ${
                isBase
                  ? 'border-accent/30 bg-accent-solid/90 text-on-accent shadow-[0_12px_40px_-12px_rgba(28,79,54,0.45)]'
                  : 'border-line/80 bg-elevated/80 text-ink shadow-sm'
              }`}
              style={{ minHeight: `${layer.weight * 18 + 36}px` }}
            >
              {!isBase ? (
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.35]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)',
                  }}
                  aria-hidden="true"
                />
              ) : null}
              <p className={`relative text-sm font-medium ${isBase ? 'text-on-accent' : 'text-ink'}`}>{layer.label}</p>
              <p className={`relative mt-1 text-xs leading-relaxed ${isBase ? 'text-on-accent/80' : 'text-muted'}`}>{layer.share}</p>
            </motion.div>
          )
        })}
      </div>
      <p className="mt-3 text-center font-mono text-[10px] tracking-wide text-muted uppercase">Bottom up: platform to product</p>
    </div>
  )
}
