import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { FadeIn } from '../components/motion/FadeIn'
import { Card } from '../components/ui/Card'

const grade9 = [
  'Mantık ve önermeler',
  'Kümeler ve işlemleri, Kartezyen çarpım',
  'Denklemler ve eşitsizlikler, mutlak değer',
  'Üslü ve köklü ifadeler',
  'Oran-orantı ve problemler',
  'Üçgenler, eşlik, benzerlik, trigonometrinin temeli',
  'Veri: merkezî eğilim ve yayılım, grafikler',
  'Fonksiyon kavramı ve türleri',
  'Veriden olasılığa giriş',
] as const

const grade10 = [
  'Sayma ve olasılık: permütasyon, kombinasyon, binom, olasılık',
  'Fonksiyonlar: özellikler, bileşke, ters, grafikler',
  'Polinomlar ve polinomlarda işlemler',
  'İkinci dereceden denklemler, karmaşık sayılar',
  'Çokgenler ve özel dörtgenler',
  'Uzay geometri: prizma ve piramitler',
] as const

const grade11 = [
  'Trigonometri: yönlü açılar, trigonometrik fonksiyonlar, birim çember',
  'Sinüs–kosinüs teoremleri, ters trigonometrik fonksiyonlar',
  'Analitik geometri: doğru ve analitik düzlem',
  'Fonksiyonlarla uygulamalar, parabol ve dönüşümler',
  'Denklem ve eşitsizlik sistemleri',
  'Çember ve daire',
  'Uzay geometri ve olasılık',
] as const

const grade12 = [
  'Üstel ve logaritma fonksiyonları',
  'Üstel–logaritmik denklemler ve eşitsizlikler',
  'Gerçek sayı dizileri',
  'Trigonometrik denklemler ve açı formülleri',
  'Analitik düzlemde temel dönüşümler',
  'Limit ve süreklilik, türev ve uygulamaları',
  'Belirsiz ve belirli integral, uygulamalar',
  'Çemberin analitik incelenmesi',
] as const

export function YksPage() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const toggle = (key: string) => setOpenKey((prev) => (prev === key ? null : key))

  return (
    <Container>
      <FadeIn className="py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-4xl">
          YKS
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--km-muted)]">
          9, 10, 11 ve 12. sınıf matematik konularını TYT–AYT odaklı, sistemli bir şekilde işleriz.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2">
        <FadeIn>
          <Card className="p-5">
            <button
              type="button"
              onClick={() => toggle('9')}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <p className="text-base font-semibold text-[color:var(--km-fg)]">9. Sınıf Konuları</p>
              <span className="text-sm text-[color:var(--km-muted)]">
                {openKey === '9' ? 'Kapat' : 'Konuları göster'}
              </span>
            </button>
            {openKey === '9' && (
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[color:var(--km-muted)]">
                {grade9.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            )}
          </Card>
        </FadeIn>
        <FadeIn delay={0.03}>
          <Card className="p-5">
            <button
              type="button"
              onClick={() => toggle('10')}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <p className="text-base font-semibold text-[color:var(--km-fg)]">10. Sınıf Konuları</p>
              <span className="text-sm text-[color:var(--km-muted)]">
                {openKey === '10' ? 'Kapat' : 'Konuları göster'}
              </span>
            </button>
            {openKey === '10' && (
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[color:var(--km-muted)]">
                {grade10.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            )}
          </Card>
        </FadeIn>
        <FadeIn delay={0.06}>
          <Card className="p-5">
            <button
              type="button"
              onClick={() => toggle('11')}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <p className="text-base font-semibold text-[color:var(--km-fg)]">11. Sınıf Konuları</p>
              <span className="text-sm text-[color:var(--km-muted)]">
                {openKey === '11' ? 'Kapat' : 'Konuları göster'}
              </span>
            </button>
            {openKey === '11' && (
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[color:var(--km-muted)]">
                {grade11.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            )}
          </Card>
        </FadeIn>
        <FadeIn delay={0.09}>
          <Card className="p-5">
            <button
              type="button"
              onClick={() => toggle('12')}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <p className="text-base font-semibold text-[color:var(--km-fg)]">12. Sınıf Konuları</p>
              <span className="text-sm text-[color:var(--km-muted)]">
                {openKey === '12' ? 'Kapat' : 'Konuları göster'}
              </span>
            </button>
            {openKey === '12' && (
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[color:var(--km-muted)]">
                {grade12.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            )}
          </Card>
        </FadeIn>
      </div>
    </Container>
  )
}

