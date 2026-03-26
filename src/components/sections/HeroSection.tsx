import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'
import { Link } from 'react-router-dom'
import { LazyHeroMathScene3D } from '../visuals/LazyHeroMathScene3D'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200">
      <div className="pointer-events-none absolute inset-0 grid-fade grid-drift opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-zinc-900/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-[640px] w-[640px] rounded-full bg-zinc-900/5 blur-3xl" />

      <Container>
        <div className="relative grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:items-center">
          <FadeIn className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
              İstanbul Üniversitesi · Matematik (İngilizce)
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
              Kerem Math
            </h1>
            <p className="mt-4 text-lg font-medium text-zinc-900/80">
              Özel Matematik Öğretmeni
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
              Net anlatım, sağlam temel ve gerçek matematiksel kavrayış.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/iletisim"
                className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Ders Planla
              </Link>
              <a
                href="#hizli"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Hızlı erişim
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-zinc-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
                <p className="text-sm font-semibold text-zinc-900">5+ yıl</p>
                <p className="mt-1 text-xs text-zinc-600">Deneyim</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-zinc-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
                <p className="text-sm font-semibold text-zinc-900">50+ öğrenci</p>
                <p className="mt-1 text-xs text-zinc-600">Tecrübe</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-zinc-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
                <p className="text-sm font-semibold text-zinc-900">Net anlatım</p>
                <p className="mt-1 text-xs text-zinc-600">Kavram → yöntem</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-6" delay={0.08}>
            <LazyHeroMathScene3D className="h-[280px] sm:h-[360px] lg:h-[420px]" />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

