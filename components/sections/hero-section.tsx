"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { openWhatsApp } from "@/lib/contacts"
import { useUTM } from "@/hooks/use-utm"

const heroText = {
  ru: {
    ariaLabel: "Главный экран",
    badge: "Бишкек · с 2022 года",
    titleTop: "Спортивные секции",
    titleBottom: "для детей 3,5-17 лет",
    description:
      "Гимнастика, единоборства и ЛФК в одном месте. Сильное тело, дисциплина и уверенность ребенка через регулярные тренировки.",
    primaryCta: "Подобрать направление",
    secondaryCta: "Смотреть направления",
    students: "Спортсменов",
    years: "Лет опыта",
    coaches: "Тренеров",
    galleryTitle: "Яркая спортивная среда",
    gallery: [
      { src: "/images/dsc_7373.jpg", label: "Тхэквондо" },
      { src: "/images/Gym Pictures/SEM01922.JPG", label: "Гимнастика" },
      { src: "/images/Gym Pictures/SEM02155.JPG", label: "Тренировки" },
      { src: "/images/Gym Pictures/SEM02350.JPG", label: "Занятия детей" },
    ],
  },
  ky: {
    ariaLabel: "Башкы экран",
    badge: "Бишкек · 2022-жылдан бери",
    titleTop: "3,5-17 жаштагы",
    titleBottom: "балдар үчүн спорт секциялары",
    description:
      "Гимнастика, мушташ жана ДФК бир жерде. Туруктуу машыгуу аркылуу баланын күчүн, тартибин жана ишенимин өстүрөбүз.",
    primaryCta: "Багыт тандоо",
    secondaryCta: "Багыттарды көрүү",
    students: "Спортчу",
    years: "Жыл тажрыйба",
    coaches: "Машыктыруучу",
    galleryTitle: "Жаркын спорт чөйрөсү",
    gallery: [
      { src: "/images/dsc_7373.jpg", label: "Тхэквондо" },
      { src: "/images/Gym Pictures/SEM01922.JPG", label: "Гимнастика" },
      { src: "/images/Gym Pictures/SEM02155.JPG", label: "Машыгуулар" },
      { src: "/images/Gym Pictures/SEM02350.JPG", label: "Балдар сабагы" },
    ],
  },
} as const

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  const { lang } = useLanguage()
  const t = heroText[lang]
  const utmTags = useUTM()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="hero-section relative min-h-[100svh] md:h-[100dvh] md:min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A2463 0%, #133a93 48%, #0A2463 100%)" }}
      aria-label={t.ariaLabel}
    >
      <div className="absolute inset-y-0 right-0 w-[58%] bg-[#ED3D4E]/90"
        style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />
      <div className="absolute top-24 -left-16 w-80 h-80 bg-white/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-[28rem] h-[28rem] bg-[#0099FF]/16 rounded-full blur-3xl pointer-events-none" />

      <div className="hero-section-inner container mx-auto px-4 pt-20 pb-20 md:pt-20 md:pb-4 md:h-full relative z-10">
        <div className="hero-section-stack max-w-6xl mx-auto w-full flex flex-col justify-center gap-6 md:gap-3 md:h-full">
          <div className="text-white text-center space-y-5 md:space-y-3">
            <div
              className="transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)" }}
            >
              <span className="inline-block bg-white text-[#0A2463] px-3.5 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold">
                {t.badge}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-4xl xl:text-5xl font-black leading-[1.1] tracking-tight transition-all duration-700 delay-100"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)" }}
            >
              <span className="block text-balance">{t.titleTop}</span>
              <span className="block text-white text-balance max-w-[16ch] sm:max-w-none mx-auto">{t.titleBottom}</span>
            </h1>

            <p
              className="text-base md:text-base text-white/90 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)" }}
            >
              {t.description}
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center gap-6 transition-all duration-700 delay-300"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)" }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#ED3D4E] text-white hover:bg-[#c41c2e] font-black rounded-full px-6 sm:px-8 py-4 h-auto text-sm sm:text-base group shadow-xl border-2 border-white/90"
                onClick={() => openWhatsApp(utmTags)}
              >
                {t.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/60 text-white bg-white/10 hover:bg-white/20 rounded-full px-6 sm:px-8 py-4 h-auto text-sm sm:text-base backdrop-blur-sm"
                onClick={() => {
                  const element = document.getElementById("directions")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {t.secondaryCta}
              </Button>
            </div>
          </div>

          <div
            className="mt-6 md:mt-2 transition-all duration-700 delay-400"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(26px)" }}
          >
            <p className="text-white/90 text-xs md:text-sm font-bold tracking-wider uppercase mb-2 md:mb-3 text-left">{t.galleryTitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {t.gallery.map((item, index) => (
                <div key={item.label} className="relative aspect-square rounded-2xl overflow-hidden border border-white/30 shadow-xl bg-[#0A2463]">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={`object-cover ${index === 1 ? "object-bottom" : "object-center"}`}
                    style={index === 3 ? { objectPosition: "center 60%" } : undefined}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2463]/40 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <div
            className="grid grid-cols-3 gap-2 md:gap-4 mt-5 md:mt-2 transition-all duration-700 delay-500"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(26px)" }}
          >
            <div className="rounded-2xl bg-white/90 text-[#0A2463] py-2.5 md:py-2.5 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black">800+</div>
              <div className="text-xs md:text-sm font-semibold text-[#0A2463]/70 mt-0.5">{t.students}</div>
            </div>
            <div className="rounded-2xl bg-white/90 text-[#0A2463] py-2.5 md:py-2.5 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black">4+</div>
              <div className="text-xs md:text-sm font-semibold text-[#0A2463]/70 mt-0.5">{t.years}</div>
            </div>
            <div className="rounded-2xl bg-white/90 text-[#0A2463] py-2.5 md:py-2.5 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black">20+</div>
              <div className="text-xs md:text-sm font-semibold text-[#0A2463]/70 mt-0.5">{t.coaches}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
