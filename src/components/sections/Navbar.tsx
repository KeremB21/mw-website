import { Container } from '../layout/Container'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <a href="#top" className="text-sm font-semibold tracking-tight text-zinc-900">
            Kerem Math
          </a>
          <nav className="hidden items-center gap-5 text-sm sm:flex">
            <a className="text-zinc-600 hover:text-zinc-900" href="#about">
              About
            </a>
            <a className="text-zinc-600 hover:text-zinc-900" href="#approach">
              Approach
            </a>
            <a className="text-zinc-600 hover:text-zinc-900" href="#topics">
              Topics
            </a>
            <a className="text-zinc-600 hover:text-zinc-900" href="#examples">
              Examples
            </a>
            <a className="text-zinc-600 hover:text-zinc-900" href="#levels">
              Level
            </a>
            <a className="text-zinc-600 hover:text-zinc-900" href="#contact">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Book
          </a>
        </div>
      </Container>
    </header>
  )
}

