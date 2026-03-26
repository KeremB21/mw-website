import { Container } from '../layout/Container'

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--km-ring)] bg-[color:var(--km-surface)] py-10 backdrop-blur">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[color:var(--km-fg)]">Kerem Math</p>
            <p className="mt-1 text-sm text-[color:var(--km-muted)]">
              Özel matematik dersi · İstanbul
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <a className="text-[color:var(--km-muted)] hover:text-[color:var(--km-fg)]" href="/hakkimda">
              Hakkımda
            </a>
            <a className="text-[color:var(--km-muted)] hover:text-[color:var(--km-fg)]" href="/lgs">
              LGS
            </a>
            <a className="text-[color:var(--km-muted)] hover:text-[color:var(--km-fg)]" href="/yks">
              YKS
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs text-[color:var(--km-muted)]">
          © {new Date().getFullYear()} Kerem. Tüm hakları saklıdır.
        </p>
      </Container>
    </footer>
  )
}

