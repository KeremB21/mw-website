import { createContext, useEffect, useMemo, useState } from 'react'

export type Language = 'tr' | 'en'
export type Theme = 'dark' | 'light'

type Dictionary = Record<string, string>

const TR: Dictionary = {
  'nav.home': 'Anasayfa',
  'nav.about': 'Hakkımda',
  'nav.lgs': 'LGS',
  'nav.yks': 'YKS',
  'nav.topics': 'Konu Anlatımları',
  'nav.solutions': 'Soru Çözümleri',
  'nav.contact': 'İletişim',
  'nav.cta': 'Ders Planla',
  'nav.lang': 'EN',
  'nav.theme': 'Aydınlık',

  'hero.badge': 'İstanbul Üniversitesi · Matematik (İngilizce)',
  'hero.title': 'Kerem ile Matematik',
  'hero.subtitle': 'Ortaokul ve Lise Matematik Özel Dersleri',
  'hero.text': 'Matematik artık çok eğlenceli!',
  'hero.ctaSecondary': 'Programlar',

  'navTiles.eyebrow': 'PROGRAMLAR',
  'navTiles.title': 'Tek tıkla doğru sayfaya',
  'navTiles.contact': 'İletişime geç',

  'teach.eyebrow': 'DERS TARZI',
  'teach.title': 'Eğlenceli ama disiplinli',
  'teach.text':
    'Matematiği “korkutucu” olmaktan çıkarıp anlaşılır ve keyifli hale getiriyoruz.',
  'teach.1.t': 'Kavram odaklı ve oyunlaştırılmış anlatım',
  'teach.1.d': 'Küçük hedefler, mini görevler ve bol “neden?” ile ilerleriz.',
  'teach.2.t': 'Adım adım eğlenceli soru çözümü',
  'teach.2.d': 'Önce kolay, sonra zor: her adımda güven kazanırsın.',
  'teach.3.t': 'Temel matematik mantığını geliştirme',
  'teach.3.d': 'Hız değil; doğru düşünme alışkanlığı. Hız zaten sonra geliyor.',

  'cta.eyebrow': 'HAZIR MISIN?',
  'cta.title': 'Matematiği Eğlenceli Öğren!',
  'cta.text':
    'Hemen başlayalım: seviyeni yaz, sana uygun mini hedefler ve eğlenceli bir plan hazırlayalım.',
  'cta.button': 'İletişime Geç',
}

const EN: Dictionary = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.lgs': 'LGS',
  'nav.yks': 'YKS',
  'nav.topics': 'Lessons',
  'nav.solutions': 'Solutions',
  'nav.contact': 'Contact',
  'nav.cta': 'Book a lesson',
  'nav.lang': 'TR',
  'nav.theme': 'Dark',

  'hero.badge': 'Istanbul University · Mathematics (English)',
  'hero.title': 'Math with Kerem',
  'hero.subtitle': 'Middle & High School Math Tutoring',
  'hero.text': 'Math is fun now!',
  'hero.ctaSecondary': 'Programs',

  'navTiles.eyebrow': 'PROGRAMS',
  'navTiles.title': 'Go to the right page',
  'navTiles.contact': 'Contact',

  'teach.eyebrow': 'TEACHING STYLE',
  'teach.title': 'Fun, but disciplined',
  'teach.text':
    'We make math feel clear and enjoyable—without losing structure.',
  'teach.1.t': 'Concept-focused, gamified learning',
  'teach.1.d': 'Small goals, mini missions, and lots of “why?”.',
  'teach.2.t': 'Step-by-step problem solving',
  'teach.2.d': 'Easy first, then harder—confidence grows each step.',
  'teach.3.t': 'Build mathematical thinking',
  'teach.3.d': 'Not just speed—good thinking habits. Speed comes later.',

  'cta.eyebrow': 'READY?',
  'cta.title': 'Learn Math the Fun Way!',
  'cta.text':
    'Send your level and goal—let’s build a fun plan with mini milestones.',
  'cta.button': 'Get in touch',
}

export const AppSettingsContext = createContext<{
  language: Language
  setLanguage: (l: Language) => void
  theme: Theme
  setTheme: (t: Theme) => void
  t: (key: string) => string
} | null>(null)

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('km_language')
    return saved === 'en' ? 'en' : 'tr'
  })
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('km_theme')
    return saved === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    localStorage.setItem('km_language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('km_theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const dict = language === 'en' ? EN : TR
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      setTheme,
      t: (key: string) => dict[key] ?? key,
    }),
    [dict, language, theme],
  )

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  )
}

