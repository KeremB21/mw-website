import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'
import { Card } from '../ui/Card'
import { MiniPortrait3D } from '../visuals/MiniPortrait3D'

function Avatar() {
  return (
    <div className="relative aspect-square w-40 sm:w-48 mx-auto overflow-hidden rounded-3xl ring-1 ring-[color:var(--km-ring)]">
      <img
        src="/images/kerem.png"
        alt="Kerem"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  )
}

export function HomeAboutMini() {
  return (
    <section className="py-12 sm:py-14">
      <Container>
        <FadeIn>
          <Card className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-start">
              <div className="sm:col-span-4 sm:self-center sm:flex sm:justify-center">
                <Avatar />
              </div>

              <div className="sm:col-span-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold tracking-[0.24em] text-[color:var(--km-muted)]">
                    NEDEN BEN?
                  </p>
                  <MiniPortrait3D className="h-14 w-14 shrink-0" />
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--km-fg)]">
                  Matematiği daha net anlatırım çünkü…
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--km-muted)] sm:text-base">
                  İstanbul Üniversitesi’nde matematik okuyorum. Matematikte düşünme
                  biçimi ispat ve mantık üzerine kurulur; ben de derslerde “neden
                  böyle?” sorusunu merkeze alıp konuyu gerçekten kavratmaya odaklanırım.
                </p>

                <ul className="mt-5 space-y-2 text-sm text-[color:var(--km-muted)]">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--km-fg)]/70" />
                    <span>Ezber yerine mantık ve bağlantılar</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--km-fg)]/70" />
                    <span>Adım adım, temiz çözüm alışkanlığı</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--km-fg)]/70" />
                    <span>Seviyeye göre net plan + düzenli pratik</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </FadeIn>
      </Container>
    </section>
  )
}

