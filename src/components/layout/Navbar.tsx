import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Container } from './Container'
import { useAppSettings } from '../../app/useAppSettings'

const navItems = [
  { to: '/', key: 'nav.home' },
  { to: '/hakkimda', key: 'nav.about' },
  { to: '/lgs', key: 'nav.lgs' },
  { to: '/yks', key: 'nav.yks' },
  { to: '/konu-anlatimlari', key: 'nav.topics' },
  { to: '/soru-cozumleri', key: 'nav.solutions' },
] as const

function NavItem({
  to,
  label,
  tone = 'default',
}: {
  to: string
  label: string
  tone?: 'default' | 'onLight'
}) {
  const styles =
    tone === 'onLight'
      ? {
          active: 'bg-black/5 text-slate-900 ring-1 ring-black/10',
          inactive: 'text-slate-700 hover:bg-black/5 hover:text-slate-900',
        }
      : {
          active:
            'bg-[color:var(--km-surface-strong)] text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)]',
          inactive:
            'text-[color:var(--km-muted)] hover:bg-[color:var(--km-surface)] hover:text-[color:var(--km-fg)]',
        }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'rounded-xl px-3 py-2 text-sm transition',
          isActive ? styles.active : styles.inactive,
        ].join(' ')
      }
      end={to === '/'}
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  const { language, setLanguage, theme, setTheme, t } = useAppSettings()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--km-ring)] bg-[color:var(--km-surface)] backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <NavLink
            to="/"
            className="text-base font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-lg"
          >
            Kerem Math
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((i) => (
              <NavItem key={i.to} to={i.to} label={t(i.key)} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="hidden items-center justify-center rounded-xl bg-[color:var(--km-surface)] px-3 py-2 text-xs font-semibold text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] transition hover:bg-[color:var(--km-surface-strong)] lg:inline-flex"
              aria-label="Dili değiştir"
            >
              {t('nav.lang')}
            </button>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden items-center justify-center rounded-xl bg-[color:var(--km-surface)] px-3 py-2 text-xs font-semibold text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] transition hover:bg-[color:var(--km-surface-strong)] lg:inline-flex"
              aria-label="Temayı değiştir"
            >
              {theme === 'dark' ? 'Aydınlık' : 'Dark'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-xl bg-[color:var(--km-surface)] p-2 text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] backdrop-blur transition hover:bg-[color:var(--km-surface-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--km-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:hidden"
              aria-label="Menüyü aç"
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <div
        className={[
          'fixed inset-0 z-[9999] lg:hidden',
          open ? '' : 'pointer-events-none',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
      >
        <div
          className={[
            'absolute inset-0 bg-black/45 transition-opacity',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setOpen(false)}
        />

        <div
          className={[
            'fixed right-0 top-0 h-svh w-[min(92vw,380px)] bg-white text-slate-900 shadow-2xl ring-1 ring-black/10 transition-transform duration-300',
            open ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          <div className="flex items-center justify-between border-b border-black/10 p-4">
            <NavLink
              to="/"
              className="text-sm font-semibold text-slate-900"
            >
              Kerem Math
            </NavLink>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={
                'inline-flex items-center justify-center rounded-xl bg-black/5 p-2 text-slate-900 ring-1 ring-black/10 transition hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
              }
              aria-label="Menüyü kapat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="p-3">
            <div className="mb-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className="inline-flex items-center justify-center rounded-xl bg-black/5 px-3 py-2 text-xs font-semibold text-slate-900 ring-1 ring-black/10 transition hover:bg-black/10"
              >
                {t('nav.lang')}
              </button>
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="inline-flex items-center justify-center rounded-xl bg-black/5 px-3 py-2 text-xs font-semibold text-slate-900 ring-1 ring-black/10 transition hover:bg-black/10"
              >
                {theme === 'dark' ? 'Aydınlık' : 'Dark'}
              </button>
            </div>
            <div className="grid gap-1">
              {navItems.map((i) => (
                <NavItem key={i.to} to={i.to} label={t(i.key)} tone="onLight" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

