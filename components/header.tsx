"use client"

import { useEffect, useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"

import Image from "next/image"

const navLinks = [
  { href: "#directions", label: { ru: "Направления", ky: "Багыттар" } },
  { href: "#results", label: { ru: "Результаты", ky: "Жыйынтыктар" } },
  { href: "#how-it-works", label: { ru: "Как начать", ky: "Кантип баштоо" } },
  { href: "#faq", label: { ru: "Вопросы", ky: "Суроолор" } },
]

const uiText = {
  ru: {
    homeAria: "UNIQUM SPORT — на главную",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    desktopNav: "Основная навигация",
    mobileNav: "Мобильная навигация",
    signUp: "Записаться",
    signUpFull: "Записаться на тренировку",
    ru: "Русский",
    ky: "Кыргызча",
  },
  ky: {
    homeAria: "UNIQUM SPORT — башкы бетке",
    openMenu: "Менюну ачуу",
    closeMenu: "Менюну жабуу",
    desktopNav: "Негизги навигация",
    mobileNav: "Мобилдик навигация",
    signUp: "Жазылуу",
    signUpFull: "Машыгууга жазылуу",
    ru: "Орусча",
    ky: "Кыргызча",
  },
} as const

import { openWhatsApp } from "@/lib/contacts"

function scrollToContact() {
  openWhatsApp()
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const t = uiText[lang]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled ? "bg-white/97 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-2"
      }`}
    >
      <div suppressHydrationWarning className="container mx-auto px-4 flex h-14 md:h-16 items-center justify-between gap-4">
        <div className="relative w-[130px] md:w-[165px] h-full shrink-0">
          <a href="#" className="relative block h-full w-full" aria-label={t.homeAria}>
            <Image
              src={isScrolled ? "/images/logo-header-cropped.png" : "/images/logo-hero-cropped.png"}
              alt="UNIQUM SPORT"
              fill
              sizes="(max-width: 768px) 130px, 165px"
              className={`object-contain object-left ${isScrolled ? "" : "brightness-0 invert"}`}
              unoptimized
              priority
            />
          </a>
        </div>

        <nav className="hidden lg:flex items-center gap-8 shrink-0" aria-label={t.desktopNav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-wide transition-colors hover:opacity-70 ${
                isScrolled ? "text-[#0A2463]" : "text-white"
              }`}
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        <div suppressHydrationWarning className="flex items-center gap-3 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`font-semibold text-sm ${
                  isScrolled ? "text-[#0A2463] hover:text-[#0A2463]" : "text-white hover:text-white"
                }`}
              >
                {lang === "ru" ? "RU" : "KY"}
                <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("ru")} className="font-medium">
                {t.ru}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("ky")} className="font-medium">
                {t.ky}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="hidden md:flex bg-white text-[#0A2463] hover:bg-gray-100 border border-[#0A2463]/20 font-bold rounded-full px-5 py-2 text-sm shadow-md"
            onClick={scrollToContact}
          >
            {t.signUp}
          </Button>

          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t.closeMenu : t.openMenu}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "text-[#0A2463]" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-[#0A2463]" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-1" aria-label={t.mobileNav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#0A2463] font-semibold py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label[lang]}
            </a>
          ))}
          <Button
            className="w-full bg-white text-[#0A2463] hover:bg-gray-100 border border-[#0A2463]/20 font-bold rounded-full mt-4"
            onClick={() => {
              setIsMobileMenuOpen(false)
              scrollToContact()
            }}
          >
            {t.signUpFull}
          </Button>
        </nav>
      </div>
    </header>
  )
}
