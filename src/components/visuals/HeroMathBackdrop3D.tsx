import { Canvas } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import { useMemo } from 'react'

function Axes() {
  return (
    <>
      <Line points={[[-7, 0, 0], [7, 0, 0]]} color="#0f172a" lineWidth={1} />
      <Line points={[[0, -4, 0], [0, 4, 0]]} color="#0f172a" lineWidth={1} />
      <gridHelper args={[22, 22, '#e4e4e7', '#e4e4e7']} position={[0, 0, -0.25]} />
    </>
  )
}

function FunctionGraph({ phase = 0, amp = 1.1, z = 0.12 }: { phase?: number; amp?: number; z?: number }) {
  const pts = useMemo(() => {
    const out: Array<[number, number, number]> = []
    for (let i = 0; i < 320; i++) {
      const t = i / 319
      const x = -7 + t * 14
      const y = Math.sin(x * 0.85 + phase) * amp
      out.push([x, y, z])
    }
    return out
  }, [amp, phase, z])

  return <Line points={pts} color="#09090b" lineWidth={1.35} />
}

function Shapes() {
  return (
    <>
      <Float speed={1.05} rotationIntensity={0.9} floatIntensity={0.7}>
        <mesh position={[-4.8, 2.2, -0.5]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#09090b" wireframe />
        </mesh>
      </Float>
      <Float speed={1.25} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[4.8, -2.0, -0.55]}>
          <torusGeometry args={[1.05, 0.22, 12, 40]} />
          <meshStandardMaterial color="#09090b" wireframe />
        </mesh>
      </Float>
      <Float speed={0.95} rotationIntensity={0.7} floatIntensity={0.55}>
        <mesh position={[2.8, 2.7, -0.6]}>
          <boxGeometry args={[1.05, 1.05, 1.05]} />
          <meshStandardMaterial color="#09090b" wireframe />
        </mesh>
      </Float>
    </>
  )
}

export function HeroMathBackdrop3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 11], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.95} />
        <directionalLight position={[7, 5, 11]} intensity={1.05} />
        <Axes />
        <Float speed={1.05} rotationIntensity={0.2} floatIntensity={0.32}>
          <FunctionGraph phase={0.25} amp={1.18} z={0.15} />
          <FunctionGraph phase={1.2} amp={0.88} z={0.1} />
        </Float>
        <Shapes />
      </Canvas>
    </div>
  )
}

