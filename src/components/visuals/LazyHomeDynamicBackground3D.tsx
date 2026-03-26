import { lazy, Suspense } from 'react'

const HomeDynamicBackground3D = lazy(() =>
  import('./HomeDynamicBackground3D').then((m) => ({ default: m.HomeDynamicBackground3D })),
)

export function LazyHomeDynamicBackground3D() {
  return (
    <Suspense
      fallback={
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[image:var(--km-bg)]" />
          <div className="absolute inset-0 grid-fade grid-drift opacity-[0.10]" />
        </div>
      }
    >
      <HomeDynamicBackground3D />
    </Suspense>
  )
}

