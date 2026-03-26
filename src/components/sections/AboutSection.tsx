import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Hakkımda"
          title="Merhaba, ben Kerem."
          description="İstanbul Üniversitesi Matematik (İngilizce) öğrencisiyim. 5+ yıldır birebir özel ders veriyorum."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="p-6 transition hover:-translate-y-1 hover:bg-white">
            <p className="text-sm font-semibold text-zinc-900">Ders tarzım</p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Önce anlama, sonra hız. Kavramları net ve sistemli şekilde anlatır,
              hedefe yönelik pratikle pekiştiririz.
            </p>
          </Card>
          <Card className="p-6 transition hover:-translate-y-1 hover:bg-white">
            <p className="text-sm font-semibold text-zinc-900">Neler kazanırsın?</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li>• Seviye analizi ve kişisel plan</li>
              <li>• Adım adım çözüm stratejileri</li>
              <li>• Ödev desteği ve geri bildirim</li>
              <li>• Sınav hazırlığı ve zaman yönetimi</li>
            </ul>
          </Card>
          <Card className="p-6 transition hover:-translate-y-1 hover:bg-white">
            <p className="text-sm font-semibold text-zinc-900">Deneyim</p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              5+ yıl özel ders, 50+ öğrenci. Ortaokul, lise ve sınav odaklı
              programlar; online veya yüz yüze (konuma bağlı).
            </p>
          </Card>
        </div>
      </Container>
    </section>
  )
}

