import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { FadeIn } from '../components/motion/FadeIn'
import { Card } from '../components/ui/Card'
import { LgsGeometryLab } from '../components/interactive/LgsGeometryLab'

const grade5 = [
  'Temel geometrik kavramlar ve çizimler',
  'Nokta, doğru parçası, açılar',
  'Çember, çap, yarıçap ve daire',
  'Doğruya dikme çizme, çokgenler',
  'Doğal sayılar ve işlemler',
  'Uzunluk ölçme, çevre, dikdörtgen',
  'Kesirler',
  'Veri toplama ve değerlendirme',
  'Eşitliğin korunumu, parantezli işlemler, işlem önceliği',
  'Örüntüler ve algoritma',
  'Veriden olasılığa',
] as const

const grade6 = [
  'Sayılar ve nicelikler (1)',
  'Sayılar ve nicelikler (2)',
  'İşlemlerle cebirsel düşünme ve değişimler',
  'Geometrik şekiller',
  'Geometrik nicelikler',
  'İstatistiksel araştırma süreci',
] as const

const grade7 = [
  'Tam sayılarla işlemler ve kuvvetler',
  'Rasyonel sayılar ve işlemler',
  'Cebirsel ifadeler ve denklemler',
  'Oran, orantı ve yüzdeler',
  'Geometri: doğrular, çokgenler, çember ve daire',
  'Veri analizi ve geometrik cisimler',
] as const

const grade8 = [
  'Çarpanlar, katlar, EBOB-EKOK',
  'Üslü ifadeler ve işlemler',
  'Kareköklü ifadeler ve işlemler',
  'Veri analizi',
  'Basit olayların olma olasılığı',
  'Cebirsel ifadeler, özdeşlikler, çarpanlara ayırma',
  'Doğrusal denklemler, eğim, eşitsizlikler',
  'Üçgenler, eşlik ve benzerlik, Pisagor',
  'Dönüşüm geometrisi, geometrik cisimler',
] as const

export function LgsPage() {
  const [openKey, setOpenKey] = useState<'5' | '6' | '7' | '8' | null>(null)
  const toggle = (key: '5' | '6' | '7' | '8') => setOpenKey((prev) => (prev === key ? null : key))

  return (
    <Container>
      <FadeIn className="py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-4xl">
          LGS
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--km-muted)]">
          5, 6, 7 ve 8. sınıf matematik konularını LGS odaklı, sistemli bir şekilde işleriz.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 gap-6 pb-16 lg:grid-cols-2">
        <FadeIn>
          <Card className="p-5">
            <button
              type="button"
              onClick={() => toggle('5')}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <p className="text-base font-semibold text-[color:var(--km-fg)]">5. Sınıf Konuları</p>
              <span className="text-sm text-[color:var(--km-muted)]">
                {openKey === '5' ? 'Kapat' : 'Konuları göster'}
              </span>
            </button>
            {openKey === '5' ? (
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[color:var(--km-muted)]">
                {grade5.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        </FadeIn>
        <FadeIn delay={0.03}>
          <Card className="p-5">
            <button
              type="button"
              onClick={() => toggle('6')}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <p className="text-base font-semibold text-[color:var(--km-fg)]">6. Sınıf Konuları</p>
              <span className="text-sm text-[color:var(--km-muted)]">
                {openKey === '6' ? 'Kapat' : 'Konuları göster'}
              </span>
            </button>
            {openKey === '6' ? (
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[color:var(--km-muted)]">
                {grade6.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        </FadeIn>
        <FadeIn delay={0.06}>
          <Card className="p-5">
            <button
              type="button"
              onClick={() => toggle('7')}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <p className="text-base font-semibold text-[color:var(--km-fg)]">7. Sınıf Konuları</p>
              <span className="text-sm text-[color:var(--km-muted)]">
                {openKey === '7' ? 'Kapat' : 'Konuları göster'}
              </span>
            </button>
            {openKey === '7' ? (
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[color:var(--km-muted)]">
                {grade7.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        </FadeIn>
        <FadeIn delay={0.09}>
          <Card className="p-5">
            <button
              type="button"
              onClick={() => toggle('8')}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <p className="text-base font-semibold text-[color:var(--km-fg)]">8. Sınıf Konuları</p>
              <span className="text-sm text-[color:var(--km-muted)]">
                {openKey === '8' ? 'Kapat' : 'Konuları göster'}
              </span>
            </button>
            {openKey === '8' ? (
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[color:var(--km-muted)]">
                {grade8.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        </FadeIn>
      </div>
      <FadeIn>
        <LgsGeometryLab />
      </FadeIn>
    </Container>
  )
}

