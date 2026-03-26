import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'
import { HeroGeometry3D } from './HeroGeometry3D'
import { MathParticles } from '../visuals/MathParticles'
import { useAppSettings } from '../../app/useAppSettings'

export function HomeHero() {
  const { t } = useAppSettings()
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--km-ring)]">
      <div className="pointer-events-none absolute inset-0 grid-fade grid-drift opacity-[0.14]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-[640px] w-[640px] rounded-full bg-fuchsia-400/20 blur-3xl" />
      <MathParticles intensity={26} opacity={0.075} />

      <Container>
        <div className="relative py-16 sm:py-20 lg:py-24">
          <div className="flex items-center gap-6 lg:gap-10">
          <div className="min-w-0 flex-1 max-w-2xl">
            <FadeIn immediate>
              <p className="inline-flex items-center gap-2 rounded-full bg-[color:var(--km-surface)] px-3 py-1 text-xs font-medium text-[color:var(--km-muted)] ring-1 ring-[color:var(--km-ring)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--km-fg)]" />
                {t('hero.badge')}
              </p>
            </FadeIn>

            <FadeIn immediate delay={0.04}>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_18px_50px_rgba(56,189,248,0.35)]">
                  {t('hero.title')}
                </span>
              </h1>
              <p className="mt-4 text-lg font-semibold text-[color:var(--km-fg)] sm:text-xl">
                {t('hero.subtitle')}
              </p>
            </FadeIn>

            <FadeIn immediate delay={0.08}>
              <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--km-muted)] sm:text-lg">
                {t('hero.text')}
              </p>
            </FadeIn>

            <FadeIn immediate delay={0.12}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#navigasyon"
                  className="inline-flex items-center justify-center rounded-2xl bg-[color:var(--km-surface)] px-6 py-3 text-sm font-semibold text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] backdrop-blur transition hover:bg-[color:var(--km-surface-strong)]"
                >
                  {t('hero.ctaSecondary')}
                </a>
              </div>
            </FadeIn>

            <FadeIn immediate delay={0.16}>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[color:var(--km-muted)]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[color:var(--km-fg)]/70" />
                  Oyunlaştırılmış anlatım
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[color:var(--km-fg)]/70" />
                  Bol örnek + pratik
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[color:var(--km-fg)]/70" />
                  Yeni nesil sorular
                </span>
              </div>
            </FadeIn>
          </div>

            {/* 3D şekiller — başlığın sağ yanında */}
            <div className="hidden shrink-0 lg:block lg:w-[460px] xl:w-[520px]" aria-hidden="true">
              <HeroGeometry3D />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

