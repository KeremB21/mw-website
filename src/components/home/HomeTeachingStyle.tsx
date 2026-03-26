import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'
import { useAppSettings } from '../../app/useAppSettings'

export function HomeTeachingStyle() {
  const { t } = useAppSettings()
  const lines = [
    { title: t('teach.1.t'), desc: t('teach.1.d') },
    { title: t('teach.2.t'), desc: t('teach.2.d') },
    { title: t('teach.3.t'), desc: t('teach.3.d') },
  ]
  return (
    <section className="py-12 sm:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.24em] text-white/70">
              {t('teach.eyebrow')}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-3xl">
              {t('teach.title')}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[color:var(--km-muted)] sm:text-base">
              {t('teach.text')}
            </p>
          </FadeIn>

          <div className="lg:col-span-7">
            <div className="space-y-6">
              {lines.map((l, idx) => (
                <FadeIn key={l.title} delay={0.04 * idx}>
                  <div className="flex gap-4">
                    <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-2xl bg-[color:var(--km-surface)] text-sm font-semibold text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] backdrop-blur">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-[color:var(--km-fg)]">
                        {l.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[color:var(--km-muted)]">
                        {l.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

