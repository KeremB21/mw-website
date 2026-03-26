import { useState } from 'react'
import {
  AngleProtractorSim,
  CircleRadiusSim,
  CylinderNetSim,
  LineSegmentRaySim,
  ParallelogramTriangleAreaSim,
  PolygonSim,
  PrismVolumeSim,
  PythagorasSim,
  SectorArcSim,
  TransversalAnglesSim,
} from './GeometrySims'

type TabKey = '5' | '6' | '7' | '8'

function Mascot({ tab }: { tab: TabKey }) {
  const colors =
    tab === '5'
      ? { a: '#22c55e', b: '#06b6d4' }
      : tab === '6'
        ? { a: '#f97316', b: '#facc15' }
        : tab === '7'
          ? { a: '#a855f7', b: '#60a5fa' }
          : { a: '#fb7185', b: '#34d399' }

  return (
    <svg width="34" height="34" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`m-${tab}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors.a} />
          <stop offset="1" stopColor={colors.b} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill={`url(#m-${tab})`} opacity="0.95" />
      <circle cx="18" cy="22" r="3" fill="#0f172a" opacity="0.9" />
      <circle cx="30" cy="22" r="3" fill="#0f172a" opacity="0.9" />
      <path d="M 16 30 C 20 35, 28 35, 32 30" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="14" cy="14" r="5" fill="#fff" opacity="0.25" />
    </svg>
  )
}

function TabButton({
  active,
  children,
  onClick,
  tab,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
  tab: TabKey
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ring-1 transition active:scale-[0.99]',
        active
          ? 'bg-white text-slate-900 ring-slate-900/15 shadow-[0_14px_30px_rgba(15,23,42,0.12)]'
          : 'bg-white/70 text-slate-700 ring-white/60 hover:bg-white hover:text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.10)]',
      ].join(' ')}
    >
      <span className="grid h-7 w-7 place-items-center rounded-xl bg-slate-900/5 ring-1 ring-slate-900/10 transition group-hover:bg-slate-900/10">
        <Mascot tab={tab} />
      </span>
      <span className="km-fun-title">{children}</span>
    </button>
  )
}

export function LgsGeometryLab() {
  const [tab, setTab] = useState<TabKey>('5')

  return (
    <section className="pb-16">
      <div className="km-fun-lab relative overflow-hidden rounded-3xl bg-white/70 p-5 ring-1 ring-white/60 backdrop-blur sm:p-7">
        <div className="pointer-events-none absolute inset-0 opacity-[0.9]">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/50 blur-3xl" />
          <div className="absolute -right-28 -top-20 h-64 w-64 rounded-full bg-orange-300/40 blur-3xl" />
          <div className="absolute -bottom-28 left-16 h-64 w-64 rounded-full bg-lime-300/35 blur-3xl" />
          <div className="absolute -bottom-28 right-10 h-64 w-64 rounded-full bg-fuchsia-300/35 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="km-fun-title text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Geometri Lab
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
            Sınıfını seç, noktaları sürükle ve matematiği “oyun gibi” keşfet. (Touch + mouse uyumlu)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <TabButton tab="5" active={tab === '5'} onClick={() => setTab('5')}>
            5. Sınıf
          </TabButton>
          <TabButton tab="6" active={tab === '6'} onClick={() => setTab('6')}>
            6. Sınıf
          </TabButton>
          <TabButton tab="7" active={tab === '7'} onClick={() => setTab('7')}>
            7. Sınıf
          </TabButton>
          <TabButton tab="8" active={tab === '8'} onClick={() => setTab('8')}>
            8. Sınıf
          </TabButton>
        </div>
      </div>

      {tab === '5' ? (
        <div className="relative mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LineSegmentRaySim />
          <AngleProtractorSim />
          <PolygonSim />
          <CircleRadiusSim />
        </div>
      ) : null}

      {tab === '6' ? (
        <div className="relative mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ParallelogramTriangleAreaSim />
          <PrismVolumeSim />
        </div>
      ) : null}

      {tab === '7' ? (
        <div className="relative mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TransversalAnglesSim />
          <SectorArcSim />
        </div>
      ) : null}

      {tab === '8' ? (
        <div className="relative mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PythagorasSim />
          <CylinderNetSim />
        </div>
      ) : null}
      </div>
    </section>
  )
}

