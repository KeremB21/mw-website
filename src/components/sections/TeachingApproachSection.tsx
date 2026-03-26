import { FadeIn } from '../motion/FadeIn'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const PILLARS = [
  {
    title: 'Kavramı anlama',
    desc: 'Ezber yerine sezgi kurarız; formüller “neden”iyle anlam kazanır.',
  },
  {
    title: 'Adım adım çözüm',
    desc: 'Her soru için uygulanabilir, güvenilir bir çözüm şablonu oluştururuz.',
  },
  {
    title: 'Sağlam temel',
    desc: 'Eksikleri erken kapatır, konular arasında bağlantı kurarız.',
  },
]

export function TeachingApproachSection() {
  return (
    <section id="approach" className="py-16 sm:py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Yaklaşımım"
            title="Önce derin anlama, sonra hız"
            description="Kafa karışıklığını güvene çeviren modern ve sınav-akıllı bir yöntem."
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PILLARS.map((p, idx) => (
            <FadeIn key={p.title} delay={0.05 * idx}>
              <Card className="group p-6 transition hover:-translate-y-1 hover:bg-[color:var(--km-surface-strong)]">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-[color:var(--km-fg)]">{p.title}</p>
                  <div className="grid h-9 w-9 place-items-center rounded-2xl bg-[color:var(--km-surface-strong)] text-xs font-semibold text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)]">
                    {idx + 1}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-[color:var(--km-muted)]">{p.desc}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

