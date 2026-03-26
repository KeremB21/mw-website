import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { useMemo } from 'react'

function Knot() {
  const material = useMemo(
    () => ({
      color: '#09090b',
      wireframe: true,
    }),
    [],
  )

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.7}>
      <mesh>
        <torusKnotGeometry args={[1.15, 0.34, 220, 18]} />
        <meshStandardMaterial {...material} />
      </mesh>
    </Float>
  )
}

export function MathObject3D({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white via-white to-transparent" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        className="relative h-full w-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 2, 4]} intensity={1.1} />
        <Knot />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>

      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-zinc-700 ring-1 ring-zinc-200 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
        3B obje
      </div>
    </div>
  )
}

