import { useMemo, useState } from 'react'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeIn } from '../motion/FadeIn'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function polyToPoints(points: Array<{ x: number; y: number }>) {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
}

export function InteractiveMathSection() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)

  const { viewBox, points } = useMemo(() => {
    const W = 520
    const H = 280
    const xMin = -10
    const xMax = 10
    const samples = 240

    const xs = Array.from({ length: samples }, (_, i) => {
      const t = i / (samples - 1)
      return xMin + t * (xMax - xMin)
    })

    const ys = xs.map((x) => a * x * x + b * x + c)
    const yAbsMax = clamp(Math.max(...ys.map((y) => Math.abs(y))), 5, 80)
    const yMin = -yAbsMax
    const yMax = yAbsMax

    const mapX = (x: number) => ((x - xMin) / (xMax - xMin)) * W
    const mapY = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H

    const pts = xs.map((x, i) => ({ x: mapX(x), y: mapY(ys[i]!) }))
    return { viewBox: `0 0 ${W} ${H}`, points: pts }
  }, [a, b, c])

  const axis = useMemo(() => {
    const W = 520
    const H = 280
    return {
      x0: 0,
      x1: W,
      y0: H / 2,
      y1: H / 2,
      vx: W / 2,
      vy0: 0,
      vy1: H,
    }
  }, [])

  return (
    <section id="interactive" className="py-16 sm:py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Etkileşimli"
            title="Fonksiyonları görselle keşfet"
            description="Katsayıları değiştir, grafiğin nasıl dönüştüğünü gör—derslerde sezgiyi böyle kuruyoruz."
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FadeIn>
            <Card className="p-6 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">Parabol</p>
              <p className="text-xs text-zinc-600">y = ax² + bx + c</p>
            </div>

            <div className="mt-5 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
              <svg
                role="img"
                aria-label="Function graph"
                viewBox={viewBox}
                className="h-auto w-full"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <line
                  x1={axis.x0}
                  y1={axis.y0}
                  x2={axis.x1}
                  y2={axis.y1}
                  stroke="#e4e4e7"
                  strokeWidth="2"
                />
                <line
                  x1={axis.vx}
                  y1={axis.vy0}
                  x2={axis.vx}
                  y2={axis.vy1}
                  stroke="#e4e4e7"
                  strokeWidth="2"
                />
                <polyline
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  points={polyToPoints(points)}
                />
              </svg>
            </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.06}>
            <Card className="p-6 transition hover:-translate-y-1">
            <p className="text-sm font-semibold text-zinc-900">Kontroller</p>
            <p className="mt-2 text-sm text-zinc-600">
              a artarsa parabol daralır; b grafiği sağa/sola kaydırır; c ise yukarı/aşağı taşır.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-zinc-900">a</label>
                  <span className="text-xs text-zinc-600">{a.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={-2}
                  max={2}
                  step={0.05}
                  value={a}
                  onChange={(e) => setA(Number(e.target.value))}
                  className="mt-2 w-full accent-zinc-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-zinc-900">b</label>
                  <span className="text-xs text-zinc-600">{b.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={-6}
                  max={6}
                  step={0.1}
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="mt-2 w-full accent-zinc-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-zinc-900">c</label>
                  <span className="text-xs text-zinc-600">{c.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={-20}
                  max={20}
                  step={0.25}
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  className="mt-2 w-full accent-zinc-900"
                />
              </div>
            </div>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

