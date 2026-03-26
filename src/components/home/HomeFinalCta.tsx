import { Link } from 'react-router-dom'
import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'
import { useAppSettings } from '../../app/useAppSettings'

export function HomeFinalCta() {
  const { t } = useAppSettings()
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[32px] ring-1 ring-zinc-200/70 backdrop-blur">
            <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_12%_18%,rgba(59,130,246,0.26),transparent_60%),radial-gradient(900px_440px_at_88%_22%,rgba(168,85,247,0.24),transparent_60%),radial-gradient(900px_520px_at_55%_80%,rgba(34,211,238,0.22),transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.30))]" />
            <div className="absolute inset-0 grid-fade grid-drift opacity-[0.12]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/15 to-transparent" />

            <div className="relative p-10 sm:p-14">
              <p className="text-xs font-semibold tracking-[0.24em] text-white/70">
                {t('cta.eyebrow')}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[color:var(--km-muted)] sm:text-base">
                {t('cta.text')}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/iletisim"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  {t('cta.button')}
                </Link>
                <a
                  href="https://wa.me/905000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-[color:var(--km-surface)] px-6 py-3 text-sm font-semibold text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] backdrop-blur transition hover:bg-[color:var(--km-surface-strong)]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

