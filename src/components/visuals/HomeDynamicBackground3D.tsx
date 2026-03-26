import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
function AnimatedFunctionLine({
  freq = 0.85,
  amp = 1.2,
  speed = 0.9,
  z = 0.12,
  opacity = 1,
  color = '#ffffff',
}: {
  freq?: number
  amp?: number
  speed?: number
  z?: number
  opacity?: number
  color?: string
}) {
  const lineRef = useRef<THREE.Line>(null)
  const geomRef = useRef<THREE.BufferGeometry>(null)
  const points = useMemo(() => {
    const N = 340
    const arr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1)
      const x = -8 + t * 16
      arr[i * 3 + 0] = x
      arr[i * 3 + 1] = 0
      arr[i * 3 + 2] = z
    }
    return { N, arr }
  }, [z])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    const pos = points.arr
    for (let i = 0; i < points.N; i++) {
      const x = pos[i * 3 + 0]!
      pos[i * 3 + 1] = Math.sin(x * freq + t) * amp
    }
    const geom = geomRef.current
    if (geom) {
      const attr = geom.getAttribute('position') as THREE.BufferAttribute
      attr.needsUpdate = true
      geom.computeBoundingSphere()
    }
  })

  return (
    <line ref={lineRef as never}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[points.arr, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
      />
    </line>
  )
}

function ManyShapes({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.z = t * 0.05
    group.current.rotation.y = t * 0.06
  })

  return (
    <group ref={group}>
      {/* Kalıcı: Float yok, sabit konum + grup rotasyonu */}
      <mesh position={[-5.8, 2.8, -0.8]}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      <mesh position={[6.0, -2.4, -0.9]}>
        <torusGeometry args={[1.2, 0.26, 12, 48]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      <mesh position={[3.4, 3.2, -1.0]}>
        <boxGeometry args={[1.15, 1.15, 1.15]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      <mesh position={[-2.8, -3.0, -0.95]}>
        <dodecahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      <mesh position={[0.8, 0.6, -0.6]}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      <mesh position={[-0.6, 3.9, -1.05]}>
        <tetrahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </group>
  )
}

const SYMBOLS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '−',
  '×',
  '÷',
  '=',
  'π',
  '∑',
  '√',
  '∞',
  'Δ',
  'θ',
  '∫',
  'x²',
  'f(x)',
  '≈',
]

function FloatingSymbols({ color }: { color: string }) {
  const { size } = useThree()
  const count = useMemo(() => {
    const area = size.width * size.height
    if (area < 420_000) return 14
    if (area < 900_000) return 20
    return 26
  }, [size.height, size.width])

  const items = useMemo(() => {
    const rand = (min: number, max: number) => min + Math.random() * (max - min)
    return Array.from({ length: count }, (_, i) => ({
      key: `sym-${i}`,
      text: SYMBOLS[i % SYMBOLS.length]!,
      pos: new THREE.Vector3(rand(-7.2, 7.2), rand(-4.2, 4.2), rand(-1.4, 0.2)),
      rot: new THREE.Euler(rand(-0.8, 0.8), rand(-0.8, 0.8), rand(-0.8, 0.8)),
      speed: rand(0.12, 0.32),
      size: rand(0.35, 0.7),
      alpha: rand(0.35, 0.7),
    }))
  }, [count])

  return (
    <>
      {items.map((it) => (
        <Float
          key={it.key}
          speed={1.2 + it.speed}
          rotationIntensity={0.4}
          floatIntensity={0.6}
        >
          <Text
            position={it.pos}
            rotation={it.rot}
            fontSize={it.size}
            color={color}
            anchorX="center"
            anchorY="middle"
            fillOpacity={it.alpha}
            outlineWidth={0.02}
            outlineColor={color}
            outlineOpacity={0.25}
          >
            {it.text}
          </Text>
        </Float>
      ))}
    </>
  )
}

const INK   = '#ffffff'
const GRID_A = '#1f2937'
const GRID_B = '#111827'

export function HomeDynamicBackground3D({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_16%_8%,rgba(59,130,246,0.22),transparent_62%),radial-gradient(950px_720px_at_84%_14%,rgba(168,85,247,0.18),transparent_64%),linear-gradient(180deg,#030712_0%,#050b1a_55%,#020617_100%)]" />
      <div className="absolute inset-0 grid-fade grid-drift opacity-[0.10]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/30" />

      <div className="absolute inset-0 opacity-[0.46]">
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.85} />
          <directionalLight position={[8, 6, 12]} intensity={1.25} />
          <Line points={[[-8, 0, 0], [8, 0, 0]]} color={INK} lineWidth={1} />
          <Line points={[[0, -4.8, 0], [0, 4.8, 0]]} color={INK} lineWidth={1} />
          <gridHelper args={[28, 28, GRID_A, GRID_B]} position={[0, 0, -0.35]} />
          <AnimatedFunctionLine color={INK} freq={0.82} amp={1.45} speed={0.95} z={0.16} opacity={0.85} />
          <AnimatedFunctionLine color={INK} freq={1.05} amp={0.95} speed={1.15} z={0.12} opacity={0.7} />
          <AnimatedFunctionLine color={INK} freq={0.55} amp={0.65} speed={0.75} z={0.08} opacity={0.55} />
          <AnimatedFunctionLine color={INK} freq={1.4} amp={0.5} speed={1.35} z={0.06} opacity={0.42} />
          <ManyShapes color={INK} />
          <FloatingSymbols color={INK} />
        </Canvas>
      </div>
    </div>
  )
}

