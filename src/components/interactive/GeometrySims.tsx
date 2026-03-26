import { useMemo, useRef, useState } from 'react'

type Pt = { x: number; y: number }

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n))
}

function len(a: Pt, b: Pt) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.hypot(dx, dy)
}


function fmt(n: number, digits = 1) {
  return Number.isFinite(n) ? n.toFixed(digits) : '0.0'
}

function svgPointFromEvent(e: React.PointerEvent<SVGElement>, svg: SVGSVGElement) {
  const r = svg.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width) * 400
  const y = ((e.clientY - r.top) / r.height) * 240
  return { x: clamp(x, 0, 400), y: clamp(y, 0, 240) }
}

function useDragPoint(initial: Pt, constrain?: (p: Pt) => Pt) {
  const [p, setP] = useState<Pt>(initial)
  const dragging = useRef<number | null>(null)
  const apply = (next: Pt) => (constrain ? constrain(next) : next)
  return {
    p,
    setP,
    onPointerDown: (e: React.PointerEvent, svg: SVGSVGElement) => {
      dragging.current = e.pointerId
      ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
      setP(apply(svgPointFromEvent(e as unknown as React.PointerEvent<SVGElement>, svg)))
    },
    onPointerMove: (e: React.PointerEvent, svg: SVGSVGElement) => {
      if (dragging.current !== e.pointerId) return
      setP(apply(svgPointFromEvent(e as unknown as React.PointerEvent<SVGElement>, svg)))
    },
    onPointerUp: (e: React.PointerEvent) => {
      if (dragging.current !== e.pointerId) return
      dragging.current = null
    },
  }
}

