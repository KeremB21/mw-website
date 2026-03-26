import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import type { Mesh } from 'three'

/* Sürekli dönen + Float ile yüzen şekil */
function RotatingShape({
  position,
  scale,
  color,
  opacity,
  rx = 0,
  ry = 0.008,
  rz = 0,
  floatSpeed = 1,
  floatIntensity = 0.5,
  children,
}: {
  position: [number, number, number]
  scale: number
  color: string
  opacity: number
  rx?: number
  ry?: number
  rz?: number
  floatSpeed?: number
  floatIntensity?: number
  children: React.ReactNode
}) {
  const ref = useRef<Mesh>(null)
  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.x += rx
    ref.current.rotation.y += ry
    ref.current.rotation.z += rz
  })
  return (
    <Float speed={floatSpeed} rotationIntensity={0} floatIntensity={floatIntensity}>
      <mesh ref={ref} position={position} scale={scale}>
        {children}
        <meshStandardMaterial color={color} wireframe transparent opacity={opacity} />
      </mesh>
    </Float>
  )
}

function HeroShapes({ isDark }: { isDark: boolean }) {
  const sky     = isDark ? '#38bdf8' : '#0284c7'
  const indigo  = isDark ? '#818cf8' : '#4f46e5'
  const fuchsia = isDark ? '#e879f9' : '#c026d3'
  const violet  = isDark ? '#a78bfa' : '#7c3aed'
  const cyan    = isDark ? '#22d3ee' : '#0891b2'
  const pink    = isDark ? '#f0abfc' : '#a21caf'

  return (
    <>
      {/* Merkez – büyük TorusKnot (sky) */}
      <RotatingShape
        position={[0.1, 0.2, 0]} scale={2.0}
        color={sky} opacity={0.80}
        rx={0.006} ry={0.011} rz={0.004}
        floatSpeed={0.7} floatIntensity={0.35}
      >
        <torusKnotGeometry args={[0.7, 0.22, 140, 16]} />
      </RotatingShape>

      {/* Sol üst – Icosahedron (indigo) */}
      <RotatingShape
        position={[-2.8, 2.0, -0.5]} scale={1.25}
        color={indigo} opacity={0.70}
        rx={0.005} ry={0.008} rz={0.003}
        floatSpeed={0.65} floatIntensity={0.55}
      >
        <icosahedronGeometry args={[1, 0]} />
      </RotatingShape>

      {/* Sağ alt – Torus hızlı spin (fuchsia) */}
      <RotatingShape
        position={[2.6, -1.8, -0.3]} scale={1.15}
        color={fuchsia} opacity={0.65}
        rx={0.014} ry={0.006} rz={0.009}
        floatSpeed={1.0} floatIntensity={0.40}
      >
        <torusGeometry args={[0.7, 0.25, 12, 40]} />
      </RotatingShape>

      {/* Sağ üst – Dodecahedron (violet) */}
      <RotatingShape
        position={[2.5, 2.2, -0.6]} scale={1.05}
        color={violet} opacity={0.60}
        rx={0.004} ry={0.010} rz={0.006}
        floatSpeed={0.85} floatIntensity={0.50}
      >
        <dodecahedronGeometry args={[1, 0]} />
      </RotatingShape>

      {/* Sol alt – Octahedron hızlı (cyan) */}
      <RotatingShape
        position={[-2.5, -2.2, -0.4]} scale={1.10}
        color={cyan} opacity={0.60}
        rx={0.009} ry={0.007} rz={0.012}
        floatSpeed={1.1} floatIntensity={0.50}
      >
        <octahedronGeometry args={[1, 0]} />
      </RotatingShape>

      {/* Alt orta – Cone (sky açık) */}
      <RotatingShape
        position={[-0.6, -3.2, -0.5]} scale={0.90}
        color={sky} opacity={0.55}
        rx={0.008} ry={0.012} rz={0.005}
        floatSpeed={1.2} floatIntensity={0.55}
      >
        <coneGeometry args={[0.7, 1.5, 7]} />
      </RotatingShape>

      {/* Üst sağ – Tetrahedron küçük (pink) */}
      <RotatingShape
        position={[1.2, 3.2, -0.4]} scale={0.70}
        color={pink} opacity={0.55}
        rx={0.011} ry={0.009} rz={0.013}
        floatSpeed={1.4} floatIntensity={0.65}
      >
        <tetrahedronGeometry args={[1, 0]} />
      </RotatingShape>

      {/* Sol orta – Sphere küçük (indigo) */}
      <RotatingShape
        position={[-3.4, 0.1, -0.3]} scale={0.52}
        color={indigo} opacity={0.45}
        rx={0.007} ry={0.015} rz={0.008}
        floatSpeed={1.5} floatIntensity={0.70}
      >
        <sphereGeometry args={[1, 8, 6]} />
      </RotatingShape>

      {/* Sağ orta – ikinci TorusKnot mini (fuchsia) */}
      <RotatingShape
        position={[3.3, 0.5, -0.7]} scale={0.60}
        color={fuchsia} opacity={0.45}
        rx={0.010} ry={0.013} rz={0.007}
        floatSpeed={1.1} floatIntensity={0.45}
      >
        <torusKnotGeometry args={[0.5, 0.16, 80, 10]} />
      </RotatingShape>
    </>
  )
}

export function HeroGeometry3D() {
  return (
    <div className="pointer-events-none h-[480px] w-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[6, 5, 8]} intensity={1.4} />
        <pointLight position={[-4, -3, 4]} intensity={0.6} color="#818cf8" />
        <HeroShapes isDark={true} />
      </Canvas>
    </div>
  )
}
