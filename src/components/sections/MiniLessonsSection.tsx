import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeIn } from '../motion/FadeIn'

const LESSONS = [
  {
    title: 'Çarpanlara ayırma (hızlı)',
    desc: 'Önce ortak çarpan; sonra (a±b)² ve a²−b² gibi kalıpları kullan.',
  },
  {
    title: 'Fonksiyon: girdi → çıktı',
    desc: 'Fonksiyonu “makine” gibi düşün. Tanım kümesi ve yerine koymayı takip et.',
  },
  {
    title: 'Geometri: çiz ve işaretle',
    desc: 'Temiz şekil hatayı azaltır. Bilinenleri işaretle, sonra işlem yap.',
  },
  {
    title: 'Sınav hız stratejisi',
    desc: 'Kolay puanları topla, takıldığını geç; tabanı sağladıktan sonra geri dön.',
  },
]

export function MiniLessonsSection() {
  return (
    <section id="mini-lessons" className="py-16 sm:py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Mini dersler"
            title="Kısa kavramlar, büyük etki"
            description="Ders aralarında tekrar edilecek, temiz kart notları."
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LESSONS.map((l, idx) => (
            <FadeIn key={l.title} delay={0.04 * idx}>
              <Card className="group p-6 transition hover:-translate-y-1 hover:bg-white">
                <p className="text-sm font-semibold text-zinc-900">{l.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{l.desc}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

