import { lazy, Suspense } from 'react'

const SiteBackground = lazy(() =>
  import('./SiteBackground').then((m) => ({ default: m.SiteBackground })),
)

export function LazySiteBackground() {
  return (
    <Suspense
      fallback={
        <div className="pointer-events-none fixed inset-0 -z-20">
          <div className="absolute inset-0 bg-[image:var(--km-bg)]" />
          <div className="absolute inset-0 grid-fade grid-drift opacity-[0.08]" />
        </div>
      }
    >
      <SiteBackground />
    </Suspense>
  )
}

