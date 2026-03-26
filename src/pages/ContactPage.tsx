import { Container } from '../components/layout/Container'
import { FadeIn } from '../components/motion/FadeIn'
import { ContactSection } from '../components/sections/ContactSection'

export function ContactPage() {
  return (
    <div className="pt-2">
      <Container>
        <FadeIn className="py-10 sm:py-14">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-4xl">
            İletişim
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--km-muted)]">
            Ders planlamak için mesaj gönderebilirsin.
          </p>
        </FadeIn>
      </Container>
      <ContactSection />
    </div>
  )
}

