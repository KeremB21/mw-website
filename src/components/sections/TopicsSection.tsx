import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const TOPICS = [
  'Ortaokul matematiği',
  'Lise matematiği',
  'Cebir',
  'Fonksiyonlar',
  'Geometri',
  'Sınava hazırlık',
]

export function TopicsSection() {
  return (
    <section id="topics" className="border-y border-zinc-200 bg-zinc-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Konular"
          title="Neler çalışıyoruz?"
          description="Temelden başlayıp sınav seviyesine uzanan net bir yol haritası."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <Card key={t} className="p-5 transition hover:-translate-y-1 hover:bg-white">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-zinc-900" />
                <p className="text-sm font-medium text-zinc-900">{t}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

