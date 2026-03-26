import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeIn } from '../motion/FadeIn'

const EXAMPLES = [
  {
    title: 'Doğrusal denklem çözümü',
    problem: '3(x − 2) + 5 = 2x + 9',
    steps: [
      'Dağıt: 3x − 6 + 5 = 2x + 9',
      'Sadeleştir: 3x − 1 = 2x + 9',
      '2x çıkar: x − 1 = 9',
      '1 ekle: x = 10',
    ],
  },
  {
    title: 'Fonksiyon değeri bulma',
    problem: 'f(x) = x² − 4x + 1 ise, f(3) kaçtır?',
    steps: ['Yerine koy: f(3) = 3² − 4·3 + 1', 'Hesapla: 9 − 12 + 1', 'Sonuç: f(3) = −2'],
  },
  {
    title: 'Geometri (açılar)',
    problem: 'Bir üçgende açılar (x, 2x, 3x). x kaçtır?',
    steps: ['Toplam 180°: x + 2x + 3x = 180', 'Birleştir: 6x = 180', 'Böl: x = 30°'],
  },
]

export function ExampleSolutionsSection() {
  return (
    <section id="examples" className="border-y border-zinc-200 bg-zinc-50 py-16 sm:py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Soru örnekleri"
            title="Sınav tipi sorularla çalış"
            description="Amaç sadece cevap değil; yöntemi öğrenmek."
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {EXAMPLES.map((ex, idx) => (
            <FadeIn key={ex.title} delay={0.06 * idx}>
              <Card className="group p-6 transition hover:-translate-y-1 hover:bg-white">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-zinc-900">{ex.title}</p>
                  <span className="rounded-full bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 ring-1 ring-zinc-200">
                    Örnek {idx + 1}
                  </span>
                </div>
                <p className="mt-3 rounded-2xl bg-white px-3 py-2 text-sm text-zinc-700 ring-1 ring-zinc-200">
                  {ex.problem}
                </p>
                <ol className="mt-4 space-y-2 text-sm text-zinc-600">
                  {ex.steps.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900/70" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

