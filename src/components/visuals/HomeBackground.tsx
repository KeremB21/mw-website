import { MathParticles } from './MathParticles'

export function HomeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(1400px_820px_at_18%_10%,rgba(59,130,246,0.22),transparent_58%),radial-gradient(1100px_760px_at_86%_16%,rgba(168,85,247,0.20),transparent_58%),radial-gradient(1000px_720px_at_25%_88%,rgba(148,163,184,0.18),transparent_60%),linear-gradient(180deg,#fbfdff_0%,#f6f7ff_35%,#fbfbfe_100%)]" />
      <div className="absolute inset-0 grid-fade grid-drift opacity-[0.22]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-white/40" />
      <MathParticles intensity={34} opacity={0.085} />
    </div>
  )
}

