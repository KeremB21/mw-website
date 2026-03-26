import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { LazySiteBackground } from '../components/visuals/LazySiteBackground'
import { Footer } from '../components/sections/Footer'
import { AppSettingsProvider } from './AppSettingsProvider'

export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <AppSettingsProvider>
      <div className="relative min-h-svh">
        <LazySiteBackground />
        <Navbar />
        <main className="relative">{children ?? <Outlet />}</main>
        <Footer />
      </div>
    </AppSettingsProvider>
  )
}

