import { FadeIn } from '../motion/FadeIn'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const LEVELS = [
  {
    title: 'Ortaokul',
    desc: 'Sağlam temel, korkuyu azaltma ve yönlendirmeli pratikle beceri geliştirme.',
    points: ['Sayılar & kesirler', 'Denklemler & eşitsizlikler', 'Geometri temelleri', 'Problem çözme alışkanlığı'],
  },
  {
    title: 'Lise',
    desc: 'Düzenli, yöntem odaklı çalışma ile mantık ve hız geliştirme.',
    points: ['Cebir & fonksiyonlar', 'Trigonometri temelleri', 'Analitik geometri', 'Sınav tipi karma setler'],
  },
]

export function StudentLevelSection() {
  return (
    <section id="levels" className="border-y border-zinc-200 bg-zinc-50 py-16 sm:py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Seviye"
            title="Ortaokul veya lise"
            description="Seviye farklı, hedef aynı: net kavrayış ve istikrarlı ilerleme."
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {LEVELS.map((lvl, idx) => (
            <FadeIn key={lvl.title} delay={0.06 * idx}>
              <Card className="p-6 transition hover:-translate-y-1">
                <p className="text-sm font-semibold text-zinc-900">{lvl.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{lvl.desc}</p>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {lvl.points.map((pt) => (
                    <div
                      key={pt}
                      className="rounded-xl bg-white px-3 py-2 text-sm text-zinc-700 ring-1 ring-zinc-200"
                    >
                      {pt}
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

