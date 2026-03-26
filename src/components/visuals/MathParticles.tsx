import { useEffect, useMemo, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  char: string
  rot: number
  vrot: number
}

const DEFAULT_SYMBOLS = [
  'π',
  '∑',
  '√',
  '∞',
  'Δ',
  'θ',
  'λ',
  '∫',
  '≈',
  '≠',
  '≤',
  '≥',
  'x²',
  'f(x)',
]

export function MathParticles({
  className = '',
  intensity = 22,
  opacity = 0.12,
}: {
  className?: string
  intensity?: number
  opacity?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const symbols = useMemo(() => DEFAULT_SYMBOLS, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let running = true

    const particles: Particle[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const rand = (min: number, max: number) => min + Math.random() * (max - min)

    const spawn = (w: number, h: number): Particle => {
      const char = symbols[Math.floor(Math.random() * symbols.length)]!
      const size = rand(12, 22)
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.16, 0.16),
        vy: rand(-0.12, 0.12),
        size,
        alpha: rand(0.25, 0.7),
        char,
        rot: rand(-0.6, 0.6),
        vrot: rand(-0.004, 0.004),
      }
    }

    const tick = () => {
      if (!running) return
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = `rgba(9,9,11,${opacity})`

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vrot

        if (p.x < -60) p.x = w + 60
        if (p.x > w + 60) p.x = -60
        if (p.y < -60) p.y = h + 60
        if (p.y > h + 60) p.y = -60

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.font = `${p.size}px Inter, ui-sans-serif, system-ui`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.char, 0, 0)
        ctx.restore()
      }

      raf = requestAnimationFrame(tick)
    }

    const onResize = () => {
      resize()
      const w = window.innerWidth
      const h = window.innerHeight
      particles.length = 0
      const count = Math.max(10, Math.floor((w * h) / 60000) + intensity)
      for (let i = 0; i < count; i++) particles.push(spawn(w, h))
    }

    onResize()
    window.addEventListener('resize', onResize, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [intensity, opacity, symbols])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      aria-hidden="true"
    />
  )
}

