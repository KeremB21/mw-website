import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
function AvatarCore({ ink }: { ink: string }) {
  const group = useRef<THREE.Group>(null)
  const mat = useMemo(
    () => ({
      color: ink,
      wireframe: true,
    }),
    [ink],
  )

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.y = t * 0.45
    group.current.rotation.x = Math.sin(t * 0.5) * 0.15
  })

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.35}>
        <mesh position={[0, 0.05, 0]}>
          <icosahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      </Float>
      <mesh position={[0, -1.25, 0]}>
        <torusGeometry args={[0.7, 0.16, 10, 28]} />
        <meshStandardMaterial {...mat} />
      </mesh>
    </group>
  )
}

export function MiniPortrait3D({ className = '' }: { className?: string }) {
  const ink = '#ffffff'

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[color:var(--km-surface)] ring-1 ring-[color:var(--km-ring)] backdrop-blur ${className}`}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 grid-fade grid-drift opacity-[0.16]" />
      <Canvas camera={{ position: [0, 0, 4.4], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 2, 4]} intensity={1.1} />
        <AvatarCore ink={ink} />
      </Canvas>
    </div>
  )
}

