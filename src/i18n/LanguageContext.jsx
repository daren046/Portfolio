import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'portfolio-lang'

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'fr'
  })

  const setLang = (next) => {
    setLangState(next === 'en' ? 'en' : 'fr')
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const dict = translations[lang] ?? translations.fr

    const t = (key, fallback) => {
      const val = getNested(dict, key)
      return val ?? fallback ?? key
    }

    return { lang, setLang, t, dict }
  }, [lang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
