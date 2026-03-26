import { Container } from '../components/layout/Container'
import { FadeIn } from '../components/motion/FadeIn'
import { Card } from '../components/ui/Card'

export function SoruCozumleriPage() {
  return (
    <Container>
      <FadeIn className="py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-4xl">
          Soru Çözümleri
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--km-muted)]">
          Yakında: seçili sorular, çözüm stratejileri ve adım adım anlatımlar.
        </p>
      </FadeIn>

      <div className="pb-16">
        <Card className="p-6">
          <p className="text-sm font-semibold text-[color:var(--km-fg)]">Plan</p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--km-muted)]">
            Bu sayfaya; konu bazlı soru setleri, çözüm videoları/animasyonları ve
            adım adım açıklamalar ekleyebiliriz.
          </p>
        </Card>
      </div>
    </Container>
  )
}

