import { Container } from '../components/layout/Container'
import { FadeIn } from '../components/motion/FadeIn'

export function KonuAnlatimlariPage() {
  return (
    <Container>
      <FadeIn className="py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-4xl">
          Konu Anlatımları
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--km-muted)]">
          Bu sayfayı ileride, her konu için detaylı anlatım ve örnekler ekleyeceğimiz bir içerik
          kütüphanesine dönüştüreceğiz.
        </p>
      </FadeIn>
    </Container>
  )
}

