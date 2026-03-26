import { Link } from 'react-router-dom'
import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'
import { useAppSettings } from '../../app/useAppSettings'

const items = [
  {
    to: '/lgs',
    title: 'LGS',
    subtitle: 'Ortaokul matematik + yeni nesil soru',
  },
  {
    to: '/yks',
    title: 'YKS',
    subtitle: 'Lise matematik + sınav odaklı pratik',
  },
  {
    to: '/konu-anlatimlari',
    title: 'Konu Anlatımları',
    subtitle: 'Kısa ve sistemli özetler',
  },
  {
    to: '/soru-cozumleri',
    title: 'Soru Çözümleri',
    subtitle: 'Strateji ve adım adım çözüm',
  },
]

export function HomeNavTiles() {
  const { t } = useAppSettings()
  return (
    <section id="navigasyon" className="py-12 sm:py-14">
      <Container>
        <FadeIn>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-white/70">
                {t('navTiles.eyebrow')}
              </p>
            </div>
            <Link
              to="/iletisim"
              className="hidden rounded-2xl bg-[color:var(--km-surface)] px-5 py-2.5 text-sm font-semibold text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] backdrop-blur transition hover:bg-[color:var(--km-surface-strong)] sm:inline-flex"
            >
              {t('navTiles.contact')}
            </Link>
          </div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <FadeIn key={it.to} delay={0.04 * idx}>
              <Link
                to={it.to}
                className="group relative block overflow-hidden rounded-[28px] ring-1 ring-[color:var(--km-ring)] backdrop-blur shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Not a “card grid”: big premium tile */}
                <div className="absolute inset-0 bg-[radial-gradient(650px_260px_at_10%_10%,rgba(59,130,246,0.26),transparent_62%),radial-gradient(620px_280px_at_90%_20%,rgba(168,85,247,0.24),transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.30))]" />
                <div className="absolute inset-0 grid-fade grid-drift opacity-[0.12]" />
                <div className="absolute -inset-24 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.14),rgba(168,85,247,0.12),rgba(148,163,184,0.10),rgba(59,130,246,0.14))] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/35 via-white/15 to-transparent transition-opacity group-hover:opacity-80" />

                <div className="relative p-7 sm:p-9">
                  <p className="text-3xl font-semibold tracking-tight text-[color:var(--km-fg)]">
                    {it.title}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-[color:var(--km-muted)]">
                    {it.subtitle}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

