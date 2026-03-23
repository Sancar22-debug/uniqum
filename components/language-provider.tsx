"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Language = "ru" | "ky"

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ky")

  useEffect(() => {
    try {
      const savedLang = window.localStorage.getItem("uniqum_lang")
      if (savedLang === "ru" || savedLang === "ky") {
        setLangState(savedLang)
      }
    } catch {
      // Ignore storage errors (private mode / blocked storage).
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (nextLang: Language) => {
    setLangState(nextLang)
    try {
      window.localStorage.setItem("uniqum_lang", nextLang)
    } catch {
      // Ignore storage errors and keep language in memory.
    }
  }

  const value = useMemo(() => ({ lang, setLang }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      lang: "ky" as const,
      setLang: () => {},
    }
  }
  return context
}
