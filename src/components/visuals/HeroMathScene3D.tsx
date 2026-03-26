import { Canvas } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import { useMemo } from 'react'

function Axes() {
  return (
    <>
      <Line points={[[-6, 0, 0], [6, 0, 0]]} color="#18181b" lineWidth={1} />
      <Line points={[[0, -3.5, 0], [0, 3.5, 0]]} color="#18181b" lineWidth={1} />
      <gridHelper args={[18, 18, '#e4e4e7', '#e4e4e7']} position={[0, 0, -0.2]} />
    </>
  )
}

function WaveLine({ phase = 0, amp = 1.2, z = 0 }: { phase?: number; amp?: number; z?: number }) {
  const pts = useMemo(() => {
    const out: Array<[number, number, number]> = []
    for (let i = 0; i < 260; i++) {
      const t = i / 259
      const x = -6 + t * 12
      const y = Math.sin(x + phase) * amp
      out.push([x, y, z])
    }
    return out
  }, [amp, phase, z])

  return <Line points={pts} color="#09090b" lineWidth={1.5} />
}

function Shapes() {
  return (
    <>
      <Float speed={1.0} rotationIntensity={0.9} floatIntensity={0.75}>
        <mesh position={[-4.6, 2.1, -0.35]}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#09090b" wireframe />
        </mesh>
      </Float>
      <Float speed={1.25} rotationIntensity={0.75} floatIntensity={0.65}>
        <mesh position={[4.6, -2.0, -0.35]}>
          <torusGeometry args={[0.95, 0.22, 12, 36]} />
          <meshStandardMaterial color="#09090b" wireframe />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.65} floatIntensity={0.55}>
        <mesh position={[2.8, 2.5, -0.4]}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial color="#09090b" wireframe />
        </mesh>
      </Float>
    </>
  )
}

export function HeroMathScene3D({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200 ${className}`}>
      <div className="pointer-events-none absolute inset-0 grid-fade grid-drift opacity-[0.18]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white via-white to-transparent" />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        className="relative h-full w-full"
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[6, 4, 10]} intensity={1.0} />
        <Axes />
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35}>
          <WaveLine phase={0.25} amp={1.25} z={0.12} />
          <WaveLine phase={1.05} amp={0.85} z={0.08} />
        </Float>
        <Shapes />
      </Canvas>

      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-zinc-700 ring-1 ring-zinc-200 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
        3B matematik görseli
      </div>
    </div>
  )
}