function Handle({
  p,
  label,
  color = '#111827',
}: {
  p: Pt
  label?: string
  color?: string
}) {
  return (
    <g>
      {/* glow */}
      <circle cx={p.x} cy={p.y} r={14} fill={color} opacity={0.10} />
      <circle cx={p.x} cy={p.y} r={10} fill={color} opacity={0.18} />
      <circle cx={p.x} cy={p.y} r={7} fill={color} />
      <circle cx={p.x - 2} cy={p.y - 2} r={2} fill="#ffffff" opacity={0.8} />
      {label ? (
        <text x={p.x + 12} y={p.y - 12} fontSize="12" fill={color} opacity={0.9}>
          {label}
        </text>
      ) : null}
    </g>
  )
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="km-fun-lab overflow-hidden rounded-3xl bg-white/85 ring-1 ring-white/60 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      <div className="relative border-b border-slate-900/10 px-4 py-3">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-200/40 via-amber-200/35 to-lime-200/35" />
        <p className="km-fun-title relative text-base font-semibold text-slate-900">{title}</p>
        {subtitle ? (
          <p className="relative mt-1 text-xs text-slate-700">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export function LineSegmentRaySim() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const a = useDragPoint({ x: 120, y: 140 })
  const b = useDragPoint({ x: 280, y: 100 })
  const ink = '#111827'

  const { line1, line2, ray2 } = useMemo(() => {
    const dx = b.p.x - a.p.x
    const dy = b.p.y - a.p.y
    const mag = Math.hypot(dx, dy) || 1
    const ux = dx / mag
    const uy = dy / mag
    const extend = 999
    return {
      line1: { x: a.p.x - ux * extend, y: a.p.y - uy * extend },
      line2: { x: a.p.x + ux * extend, y: a.p.y + uy * extend },
      ray2: { x: a.p.x + ux * extend, y: a.p.y + uy * extend },
    }
  }, [a.p.x, a.p.y, b.p.x, b.p.y])

  return (
    <Panel
      title="Doğru, Doğru Parçası ve Işın"
      subtitle="Noktaları sürükle. Şekiller anlık güncellenir."
    >
      <svg
        ref={svgRef}
        viewBox="0 0 400 240"
        className="h-56 w-full touch-none select-none rounded-xl bg-white"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={ink} />
          </marker>
        </defs>

        {/* Infinite line */}
        <line
          x1={line1.x}
          y1={line1.y}
          x2={line2.x}
          y2={line2.y}
          stroke={ink}
          strokeWidth={2}
          opacity={0.25}
        />

        {/* Segment */}
        <line
          x1={a.p.x}
          y1={a.p.y}
          x2={b.p.x}
          y2={b.p.y}
          stroke={ink}
          strokeWidth={3}
        />

        {/* Ray from A towards B */}
        <line
          x1={a.p.x}
          y1={a.p.y}
          x2={ray2.x}
          y2={ray2.y}
          stroke={ink}
          strokeWidth={2}
          markerEnd="url(#arrow)"
          opacity={0.6}
        />

        <text x="14" y="24" fontSize="12" fill={ink} opacity={0.8}>
          Doğru (ince)
        </text>
        <text x="14" y="44" fontSize="12" fill={ink} opacity={0.9}>
          Doğru parçası: [AB] (kalın)
        </text>
        <text x="14" y="64" fontSize="12" fill={ink} opacity={0.85}>
          Işın (oklu)
        </text>

        {/* Drag handles */}
        <g
          onPointerDown={(e) => svgRef.current && a.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && a.onPointerMove(e, svgRef.current)}
          onPointerUp={a.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={a.p} label="A" color={ink} />
        </g>
        <g
          onPointerDown={(e) => svgRef.current && b.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && b.onPointerMove(e, svgRef.current)}
          onPointerUp={b.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={b.p} label="B" color={ink} />
        </g>
      </svg>
    </Panel>
  )
}

export function AngleProtractorSim() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const origin: Pt = { x: 160, y: 150 }
  // Protractor arc in this sim uses radius=100 centered at origin (see path below).
  const fixed: Pt = { x: 260, y: 150 }
  const radius = len(origin, fixed) // = 100
  const moving = useDragPoint({ x: 260, y: 70 }, (c) => {
    const dx = c.x - origin.x
    const dy = c.y - origin.y
    let vx = dx
    let vy = dy
    // keep on upper arc (protractor)
    if (vy > 0) vy = -vy
    const m = Math.hypot(vx, vy) || 1
    const ux = vx / m
    const uy = vy / m
    const p = { x: origin.x + ux * radius, y: origin.y + uy * radius }
    return { x: clamp(p.x, 0, 400), y: clamp(p.y, 0, 240) }
  })
  const ink = '#111827'

  const angleDeg = useMemo(() => {
    const ax = fixed.x - origin.x
    const ay = fixed.y - origin.y
    const bx = moving.p.x - origin.x
    const by = moving.p.y - origin.y
    const dot = ax * bx + ay * by
    const mag = Math.hypot(ax, ay) * Math.hypot(bx, by) || 1
    const cos = clamp(dot / mag, -1, 1)
    return (Math.acos(cos) * 180) / Math.PI
  }, [moving.p.x, moving.p.y])

  const type = useMemo(() => {
    const a = Math.round(angleDeg)
    if (a === 180) return 'Doğru Açı'
    if (a === 90) return 'Dik Açı'
    if (a < 90) return 'Dar Açı'
    if (a < 180) return 'Geniş Açı'
    return 'Refleks'
  }, [angleDeg])

  return (
    <Panel
      title="Açılar ve Açı Çeşitleri"
      subtitle="Işını sürükle. Derece ve açı türü değişsin."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">
            {Math.round(angleDeg)}°
          </span>{' '}
          · {type}
        </div>
        <div className="text-xs text-slate-600">İpucu: Noktayı parmağınla sürükleyebilirsin.</div>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 400 240"
        className="mt-3 h-56 w-full touch-none select-none rounded-xl bg-white"
      >
        {/* simple protractor arc */}
        <path
          d="M 60 150 A 100 100 0 0 1 260 150"
          fill="none"
          stroke={ink}
          strokeWidth={2}
          opacity={0.15}
        />
        {Array.from({ length: 7 }).map((_, i) => {
          const deg = i * 30
          const rad = (deg * Math.PI) / 180
          const r1 = 100
          const r2 = i % 2 === 0 ? 86 : 92
          const x1 = origin.x + Math.cos(Math.PI - rad) * r1
          const y1 = origin.y - Math.sin(Math.PI - rad) * r1
          const x2 = origin.x + Math.cos(Math.PI - rad) * r2
          const y2 = origin.y - Math.sin(Math.PI - rad) * r2
          return (
            <g key={deg}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth={2} opacity={0.18} />
              <text
                x={origin.x + Math.cos(Math.PI - rad) * 74}
                y={origin.y - Math.sin(Math.PI - rad) * 74}
                fontSize="10"
                fill={ink}
                opacity={0.5}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {deg}
              </text>
            </g>
          )
        })}

        <line x1={origin.x} y1={origin.y} x2={fixed.x} y2={fixed.y} stroke={ink} strokeWidth={3} />
        <line x1={origin.x} y1={origin.y} x2={moving.p.x} y2={moving.p.y} stroke={ink} strokeWidth={3} />

        <circle cx={origin.x} cy={origin.y} r={5} fill={ink} opacity={0.6} />

        <g
          onPointerDown={(e) => svgRef.current && moving.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && moving.onPointerMove(e, svgRef.current)}
          onPointerUp={moving.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={moving.p} label="Sürükle" color={ink} />
        </g>
      </svg>
    </Panel>
  )
}

export function PolygonSim() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [mode, setMode] = useState<'triangle' | 'quad'>('triangle')
  const ink = '#111827'

  const minEdge = 44

  const keepAway = (candidate: Pt, neighbors: Pt[]) => {
    let out = { ...candidate }
    for (const n of neighbors) {
      const dx = out.x - n.x
      const dy = out.y - n.y
      const d = Math.hypot(dx, dy) || 0.0001
      if (d < minEdge) {
        const ux = dx / d
        const uy = dy / d
        out = { x: n.x + ux * minEdge, y: n.y + uy * minEdge }
      }
    }
    return { x: clamp(out.x, 0, 400), y: clamp(out.y, 0, 240) }
  }

  const p1 = useDragPoint({ x: 110, y: 70 }, (c) =>
    keepAway(c, mode === 'triangle' ? [p2.p, p3.p] : [p2.p, p4.p]),
  )
  const p2 = useDragPoint({ x: 290, y: 70 }, (c) =>
    keepAway(c, mode === 'triangle' ? [p1.p, p3.p] : [p1.p, p3.p]),
  )
  const p3 = useDragPoint({ x: 230, y: 190 }, (c) =>
    keepAway(c, mode === 'triangle' ? [p1.p, p2.p] : [p2.p, p4.p]),
  )
  const p4 = useDragPoint({ x: 140, y: 190 }, (c) => keepAway(c, [p1.p, p3.p]))

  const pts = mode === 'triangle' ? [p1.p, p2.p, p3.p] : [p1.p, p2.p, p3.p, p4.p]
  const poly = pts.map((p) => `${p.x},${p.y}`).join(' ')

  const angles = useMemo(() => {
    const out: { pos: Pt; deg: number }[] = []
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[(i - 1 + pts.length) % pts.length]
      const cur = pts[i]
      const next = pts[(i + 1) % pts.length]

      const v1 = { x: prev.x - cur.x, y: prev.y - cur.y }
      const v2 = { x: next.x - cur.x, y: next.y - cur.y }
      const m1 = Math.hypot(v1.x, v1.y) || 1
      const m2 = Math.hypot(v2.x, v2.y) || 1
      const dot = v1.x * v2.x + v1.y * v2.y
      const cos = clamp(dot / (m1 * m2), -1, 1)
      const deg = (Math.acos(cos) * 180) / Math.PI

      // place label roughly along angle bisector, outward from vertex
      const u1 = { x: v1.x / m1, y: v1.y / m1 }
      const u2 = { x: v2.x / m2, y: v2.y / m2 }
      const bis = { x: u1.x + u2.x, y: u1.y + u2.y }
      const bm = Math.hypot(bis.x, bis.y) || 1
      const bx = bis.x / bm
      const by = bis.y / bm
      const pos = { x: cur.x + bx * 22, y: cur.y + by * 22 }

      out.push({ pos, deg })
    }
    return out
  }, [poly])

  // angle sum: (n-2)*180
  const angleSum = (pts.length - 2) * 180

  return (
    <Panel
      title="Çokgenler (Üçgen / Dörtgen)"
      subtitle="Noktaları sürükle. Kenar uzunlukları ve iç açı toplamı güncellenir."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-700">
          İç açılar toplamı:{' '}
          <span className="font-semibold text-slate-900">{angleSum}°</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('triangle')}
            className={[
              'rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition',
              mode === 'triangle'
                ? 'bg-[color:var(--km-surface-strong)] text-[color:var(--km-fg)] ring-[color:var(--km-ring)]'
                : 'bg-[color:var(--km-surface)] text-[color:var(--km-muted)] ring-[color:var(--km-ring)] hover:bg-[color:var(--km-surface-strong)] hover:text-[color:var(--km-fg)]',
            ].join(' ')}
          >
            Üçgen
          </button>
          <button
            type="button"
            onClick={() => setMode('quad')}
            className={[
              'rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition',
              mode === 'quad'
                ? 'bg-[color:var(--km-surface-strong)] text-[color:var(--km-fg)] ring-[color:var(--km-ring)]'
                : 'bg-[color:var(--km-surface)] text-[color:var(--km-muted)] ring-[color:var(--km-ring)] hover:bg-[color:var(--km-surface-strong)] hover:text-[color:var(--km-fg)]',
            ].join(' ')}
          >
            Dörtgen
          </button>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 400 240"
        className="mt-3 h-56 w-full touch-none select-none rounded-xl bg-white"
      >
        <polygon points={poly} fill={ink} opacity={0.08} stroke={ink} strokeWidth={3} />

        {angles.map((a, idx) => (
          <text
            key={idx}
            x={a.pos.x}
            y={a.pos.y}
            fontSize="11"
            fill={ink}
            opacity={0.9}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {Math.round(a.deg)}°
          </text>
        ))}

        <g
          onPointerDown={(e) => svgRef.current && p1.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && p1.onPointerMove(e, svgRef.current)}
          onPointerUp={p1.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={p1.p} label="1" color={ink} />
        </g>
        <g
          onPointerDown={(e) => svgRef.current && p2.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && p2.onPointerMove(e, svgRef.current)}
          onPointerUp={p2.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={p2.p} label="2" color={ink} />
        </g>
        <g
          onPointerDown={(e) => svgRef.current && p3.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && p3.onPointerMove(e, svgRef.current)}
          onPointerUp={p3.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={p3.p} label="3" color={ink} />
        </g>
        {mode === 'quad' ? (
          <g
            onPointerDown={(e) => svgRef.current && p4.onPointerDown(e, svgRef.current)}
            onPointerMove={(e) => svgRef.current && p4.onPointerMove(e, svgRef.current)}
            onPointerUp={p4.onPointerUp}
            className="cursor-grab active:cursor-grabbing"
          >
            <Handle p={p4.p} label="4" color={ink} />
          </g>
        ) : null}
      </svg>
    </Panel>
  )
}

export function CircleRadiusSim() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const center: Pt = { x: 200, y: 120 }
  const rPt = useDragPoint({ x: 300, y: 120 })
  const ink = '#111827'

  const r = useMemo(() => len(center, rPt.p), [rPt.p.x, rPt.p.y])
  const diameter = r * 2
  const circumference = 2 * Math.PI * r
  const opposite = useMemo(() => {
    const dx = rPt.p.x - center.x
    const dy = rPt.p.y - center.y
    const m = Math.hypot(dx, dy) || 1
    const ux = dx / m
    const uy = dy / m
    return { x: center.x - ux * r, y: center.y - uy * r }
  }, [rPt.p.x, rPt.p.y, r])

  return (
    <Panel
      title="Çember ve Daire (Yarıçap / Çap / Çevre)"
      subtitle="R noktasını sürükle. Ölçüler anlık güncellensin."
    >
      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div className="rounded-xl bg-slate-900/5 p-3 ring-1 ring-slate-900/10">
          <p className="text-xs text-slate-600">Yarıçap (r)</p>
          <p className="mt-1 font-semibold text-slate-900">{Math.round(r)}</p>
        </div>
        <div className="rounded-xl bg-slate-900/5 p-3 ring-1 ring-slate-900/10">
          <p className="text-xs text-slate-600">Çap (2r)</p>
          <p className="mt-1 font-semibold text-slate-900">{Math.round(diameter)}</p>
        </div>
        <div className="rounded-xl bg-slate-900/5 p-3 ring-1 ring-slate-900/10 sm:col-span-2">
          <p className="text-xs text-slate-600">Çevre (2πr)</p>
          <p className="mt-1 font-semibold text-slate-900">
            {circumference.toFixed(1)}
          </p>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 400 240"
        className="mt-3 h-56 w-full touch-none select-none rounded-xl bg-white"
      >
        <circle cx={center.x} cy={center.y} r={r} fill="none" stroke={ink} strokeWidth={3} opacity={0.55} />
        <circle cx={center.x} cy={center.y} r={4} fill={ink} opacity={0.6} />
        {/* diameter */}
        <line x1={opposite.x} y1={opposite.y} x2={rPt.p.x} y2={rPt.p.y} stroke={ink} strokeWidth={2} opacity={0.35} />
        {/* radius */}
        <line x1={center.x} y1={center.y} x2={rPt.p.x} y2={rPt.p.y} stroke={ink} strokeWidth={3} />
        <text x={(center.x + rPt.p.x) / 2} y={(center.y + rPt.p.y) / 2 - 8} fontSize="12" fill={ink} opacity={0.75} textAnchor="middle">
          r
        </text>
        <text x={(opposite.x + rPt.p.x) / 2} y={(opposite.y + rPt.p.y) / 2 + 14} fontSize="12" fill={ink} opacity={0.6} textAnchor="middle">
          2r
        </text>
        <text x={center.x + 8} y={center.y - 8} fontSize="12" fill={ink} opacity={0.9}>
          Merkez
        </text>

        <g
          onPointerDown={(e) => svgRef.current && rPt.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && rPt.onPointerMove(e, svgRef.current)}
          onPointerUp={rPt.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={rPt.p} label="R" color={ink} />
        </g>
      </svg>
    </Panel>
  )
}

export function ParallelogramTriangleAreaSim() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const ink = '#111827'
  const origin: Pt = { x: 120, y: 170 }

  // base endpoint (controls base length & direction)
  const basePt = useDragPoint(
    { x: 300, y: 170 },
    (c) => ({ x: clamp(c.x, 80, 360), y: clamp(c.y, 120, 210) }),
  )
  // height control point (we project to perpendicular height)
  const heightPt = useDragPoint(
    { x: 160, y: 90 },
    (c) => ({ x: clamp(c.x, 60, 360), y: clamp(c.y, 30, 220) }),
  )

  const [view, setView] = useState<'parallelogram' | 'triangle'>('parallelogram')

  const geom = useMemo(() => {
    const u = { x: basePt.p.x - origin.x, y: basePt.p.y - origin.y }
    const uLen = Math.hypot(u.x, u.y) || 1
    const uHat = { x: u.x / uLen, y: u.y / uLen }
    const nHat = { x: -uHat.y, y: uHat.x }

    const w = { x: heightPt.p.x - origin.x, y: heightPt.p.y - origin.y }
    const hSigned = w.x * nHat.x + w.y * nHat.y
    const h = Math.max(18, Math.abs(hSigned))

    const v = { x: nHat.x * h, y: nHat.y * h }

    const p0 = origin
    const p1 = basePt.p
    const p2 = { x: p1.x + v.x, y: p1.y + v.y }
    const p3 = { x: p0.x + v.x, y: p0.y + v.y }

    const base = uLen
    const areaPar = base * h
    const areaTri = (base * h) / 2

    // foot of perpendicular for height visualization
    const foot = {
      x: origin.x + uHat.x * (w.x * uHat.x + w.y * uHat.y),
      y: origin.y + uHat.y * (w.x * uHat.x + w.y * uHat.y),
    }
    const top = { x: foot.x + nHat.x * (hSigned >= 0 ? h : -h), y: foot.y + nHat.y * (hSigned >= 0 ? h : -h) }

    return { p0, p1, p2, p3, base, h, areaPar, areaTri, foot, top }
  }, [basePt.p, heightPt.p])

  const pointsPar = `${geom.p0.x},${geom.p0.y} ${geom.p1.x},${geom.p1.y} ${geom.p2.x},${geom.p2.y} ${geom.p3.x},${geom.p3.y}`
  const pointsTri = `${geom.p0.x},${geom.p0.y} ${geom.p1.x},${geom.p1.y} ${geom.p3.x},${geom.p3.y}`

  return (
    <Panel
      title="Alan Ölçme (Paralelkenar ve Üçgen)"
      subtitle="Taban ve yüksekliği sürükle. Paralelkenar/üçgen alanını karşılaştır."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-700">
          a = <span className="font-semibold text-slate-900">{fmt(geom.base, 0)}</span> · h ={' '}
          <span className="font-semibold text-slate-900">{fmt(geom.h, 0)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView('parallelogram')}
            className={[
              'rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition',
              view === 'parallelogram'
                ? 'bg-[color:var(--km-surface-strong)] text-[color:var(--km-fg)] ring-[color:var(--km-ring)]'
                : 'bg-[color:var(--km-surface)] text-[color:var(--km-muted)] ring-[color:var(--km-ring)] hover:bg-[color:var(--km-surface-strong)] hover:text-[color:var(--km-fg)]',
            ].join(' ')}
          >
            Paralelkenar
          </button>
          <button
            type="button"
            onClick={() => setView('triangle')}
            className={[
              'rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition',
              view === 'triangle'
                ? 'bg-[color:var(--km-surface-strong)] text-[color:var(--km-fg)] ring-[color:var(--km-ring)]'
                : 'bg-[color:var(--km-surface)] text-[color:var(--km-muted)] ring-[color:var(--km-ring)] hover:bg-[color:var(--km-surface-strong)] hover:text-[color:var(--km-fg)]',
            ].join(' ')}
          >
            Üçgen (½)
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs text-slate-600">
        {view === 'parallelogram' ? (
          <span>
            Alan: <span className="font-semibold text-slate-900">A = a × h</span> = {fmt(geom.areaPar, 0)}
          </span>
        ) : (
          <span>
            Alan: <span className="font-semibold text-slate-900">A = (a × h) / 2</span> = {fmt(geom.areaTri, 0)}
          </span>
        )}
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 400 240"
        className="mt-3 h-56 w-full touch-none select-none rounded-xl bg-white"
      >
        <defs>
          <marker id="arrowSmall" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={ink} opacity={0.9} />
          </marker>
        </defs>

        {/* height indicator */}
        <line x1={geom.foot.x} y1={geom.foot.y} x2={geom.top.x} y2={geom.top.y} stroke={ink} strokeWidth={2} opacity={0.35} />
        <text x={geom.top.x + 6} y={geom.top.y - 6} fontSize="12" fill={ink} opacity={0.75}>
          h
        </text>

        {/* base indicator */}
        <line x1={geom.p0.x} y1={geom.p0.y} x2={geom.p1.x} y2={geom.p1.y} stroke={ink} strokeWidth={3} opacity={0.6} markerEnd="url(#arrowSmall)" />
        <text x={(geom.p0.x + geom.p1.x) / 2} y={(geom.p0.y + geom.p1.y) / 2 - 8} fontSize="12" fill={ink} opacity={0.75} textAnchor="middle">
          a
        </text>

        {view === 'parallelogram' ? (
          <polygon points={pointsPar} fill={ink} opacity={0.08} stroke={ink} strokeWidth={3} />
        ) : (
          <polygon points={pointsTri} fill={ink} opacity={0.08} stroke={ink} strokeWidth={3} />
        )}

        {/* drag handles */}
        <g
          onPointerDown={(e) => svgRef.current && basePt.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && basePt.onPointerMove(e, svgRef.current)}
          onPointerUp={basePt.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={basePt.p} label="Taban" color={ink} />
        </g>
        <g
          onPointerDown={(e) => svgRef.current && heightPt.onPointerDown(e, svgRef.current)}
          onPointerMove={(e) => svgRef.current && heightPt.onPointerMove(e, svgRef.current)}
          onPointerUp={heightPt.onPointerUp}
          className="cursor-grab active:cursor-grabbing"
        >
          <Handle p={heightPt.p} label="Yükseklik" color={ink} />
        </g>
      </svg>
    </Panel>
  )
}

export function PrismVolumeSim() {
  const [w, setW] = useState(4)
  const [d, setD] = useState(3)
  const [h, setH] = useState(3)
  const ink = '#111827'

  const volume = w * d * h

  const cubes = useMemo(() => {
    const out: { x: number; y: number }[] = []
    const size = 14
    const ox = 18
    const oy = 160
    for (let z = 0; z < h; z++) {
      for (let y = 0; y < d; y++) {
        for (let x = 0; x < w; x++) {
          // simple isometric-ish projection
          const px = ox + x * size + y * size * 0.6
          const py = oy - z * size * 0.9 - y * size * 0.35
          out.push({ x: px, y: py })
        }
      }
    }
    return out
  }, [w, d, h])

  return (
    <Panel
      title="Hacim Ölçme (Dikdörtgenler Prizması)"
      subtitle="En, boy, yükseklik sürgülerini değiştir. Birim küpler ve hacim güncellensin."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="text-sm text-slate-700">
            Hacim: <span className="font-semibold text-slate-900">V = en × boy × yükseklik</span> ={' '}
            <span className="font-semibold text-slate-900">{volume}</span>
          </div>

          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs text-slate-600">
              En: <span className="font-semibold text-slate-900">{w}</span>
            </label>
            <input type="range" min={1} max={8} value={w} onChange={(e) => setW(Number(e.target.value))} className="w-full" />
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs text-slate-600">
              Boy: <span className="font-semibold text-slate-900">{d}</span>
            </label>
            <input type="range" min={1} max={8} value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full" />
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs text-slate-600">
              Yükseklik: <span className="font-semibold text-slate-900">{h}</span>
            </label>
            <input type="range" min={1} max={6} value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        <svg viewBox="0 0 400 240" className="h-56 w-full rounded-xl bg-white">
          {cubes.map((c, idx) => (
            <rect
              key={idx}
              x={c.x}
              y={c.y}
              width={12}
              height={12}
              fill={ink}
              opacity={0.09}
              stroke={ink}
              strokeWidth={1}
            />
          ))}
          <text x="18" y="26" fontSize="12" fill={ink} opacity={0.85}>
            Birim küpler: {volume}
          </text>
        </svg>
      </div>
    </Panel>
  )
}

export function TransversalAnglesSim() {
  const ink = '#111827'
  const [theta, setTheta] = useState(35) // degrees
  const [offset, setOffset] = useState(84)

  const rad = (theta * Math.PI) / 180
  const m = Math.tan(rad)

  const y1 = 80
  const y2 = y1 + offset

  // transversal line: y = m(x-200) + 120
  const pA: Pt = { x: 40, y: m * (40 - 200) + 120 }
  const pB: Pt = { x: 360, y: m * (360 - 200) + 120 }

  const xAtY = (y: number) => {
    // y = m(x-200)+120 => x = (y-120)/m + 200
    if (Math.abs(m) < 0.05) return 200
    return (y - 120) / m + 200
  }

  const x1 = clamp(xAtY(y1), 40, 360)
  const x2 = clamp(xAtY(y2), 40, 360)

  const ang = ((Math.atan(m) * 180) / Math.PI + 180) % 180
  const acute = Math.min(ang, 180 - ang)
  const obtuse = 180 - acute

  return (
    <Panel
      title="Doğrular ve Açılar (Paralel doğruları kesen doğru)"
      subtitle="Eğimi değiştir. Yöndeş / iç ters / dış ters açıların eşitliğini gör."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="text-xs text-slate-600">
            Yöndeş (mavi), İç ters (mor), Dış ters (yeşil) açı çiftleri <span className="font-semibold text-slate-900">eşittir</span>.
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs text-slate-600">
              Keseni eğ (°): <span className="font-semibold text-slate-900">{theta}</span>
            </label>
            <input type="range" min={10} max={80} value={theta} onChange={(e) => setTheta(Number(e.target.value))} className="w-full" />
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs text-slate-600">
              Paralel aralık: <span className="font-semibold text-slate-900">{offset}</span>
            </label>
            <input type="range" min={60} max={120} value={offset} onChange={(e) => setOffset(Number(e.target.value))} className="w-full" />
          </div>

          <div className="text-xs text-slate-600">
            Küçük açı ≈ <span className="font-semibold text-slate-900">{Math.round(acute)}°</span> · Büyük açı ≈{' '}
            <span className="font-semibold text-slate-900">{Math.round(obtuse)}°</span>
          </div>
        </div>

        <svg viewBox="0 0 400 240" className="h-56 w-full rounded-xl bg-white">
          {/* parallels */}
          <line x1={40} y1={y1} x2={360} y2={y1} stroke={ink} strokeWidth={3} opacity={0.35} />
          <line x1={40} y1={y2} x2={360} y2={y2} stroke={ink} strokeWidth={3} opacity={0.35} />

          {/* transversal */}
          <line x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} stroke={ink} strokeWidth={3} opacity={0.85} />

          {/* highlight angle pairs as arcs (simple circles) */}
          {/* Corresponding (blue): upper-right at both intersections */}
          <circle cx={x1} cy={y1} r={16} fill="none" stroke="#2563eb" strokeWidth={4} opacity={0.7} />
          <circle cx={x2} cy={y2} r={16} fill="none" stroke="#2563eb" strokeWidth={4} opacity={0.7} />
          <text x={x1 + 22} y={y1 + 6} fontSize="11" fill="#2563eb" opacity={0.85}>
            yöndeş
          </text>

          {/* Alternate interior (purple): between parallels on opposite sides */}
          <circle cx={x1} cy={y1} r={10} fill="none" stroke="#7c3aed" strokeWidth={4} opacity={0.65} />
          <circle cx={x2} cy={y2} r={10} fill="none" stroke="#7c3aed" strokeWidth={4} opacity={0.65} />
          <text x={x2 + 22} y={y2 + 6} fontSize="11" fill="#7c3aed" opacity={0.85}>
            iç ters
          </text>

          {/* Alternate exterior (green): outside parallels opposite sides */}
          <circle cx={x1} cy={y1} r={6} fill="none" stroke="#16a34a" strokeWidth={4} opacity={0.6} />
          <circle cx={x2} cy={y2} r={6} fill="none" stroke="#16a34a" strokeWidth={4} opacity={0.6} />
          <text x={x1 - 12} y={y2 + 24} fontSize="11" fill="#16a34a" opacity={0.85}>
            dış ters
          </text>
        </svg>
      </div>
    </Panel>
  )
}

export function SectorArcSim() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const ink = '#111827'
  const center: Pt = { x: 200, y: 120 }
  const rPt = useDragPoint({ x: 300, y: 120 })
  const aPt = useDragPoint({ x: 280, y: 70 })

  const r = useMemo(() => clamp(len(center, rPt.p), 30, 110), [rPt.p.x, rPt.p.y])

  const alpha = useMemo(() => {
    const v = { x: aPt.p.x - center.x, y: aPt.p.y - center.y }
    let ang = (Math.atan2(-v.y, v.x) * 180) / Math.PI // 0..360, clockwise from +x
    if (ang < 0) ang += 360
    return clamp(ang, 5, 355)
  }, [aPt.p.x, aPt.p.y])

  const arcLen = (alpha / 360) * (2 * Math.PI * r)
  const sectorArea = (alpha / 360) * (Math.PI * r * r)

  const end = useMemo(() => {
    const radA = (alpha * Math.PI) / 180
    return { x: center.x + Math.cos(radA) * r, y: center.y - Math.sin(radA) * r }
  }, [alpha, r])

  const largeArc = alpha > 180 ? 1 : 0
  const d = `M ${center.x} ${center.y} L ${center.x + r} ${center.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`

  return (
    <Panel
      title="Çemberde Yay Uzunluğu & Daire Dilimi"
      subtitle="Yarıçap ve merkez açıyı sürükle. Yay uzunluğu ve dilim alanı canlı hesaplansın."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="text-sm text-slate-700">
          <div>
            α = <span className="font-semibold text-slate-900">{Math.round(alpha)}°</span> · r ={' '}
            <span className="font-semibold text-slate-900">{Math.round(r)}</span>
          </div>
          <div className="mt-2 text-xs">
            Yay: <span className="font-semibold text-slate-900">(\(α/360\)) × 2πr</span> = {fmt(arcLen, 1)}
          </div>
          <div className="mt-1 text-xs">
            Alan: <span className="font-semibold text-slate-900">(\(α/360\)) × πr²</span> = {fmt(sectorArea, 1)}
          </div>
        </div>

        <svg ref={svgRef} viewBox="0 0 400 240" className="h-56 w-full touch-none select-none rounded-xl bg-white">
          <circle cx={center.x} cy={center.y} r={r} fill="none" stroke={ink} strokeWidth={3} opacity={0.25} />
          <path d={d} fill={ink} opacity={0.08} stroke={ink} strokeWidth={3} />
          <line x1={center.x} y1={center.y} x2={center.x + r} y2={center.y} stroke={ink} strokeWidth={2} opacity={0.6} />
          <line x1={center.x} y1={center.y} x2={end.x} y2={end.y} stroke={ink} strokeWidth={2} opacity={0.6} />
          <circle cx={center.x} cy={center.y} r={4} fill={ink} opacity={0.6} />

          <g
            onPointerDown={(e) => svgRef.current && rPt.onPointerDown(e, svgRef.current)}
            onPointerMove={(e) => svgRef.current && rPt.onPointerMove(e, svgRef.current)}
            onPointerUp={rPt.onPointerUp}
            className="cursor-grab active:cursor-grabbing"
          >
            <Handle p={{ x: center.x + r, y: center.y }} label="r" color={ink} />
          </g>
          <g
            onPointerDown={(e) => svgRef.current && aPt.onPointerDown(e, svgRef.current)}
            onPointerMove={(e) => svgRef.current && aPt.onPointerMove(e, svgRef.current)}
            onPointerUp={aPt.onPointerUp}
            className="cursor-grab active:cursor-grabbing"
          >
            <Handle p={end} label="α" color={ink} />
          </g>
        </svg>
      </div>
    </Panel>
  )
}

export function PythagorasSim() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const ink = '#111827'
  const origin: Pt = { x: 110, y: 190 }

  const aPt = useDragPoint(
    { x: 250, y: 190 },
    (c) => ({ x: clamp(c.x, origin.x + 40, origin.x + 220), y: origin.y }),
  )
  const bPt = useDragPoint(
    { x: 110, y: 70 },
    (c) => ({ x: origin.x, y: clamp(c.y, origin.y - 160, origin.y - 40) }),
  )

  const a = Math.abs(aPt.p.x - origin.x)
  const b = Math.abs(origin.y - bPt.p.y)
  const c = Math.hypot(a, b)

  const tri = `${origin.x},${origin.y} ${aPt.p.x},${aPt.p.y} ${bPt.p.x},${bPt.p.y}`

  // squares on legs and hypotenuse (simple axis-aligned for legs, rotated for hypotenuse)
  const squareA = { x: origin.x, y: origin.y, w: a, h: a } // below base
  const squareB = { x: origin.x - b, y: origin.y - b, w: b, h: b } // left of height

  // rotated square for hypotenuse
  const hyp1 = aPt.p
  const hyp2 = bPt.p
  const vx = hyp2.x - hyp1.x
  const vy = hyp2.y - hyp1.y
  const vm = Math.hypot(vx, vy) || 1
  const ux = vx / vm
  const uy = vy / vm
  const px = -uy
  const py = ux
  const q1 = hyp1
  const q2 = hyp2
  const q3 = { x: hyp2.x + px * vm, y: hyp2.y + py * vm }
  const q4 = { x: hyp1.x + px * vm, y: hyp1.y + py * vm }
  const squareC = `${q1.x},${q1.y} ${q2.x},${q2.y} ${q3.x},${q3.y} ${q4.x},${q4.y}`

  return (
    <Panel
      title="Pisagor Bağıntısı (a² + b² = c²)"
      subtitle="Dik kenarları sürükle. Kare alanlarıyla ilişkiyi gör."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="text-sm text-slate-700">
          <div>
            a = <span className="font-semibold text-slate-900">{Math.round(a)}</span> · b ={' '}
            <span className="font-semibold text-slate-900">{Math.round(b)}</span> · c ≈{' '}
            <span className="font-semibold text-slate-900">{fmt(c, 1)}</span>
          </div>
          <div className="mt-2 text-xs">
            <span className="font-semibold text-slate-900">a² + b²</span> = {Math.round(a * a)} +{' '}
            {Math.round(b * b)} = {Math.round(a * a + b * b)}
          </div>
          <div className="mt-1 text-xs">
            <span className="font-semibold text-slate-900">c²</span> ≈ {Math.round(c * c)}
          </div>
        </div>

        <svg ref={svgRef} viewBox="0 0 400 240" className="h-56 w-full touch-none select-none rounded-xl bg-white">
          {/* squares */}
          <rect
            x={squareA.x}
            y={squareA.y}
            width={squareA.w}
            height={squareA.h}
            fill="#2563eb"
            opacity={0.10}
            stroke="#2563eb"
            strokeWidth={2}
          />
          <rect
            x={squareB.x}
            y={squareB.y}
            width={squareB.w}
            height={squareB.h}
            fill="#7c3aed"
            opacity={0.10}
            stroke="#7c3aed"
            strokeWidth={2}
          />
          <polygon points={squareC} fill="#16a34a" opacity={0.10} stroke="#16a34a" strokeWidth={2} />

          {/* triangle */}
          <polygon points={tri} fill={ink} opacity={0.06} stroke={ink} strokeWidth={3} />
          <line x1={origin.x} y1={origin.y} x2={aPt.p.x} y2={aPt.p.y} stroke={ink} strokeWidth={3} />
          <line x1={origin.x} y1={origin.y} x2={bPt.p.x} y2={bPt.p.y} stroke={ink} strokeWidth={3} />
          <line x1={aPt.p.x} y1={aPt.p.y} x2={bPt.p.x} y2={bPt.p.y} stroke={ink} strokeWidth={3} opacity={0.8} />

          {/* right angle mark */}
          <path
            d={`M ${origin.x} ${origin.y} L ${origin.x + 16} ${origin.y} L ${origin.x + 16} ${origin.y - 16} L ${origin.x} ${origin.y - 16}`}
            fill="none"
            stroke={ink}
            strokeWidth={2}
            opacity={0.35}
          />

          <g
            onPointerDown={(e) => svgRef.current && aPt.onPointerDown(e, svgRef.current)}
            onPointerMove={(e) => svgRef.current && aPt.onPointerMove(e, svgRef.current)}
            onPointerUp={aPt.onPointerUp}
            className="cursor-grab active:cursor-grabbing"
          >
            <Handle p={aPt.p} label="a" color={ink} />
          </g>
          <g
            onPointerDown={(e) => svgRef.current && bPt.onPointerDown(e, svgRef.current)}
            onPointerMove={(e) => svgRef.current && bPt.onPointerMove(e, svgRef.current)}
            onPointerUp={bPt.onPointerUp}
            className="cursor-grab active:cursor-grabbing"
          >
            <Handle p={bPt.p} label="b" color={ink} />
          </g>
        </svg>
      </div>
    </Panel>
  )
}

export function CylinderNetSim() {
  const ink = '#111827'
  const [open, setOpen] = useState(false)
  const [r, setR] = useState(52)
  const [h, setH] = useState(90)

  const circ = 2 * Math.PI * r

  return (
    <Panel
      title="Geometrik Cisimler (Silindir Açınımı)"
      subtitle="Butona bas. Yan yüzey → dikdörtgen, tabanlar → iki daire. 2πr vurgusu."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-700">
          r = <span className="font-semibold text-slate-900">{r}</span> · h ={' '}
          <span className="font-semibold text-slate-900">{h}</span> · 2πr ≈{' '}
          <span className="font-semibold text-slate-900">{fmt(circ, 1)}</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="rounded-xl bg-slate-900/5 px-3 py-2 text-xs font-semibold text-slate-900 ring-1 ring-slate-900/10 transition hover:bg-slate-900/10"
        >
          {open ? 'Kapat (Silindir)' : 'Açınımı göster'}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs text-slate-600">
            Yarıçap (r): <span className="font-semibold text-slate-900">{r}</span>
          </label>
          <input type="range" min={26} max={72} value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full" />
          <label className="flex items-center justify-between text-xs text-slate-600">
            Yükseklik (h): <span className="font-semibold text-slate-900">{h}</span>
          </label>
          <input type="range" min={50} max={120} value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full" />
        </div>

        <svg viewBox="0 0 400 240" className="h-56 w-full rounded-xl bg-white">
          {/* folded cylinder (left) */}
          <g style={{ opacity: open ? 0 : 1, transition: 'opacity 220ms ease' }}>
            <ellipse cx="250" cy="70" rx={r} ry={r * 0.35} fill={ink} opacity={0.06} stroke={ink} strokeWidth={3} />
            <path
              d={`M ${250 - r} 70 L ${250 - r} ${70 + h} A ${r} ${r * 0.35} 0 0 0 ${250 + r} ${70 + h} L ${250 + r} 70`}
              fill={ink}
              opacity={0.06}
              stroke={ink}
              strokeWidth={3}
            />
            <ellipse cx="250" cy={70 + h} rx={r} ry={r * 0.35} fill="none" stroke={ink} strokeWidth={3} opacity={0.55} />
          </g>

          {/* net (right) */}
          <g style={{ opacity: open ? 1 : 0, transition: 'opacity 220ms ease' }}>
            <rect x="40" y="70" width={clamp(circ, 140, 300)} height={h} fill={ink} opacity={0.06} stroke={ink} strokeWidth={3} />
            <circle cx="80" cy="58" r={r * 0.55} fill={ink} opacity={0.06} stroke={ink} strokeWidth={3} />
            <circle cx="80" cy={70 + h + 52} r={r * 0.55} fill={ink} opacity={0.06} stroke={ink} strokeWidth={3} />
            <text x="40" y="64" fontSize="12" fill={ink} opacity={0.85}>
              Dikdörtgen uzunluğu ≈ 2πr
            </text>
          </g>
        </svg>
      </div>
    </Panel>
  )
}

