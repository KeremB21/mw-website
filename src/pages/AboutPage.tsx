import { Container } from '../components/layout/Container'
import { FadeIn } from '../components/motion/FadeIn'
import { Card } from '../components/ui/Card'
import { TeachingApproachSection } from '../components/sections/TeachingApproachSection'

export function AboutPage() {
  return (
    <div className="pt-2">
      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <FadeIn className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl bg-[color:var(--km-surface)] ring-1 ring-[color:var(--km-ring)]">
                <img
                  src="/images/istanbul-universitesi.jpg"
                  alt="İstanbul Üniversitesi ana kapı binası"
                  className="h-[260px] w-full object-cover sm:h-[360px]"
                  loading="lazy"
                />
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-6" delay={0.06}>
              <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-4xl">
                Hakkımda
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-[color:var(--km-muted)]">
                İstanbul Üniversitesi Matematik (İngilizce) öğrencisiyim. 5+ yıldır
                ortaokul ve lise seviyesinde birebir özel ders veriyorum.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Card className="p-5 transition hover:-translate-y-1 hover:bg-[color:var(--km-surface-strong)]">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[color:var(--km-muted)]">
                    EĞİTİM
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--km-fg)]">
                    İstanbul Üniversitesi
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--km-muted)]">
                    Matematik (İngilizce)
                  </p>
                </Card>
                <Card className="p-5 transition hover:-translate-y-1 hover:bg-[color:var(--km-surface-strong)]">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[color:var(--km-muted)]">
                    DENEYİM
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--km-fg)]">5+ yıl</p>
                  <p className="mt-1 text-sm text-[color:var(--km-muted)]">Özel ders tecrübesi</p>
                </Card>
                <Card className="p-5 transition hover:-translate-y-1 hover:bg-[color:var(--km-surface-strong)]">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[color:var(--km-muted)]">
                    ÖĞRENCİ
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--km-fg)]">50+ öğrenci</p>
                  <p className="mt-1 text-sm text-[color:var(--km-muted)]">Çalışma geçmişi</p>
                </Card>
                <Card className="p-5 transition hover:-translate-y-1 hover:bg-[color:var(--km-surface-strong)]">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[color:var(--km-muted)]">
                    SEVİYE
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--km-fg)]">
                    Ortaokul · Lise
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--km-muted)]">
                    LGS & YKS odaklı
                  </p>
                </Card>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <TeachingApproachSection />
    </div>
  )
}

