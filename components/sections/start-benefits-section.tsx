"use client"

import { Sparkles, ShieldCheck, CalendarClock } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const sectionText = {
  ru: {
    badge: "Быстрый и безопасный старт",
    title: "Первые шаги в тренировках",
    points: [
      {
        title: "Стартовое занятие",
        description: "Начинаем мягко, без стресса и перегрузки",
      },
      {
        title: "Безопасный старт",
        description: "Внимание тренера и адаптация по уровню",
      },
      {
        title: "Гибкий график",
        description: "Утренние, дневные и вечерние группы",
      },
    ],
  },
  ky: {
    badge: "Жөнөкөй жана коопсуз башталыш",
    title: "Машыгуудагы биринчи кадамдар",
    points: [
      {
        title: "Сыноо сабагы",
        description: "Стресссиз жана ашыкча жүктөмсүз баштайбыз",
      },
      {
        title: "Коопсуз башталыш",
        description: "Машыктыруучунун көзөмөлү жана деңгээлге ылайыктоо",
      },
      {
        title: "Ыңгайлуу график",
        description: "Эртең мененки, күндүзгү жана кечки топтор",
      },
    ],
  },
} as const

const pointIcons = [Sparkles, ShieldCheck, CalendarClock]

export default function StartBenefitsSection() {
  const ref = useScrollReveal()
  const { lang } = useLanguage()
  const t = sectionText[lang]

  return (
    <section ref={ref} className="py-14 md:py-16 bg-[#F3F7FF] relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0A2463]/10 blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="inline-block bg-[#0A2463]/10 text-[#0A2463] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            {t.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2463]">{t.title}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {t.points.map((point, index) => {
            const Icon = pointIcons[index]
            return (
              <div
                key={point.title}
                className="bg-white rounded-2xl border border-[#0A2463]/10 shadow-lg p-5 md:p-6 text-[#0A2463] text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0A2463] text-white flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg mb-1">{point.title}</h3>
                <p className="text-[#0A2463]/75 text-sm leading-relaxed">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
