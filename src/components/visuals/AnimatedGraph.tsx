import { useEffect, useMemo, useState } from 'react'

type Pt = { x: number; y: number }

function polyToPoints(points: Pt[]) {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function AnimatedGraph({
  className = '',
  mode = 'sine',
}: {
  className?: string
  mode?: 'sine' | 'parabola'
}) {
  const [t, setT] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const dt = (now - start) / 1000
      setT(dt)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const { viewBox, points, axis } = useMemo(() => {
    const W = 560
    const H = 320
    const xMin = -10
    const xMax = 10
    const samples = 260

    const xs = Array.from({ length: samples }, (_, i) => {
      const u = i / (samples - 1)
      return xMin + u * (xMax - xMin)
    })

    const a = 0.9 + 0.35 * Math.sin(t * 0.8)
    const b = 0.6 * Math.cos(t * 0.6)
    const c = 1.4 * Math.sin(t * 0.4)

    const ys = xs.map((x) => {
      if (mode === 'parabola') return a * (x * x) / 10 + b * x + c
      return 4.2 * Math.sin(x * (0.75 + 0.15 * Math.sin(t * 0.35)) + t * 1.3)
    })

    const yAbsMax = clamp(Math.max(...ys.map((y) => Math.abs(y))), 6, 30)
    const yMin = -yAbsMax
    const yMax = yAbsMax

    const mapX = (x: number) => ((x - xMin) / (xMax - xMin)) * W
    const mapY = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H

    const pts = xs.map((x, i) => ({ x: mapX(x), y: mapY(ys[i]!) }))

    return {
      viewBox: `0 0 ${W} ${H}`,
      points: pts,
      axis: {
        x0: 0,
        x1: W,
        y: H / 2,
        x: W / 2,
        y0: 0,
        y1: H,
      },
    }
  }, [t, mode])

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white via-white to-transparent" />

      <svg
        viewBox={viewBox}
        className="relative block h-auto w-full"
        role="img"
        aria-label="Animated function graph"
      >
        <defs>
          <linearGradient id="kmStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#09090b" stopOpacity="0.95" />
            <stop offset="1" stopColor="#09090b" stopOpacity="0.55" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.18 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line
          x1={axis.x0}
          y1={axis.y}
          x2={axis.x1}
          y2={axis.y}
          stroke="#e4e4e7"
          strokeWidth="2"
        />
        <line
          x1={axis.x}
          y1={axis.y0}
          x2={axis.x}
          y2={axis.y1}
          stroke="#e4e4e7"
          strokeWidth="2"
        />

        <polyline
          points={polyToPoints(points)}
          fill="none"
          stroke="url(#kmStroke)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />
      </svg>

      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-zinc-700 ring-1 ring-zinc-200 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
        Canlı grafik
      </div>
    </div>
  )
}

