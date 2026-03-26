import { Link } from 'react-router-dom'
import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'

export function HomeCtaSection() {
  return (
    <section className="py-12 sm:py-14">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-white/70 p-8 ring-1 ring-zinc-200/70 backdrop-blur sm:p-10">
            <div className="pointer-events-none absolute inset-0 grid-fade grid-drift opacity-[0.14]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-white/30 to-transparent" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-zinc-600">
                  ÇAĞRI
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  Ders almak ister misin?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 sm:text-base">
                  Seviye ve hedefini yaz, birlikte en doğru planı çıkaralım.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/iletisim"
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  İletişim
                </Link>
                <a
                  href="https://wa.me/905000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white/70 px-5 py-2.5 text-sm font-medium text-zinc-900 ring-1 ring-zinc-200/70 backdrop-blur transition hover:bg-white/80"
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

