"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { openWhatsApp } from "@/lib/contacts"
import { useUTM } from "@/hooks/use-utm"

const sectionText = {
  ru: {
    badge: "Цены",
    title: "Стоимость тренировок в Uniqum Sport",
    subtitle: "Абонемент на 12 тренировок в месяц:",
    gymnastics: "Гимнастика",
    martialArts: "Единоборства",
    currency: "сом",
    cta: "Записаться на тренировку",
    features: [
      "12 занятий в месяц",
      "Профессиональные тренеры",
      "Удобное расписание",
      "Отличные условия"
    ]
  },
  ky: {
    badge: "Баалар",
    title: "Uniqum Sport машыгууларынын баасы",
    subtitle: "Айына 12 машыгууга абонемент:",
    gymnastics: "Гимнастика",
    martialArts: "Мушташ түрлөрү",
    currency: "сом",
    cta: "Машыгууга жазылуу",
    features: [
      "Айына 12 сабак",
      "Кесипкөй машыктыруучулар",
      "Ыңгайлуу расписание",
      "Мыкты шарттар"
    ]
  },
} as const

export default function PricesSection() {
  const ref = useScrollReveal()
  const { lang } = useLanguage()
  const t = sectionText[lang]
  const utmTags = useUTM()

  return (
    <section id="prices" ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center relative z-10 max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-[#0A2463]/10 text-[#0A2463] px-4 py-1.5 rounded-full text-sm font-bold mb-5 shadow-sm">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2463] mb-6 drop-shadow-sm">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
          {/* Gymnastics Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <h3 className="text-3xl font-black text-[#0A2463] mb-2">{t.gymnastics}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-[#0A2463]">6000</span>
              <span className="text-xl text-gray-500 font-medium">{t.currency}</span>
            </div>
            <ul className="space-y-4 mb-8">
              {t.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-lg text-gray-600 font-medium">
                  <div className="bg-green-100 text-green-600 rounded-full p-1">
                    <Check className="w-5 h-5" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-[#ED3D4E] text-white hover:bg-[#ED3D4E]/90 font-bold rounded-full py-7 text-lg group/btn shadow-lg"
              onClick={() => openWhatsApp(utmTags)}
            >
              {t.cta}
              <ArrowRight className="ml-2 h-6 w-6 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Martial Arts Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <h3 className="text-3xl font-black text-[#0A2463] mb-2">{t.martialArts}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-[#0A2463]">5000</span>
              <span className="text-xl text-gray-500 font-medium">{t.currency}</span>
            </div>
            <ul className="space-y-4 mb-8">
              {t.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-lg text-gray-600 font-medium">
                  <div className="bg-green-100 text-green-600 rounded-full p-1">
                    <Check className="w-5 h-5" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-[#ED3D4E] text-white hover:bg-[#ED3D4E]/90 font-bold rounded-full py-7 text-lg group/btn shadow-lg"
              onClick={openWhatsApp}
            >
              {t.cta}
              <ArrowRight className="ml-2 h-6 w-6 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
