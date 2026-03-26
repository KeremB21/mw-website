import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'
import { Card } from '../ui/Card'

const bullets = [
  { title: 'Kavram', desc: 'Önce “neden”i anlarız.' },
  { title: 'Yöntem', desc: 'Adım adım çözüm şablonu kurarız.' },
  { title: 'Pratik', desc: 'Doğru seviyede soru ile hızlanırız.' },
]

export function ShortApproachSection() {
  return (
    <section id="yaklasim" className="py-10 sm:py-12">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-zinc-600">
                KISA YAKLAŞIM
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Net anlatım. Sağlam temel. Sınav aklı.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                Her derste hedef: konuya gerçekten hâkim olmak ve bunu soru çözümüne
                dönüştürmek.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {bullets.map((b, idx) => (
            <FadeIn key={b.title} delay={0.04 * idx}>
              <Card className="p-6 transition hover:-translate-y-1 hover:bg-white">
                <p className="text-sm font-semibold text-zinc-900">{b.title}</p>
                <p className="mt-2 text-sm text-zinc-600">{b.desc}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

