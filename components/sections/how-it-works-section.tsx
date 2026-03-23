"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, PlayCircle, MessageSquare, TrendingUp, RefreshCw } from "lucide-react"
import { openWhatsApp } from "@/lib/contacts"

const steps = [
  {
    number: "01",
    icon: Search,
    title: { ru: "Подбор направления и группы", ky: "Багытты жана топту тандоо" },
    description: {
      ru: "Подбираем направление под цели и уровень подготовки ребёнка.",
      ky: "Баланын максатына жана даярдык деңгээлине жараша багыт тандайбыз.",
    },
    color: "#0099FF",
  },
  {
    number: "02",
    icon: PlayCircle,
    title: { ru: "Стартовая тренировка", ky: "Баштапкы машыгуу" },
    description: {
      ru: "Ребёнок знакомится с залом, тренером и форматом занятий.",
      ky: "Бала зал, машыктыруучу жана сабак форматы менен таанышат.",
    },
    color: "#ED3D4E",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: { ru: "Обратная связь от тренера", ky: "Машыктыруучудан пикир" },
    description: {
      ru: "Вы получаете детальный отзыв о первом занятии и рекомендации.",
      ky: "Биринчи сабак боюнча толук пикир жана сунуштар берилет.",
    },
    color: "#8B5CF6",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: { ru: "Адаптация и прогресс", ky: "Ыңгайлашуу жана өсүү" },
    description: {
      ru: "Ребёнок постепенно привыкает к режиму и тренировкам.",
      ky: "Бала акырындык менен тартипке жана машыгууга көнөт.",
    },
    color: "#0A2463",
  },
]

const sectionText = {
  ru: {
    badge: "Простой старт",
    titleStart: "Первые шаги ребёнка в",
    titleHighlight: "UNIQUM SPORT",
    bottomTitle: "Если ребёнку не понравится",
    bottomDescription: "Можно попробовать другое направление или сменить группу",
    cta: "Начать со стартовой тренировки",
  },
  ky: {
    badge: "Жөнөкөй башталыш",
    titleStart: "Баланын алгачкы кадамдары",
    titleHighlight: "UNIQUM SPORT'та",
    bottomTitle: "Эгер балага жакпай калса",
    bottomDescription: "Башка багытты сынап көрүүгө же топту алмаштырууга болот",
    cta: "Баштапкы машыгуу менен баштоо",
  },
} as const

export default function HowItWorksSection() {
  const ref = useScrollReveal()
  const { lang } = useLanguage()
  const t = sectionText[lang]

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0099FF]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ED3D4E]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="reveal-item inline-block bg-[#0099FF]/10 text-[#0099FF] px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            {t.badge}
          </span>
          <h2 className="reveal-item text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2463] mb-6 text-balance">
            {t.titleStart} <span className="text-[#ED3D4E]">{t.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {steps.map((step, index) => (
            <div key={index} className="reveal-item relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-gray-200 to-transparent pointer-events-none" />
              )}
              <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div
                  className="absolute -top-4 -left-4 w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-lg"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>
                <div className="pt-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${step.color}18` }}>
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <h3 className="text-base font-bold text-[#0A2463] mb-2">{step.title[lang]}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal-item bg-white rounded-3xl p-8 md:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-8 h-8 text-[#0A2463]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0A2463] mb-1">{t.bottomTitle}</h3>
                <p className="text-gray-500">{t.bottomDescription}</p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-[#0A2463] text-white hover:bg-[#0A2463]/90 font-black rounded-full px-8 py-6 text-base group whitespace-nowrap shadow-lg"
              onClick={openWhatsApp}
            >
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
