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
  const { language, setLanguage, t } = useAppSettings()
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
    <>
      {/* ── Sticky navbar ── */}
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
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-xl bg-[color:var(--km-surface)] p-2 text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] backdrop-blur transition hover:bg-[color:var(--km-surface-strong)] focus-visible:outline-none lg:hidden"
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
      </header>

      {/* ── Mobil drawer — header DIŞINDA, doğrudan DOM köküne yakın ── */}
      <div
        className={[
          'fixed inset-0 z-[9999] lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
      >
        {/* Backdrop — her yere tıklayınca kapanır */}
        <div
          className={[
            'absolute inset-0 bg-black/60 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setOpen(false)}
        />

        {/* Drawer paneli */}
        <div
          className={[
            'absolute right-0 top-0 flex h-full w-[min(85vw,340px)] flex-col',
            'bg-[#060d1f] shadow-2xl ring-1 ring-white/10',
            'transition-transform duration-300 ease-in-out',
            open ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <NavLink
              to="/"
              className="text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Kerem Math
            </NavLink>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-xl bg-white/10 p-2 text-white ring-1 ring-white/10 transition hover:bg-white/20 focus-visible:outline-none"
              aria-label="Menüyü kapat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav linkleri */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="grid gap-1">
              {navItems.map((i) => (
                <NavItem key={i.to} to={i.to} label={t(i.key)} />
              ))}
            </div>
          </nav>

          {/* Alt — dil butonu */}
          <div className="border-t border-white/10 px-3 py-4">
            <button
              type="button"
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="inline-flex w-full items-center justify-center rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/20"
            >
              {t('nav.lang')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

