import { useMemo } from 'react'

type Kind = 'line' | 'sine' | 'parabola'

function polyToPoints(points: Array<{ x: number; y: number }>) {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
}

export function MiniGraph({ kind = 'line' }: { kind?: Kind }) {
  const { viewBox, points } = useMemo(() => {
    const W = 120
    const H = 44
    const samples = 64

    const xs = Array.from({ length: samples }, (_, i) => i / (samples - 1))
    const ys = xs.map((x) => {
      if (kind === 'sine') return 0.5 + 0.32 * Math.sin(x * Math.PI * 2.2)
      if (kind === 'parabola') {
        const u = x * 2 - 1
        return 0.72 - 0.42 * (u * u)
      }
      return 0.25 + 0.6 * x
    })

    const pts = xs.map((x, i) => ({ x: x * W, y: H - ys[i]! * H }))
    return { viewBox: `0 0 ${W} ${H}`, points: pts }
  }, [kind])

  return (
    <svg viewBox={viewBox} className="h-11 w-28">
      <rect x="0" y="0" width="100%" height="100%" rx="10" fill="white" />
      <polyline
        points={polyToPoints(points)}
        fill="none"
        stroke="#09090b"
        strokeWidth="2.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

