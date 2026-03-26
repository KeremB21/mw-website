import { Canvas } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import { useMemo } from 'react'
import { Container } from '../layout/Container'
import { FadeIn } from '../motion/FadeIn'

function MiniWave() {
  const pts = useMemo(() => {
    const out: Array<[number, number, number]> = []
    for (let i = 0; i < 180; i++) {
      const t = i / 179
      const x = -6 + t * 12
      const y = Math.sin(x * 0.9) * 0.9
      out.push([x, y, 0])
    }
    return out
  }, [])
  return (
    <Float speed={1.05} rotationIntensity={0.25} floatIntensity={0.35}>
      <Line points={pts} color="#09090b" lineWidth={1.5} />
    </Float>
  )
}

function MiniShapes() {
  return (
    <>
      <Float speed={1.0} rotationIntensity={0.9} floatIntensity={0.7}>
        <mesh position={[-4.6, 0.9, -0.2]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#09090b" wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[4.6, -0.8, -0.25]}>
          <dodecahedronGeometry args={[0.75, 0]} />
          <meshStandardMaterial color="#09090b" wireframe />
        </mesh>
      </Float>
    </>
  )
}

export function HomeDecorStrip3D() {
  return (
    <section className="py-4 sm:py-6">
      <Container>
        <FadeIn>
          <div className="relative h-[140px] overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200 sm:h-[180px]">
            <div className="pointer-events-none absolute inset-0 grid-fade grid-drift opacity-[0.14]" />
            <Canvas
              camera={{ position: [0, 0, 10], fov: 45 }}
              dpr={[1, 1.5]}
              className="relative h-full w-full"
            >
              <ambientLight intensity={0.95} />
              <directionalLight position={[6, 4, 10]} intensity={1.0} />
              <gridHelper
                args={[18, 18, '#e4e4e7', '#e4e4e7']}
                position={[0, 0, -0.2]}
              />
              <MiniWave />
              <MiniShapes />
            </Canvas>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

