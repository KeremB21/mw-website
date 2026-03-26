import { Route, Routes } from 'react-router-dom'
import { AppShell } from './AppShell'
import { AboutPage } from '../pages/AboutPage'
import { HomePage } from '../pages/HomePage'
import { KonuAnlatimlariPage } from '../pages/KonuAnlatimlariPage'
import { LgsPage } from '../pages/LgsPage'
import { SoruCozumleriPage } from '../pages/SoruCozumleriPage'
import { YksPage } from '../pages/YksPage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="/hakkimda" element={<AboutPage />} />
        <Route path="/lgs" element={<LgsPage />} />
        <Route path="/yks" element={<YksPage />} />
        <Route path="/konu-anlatimlari" element={<KonuAnlatimlariPage />} />
        <Route path="/soru-cozumleri" element={<SoruCozumleriPage />} />
      </Route>
    </Routes>
  )
}

