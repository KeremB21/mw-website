import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { MathParticles } from './MathParticles'
import { useAppSettings } from '../../app/useAppSettings'

function Axes() {
  return (
    <>
      <Line points={[[-6, 0, 0], [6, 0, 0]]} color="#ffffff" lineWidth={1} />
      <Line points={[[0, -3.5, 0], [0, 3.5, 0]]} color="#ffffff" lineWidth={1} />
      <gridHelper args={[20, 20, '#1f2937', '#111827']} position={[0, 0, -0.2]} />
    </>
  )
}

function FunctionWave() {
  const geomRef = useRef<THREE.BufferGeometry>(null)
  const points = useMemo(() => {
    const N = 260
    const arr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1)
      const x = -6 + u * 12
      arr[i * 3 + 0] = x
      arr[i * 3 + 1] = 0
      arr[i * 3 + 2] = 0.1
    }
    return { N, arr }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.9
    const pos = points.arr
    for (let i = 0; i < points.N; i++) {
      const x = pos[i * 3 + 0]!
      pos[i * 3 + 1] = Math.sin(x * 0.85 + t) * 1.1
    }
    const geom = geomRef.current
    if (geom) {
      const attr = geom.getAttribute('position') as THREE.BufferAttribute
      attr.needsUpdate = true
      geom.computeBoundingSphere()
    }
  })

  return (
    <line>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[points.arr, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.95} />
    </line>
  )
}

function RotatingShapeCluster() {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.z = t * 0.06
    group.current.rotation.y = t * 0.05
  })

  return (
    <group ref={group}>
      <mesh position={[-4.9, 2.4, -0.45]}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={[4.8, -2.2, -0.55]}>
        <torusGeometry args={[1.0, 0.24, 12, 42]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={[2.9, 2.8, -0.6]}>
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={[-2.6, -3.1, -0.6]}>
        <dodecahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={[0.8, 0.7, -0.35]}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  )
}

export function SiteBackground() {
  const { theme } = useAppSettings()
  const isLight = theme === 'light'
  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      {isLight ? (
        <>
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 grid-fade grid-drift opacity-[0.04]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_10%,rgba(59,130,246,0.22),transparent_60%),radial-gradient(900px_650px_at_82%_18%,rgba(168,85,247,0.16),transparent_62%),linear-gradient(180deg,#030712_0%,#050b1a_55%,#020617_100%)]" />
          <div className="absolute inset-0 grid-fade grid-drift opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/25" />
        </>
      )}

      <div className="absolute inset-0 opacity-[0.42]">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.85} />
          <directionalLight position={[6, 4, 10]} intensity={1.25} />
          <Axes />
          <FunctionWave />
          <RotatingShapeCluster />
        </Canvas>
      </div>

      <MathParticles intensity={18} opacity={0.06} />
    </div>
  )
}

