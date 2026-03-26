import { lazy, Suspense } from 'react'

const HeroMathScene3D = lazy(() =>
  import('./HeroMathScene3D').then((m) => ({ default: m.HeroMathScene3D })),
)

export function LazyHeroMathScene3D({ className = '' }: { className?: string }) {
  return (
    <Suspense
      fallback={
        <div
          className={`relative overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200 ${className}`}
        >
          <div className="absolute inset-0 grid-fade opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white via-white to-transparent" />
          <div className="relative flex h-full w-full items-center justify-center p-6">
            <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-900" />
          </div>
        </div>
      }
    >
      <HeroMathScene3D className={className} />
    </Suspense>
  )
}

