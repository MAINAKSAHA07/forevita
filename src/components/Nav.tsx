import { List, Moon, Sun, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { useTheme } from '../theme'

const links = [
  { href: '#plan', label: 'Plan' },
  { href: '#weeks', label: 'Weeks' },
  { href: '#surfaces', label: 'Surfaces' },
  { href: '#system', label: 'System' },
  { href: '#chat', label: 'Chat' },
  { href: '#release', label: 'Release' },
] as const

export function Nav() {
  const { theme, toggle } = useTheme()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  return (
    <header className="nav-glass fixed inset-x-0 top-0 z-[40] pt-[env(safe-area-inset-top,0px)]">
      <div className="page-gutter page-width flex h-14 items-center justify-between gap-3 md:h-16 md:gap-6">
        <a href="#top" className="shrink-0 text-[15px] font-medium tracking-tight text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" translate="no">
          ForeVita
        </a>
        <nav className="hidden items-center gap-4 lg:flex lg:gap-5 xl:gap-7" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onPointerDown={(event) => event.currentTarget.setAttribute('data-pressed', 'true')}
            onPointerUp={(event) => event.currentTarget.removeAttribute('data-pressed')}
            onClick={toggle}
            className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-transform duration-100 ease-out hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97]"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} weight="regular" aria-hidden="true" /> : <Moon size={18} weight="regular" aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-transform duration-100 ease-out hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.97] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="sheet-panel border-t border-line bg-canvas px-4 py-3 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-ink hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
