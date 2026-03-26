import { Link } from 'react-router-dom'
import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'
import { Card } from '../ui/Card'
import { MiniGraph } from '../ui/MiniGraph'

const items = [
  {
    to: '/lgs',
    title: 'LGS',
    desc: 'Ortaokul matematiği + yeni nesil soru.',
    graph: 'line' as const,
  },
  {
    to: '/yks',
    title: 'YKS',
    desc: 'Kavram + yöntem + hız.',
    graph: 'parabola' as const,
  },
  {
    to: '/konu-anlatimlari',
    title: 'Konu Anlatımları',
    desc: 'Kısa, temiz ve adım adım.',
    graph: 'sine' as const,
  },
  {
    to: '/soru-cozumleri',
    title: 'Soru Çözümleri',
    desc: 'Strateji + adım adım çözüm.',
    graph: 'line' as const,
  },
]

export function QuickNavSection() {
  return (
    <section id="hizli" className="py-10 sm:py-12">
      <Container>
        <FadeIn className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-zinc-600">
              HIZLI ERİŞİM
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Nereden başlamak istersin?
            </h2>
          </div>
          <Link
            to="/iletisim"
            className="hidden rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 sm:inline-flex"
          >
            İletişim
          </Link>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <FadeIn key={it.to} delay={0.03 * idx}>
              <Link to={it.to} className="group block">
                <Card className="h-full p-6 transition hover:-translate-y-1 hover:bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {it.title}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600">{it.desc}</p>
                    </div>
                    <div className="rounded-2xl bg-zinc-50 p-2 ring-1 ring-zinc-200 transition group-hover:bg-white">
                      <MiniGraph kind={it.graph} />
                    </div>
                  </div>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

