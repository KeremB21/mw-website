import { useMemo, useState } from 'react'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

type FormState = {
  name: string
  email: string
  message: string
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })

  const mailto = useMemo(() => {
    const subject = encodeURIComponent('Özel matematik dersi talebi')
    const body = encodeURIComponent(
      `Ad Soyad: ${form.name}\nE-posta: ${form.email}\n\n${form.message}`.trim(),
    )
    return `mailto:kerem@example.com?subject=${subject}&body=${body}`
  }, [form])

  return (
    <section
      id="contact"
      className="border-t border-[color:var(--km-ring)] bg-[color:var(--km-surface)] py-16 backdrop-blur sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="İletişim"
          title="Dersini birlikte planlayalım"
          description="Mesaj bırakabilir veya direkt iletişime geçebilirsin. Genelde aynı gün dönüş yaparım."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <p className="text-sm font-semibold text-[color:var(--km-fg)]">Hızlı iletişim</p>
            <div className="mt-4 space-y-3 text-sm text-[color:var(--km-muted)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-[color:var(--km-surface)] px-3 py-1 ring-1 ring-[color:var(--km-ring)]">
                  E-posta
                </span>
                <a
                  className="font-medium text-[color:var(--km-fg)] underline underline-offset-4"
                  href="mailto:kerem@example.com"
                >
                  kerem@example.com
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-[color:var(--km-surface)] px-3 py-1 ring-1 ring-[color:var(--km-ring)]">
                  WhatsApp
                </span>
                <a
                  className="font-medium text-[color:var(--km-fg)] underline underline-offset-4"
                  href="https://wa.me/905000000000"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp’tan yaz
                </a>
              </div>
              <p className="pt-2 text-xs text-[color:var(--km-muted)]">
                E-posta ve WhatsApp numarasını kendi bilgilerinle değiştir.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold text-[color:var(--km-fg)]">Mesaj formu</p>
            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                window.location.href = mailto
              }}
            >
              <div>
                <label className="text-sm font-medium text-[color:var(--km-fg)]">Ad Soyad</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="mt-2 w-full rounded-xl bg-[color:var(--km-surface)] px-3 py-2 text-sm text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] outline-none transition focus:ring-2 focus:ring-[color:var(--km-fg)]"
                  placeholder="Adınız soyadınız"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--km-fg)]">E-posta</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="mt-2 w-full rounded-xl bg-[color:var(--km-surface)] px-3 py-2 text-sm text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] outline-none transition focus:ring-2 focus:ring-[color:var(--km-fg)]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--km-fg)]">Mesaj</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="mt-2 w-full resize-none rounded-xl bg-[color:var(--km-surface)] px-3 py-2 text-sm text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] outline-none transition focus:ring-2 focus:ring-[color:var(--km-fg)]"
                  placeholder="Sınıf seviyeni, çalışmak istediğin konuları ve hedefini yaz."
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" className="w-full sm:w-auto">
                  Gönder
                </Button>
                <p className="text-xs text-[color:var(--km-muted)]">
                  E-posta uygulaman açılır (sunucu gerekmez).
                </p>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  )
}

