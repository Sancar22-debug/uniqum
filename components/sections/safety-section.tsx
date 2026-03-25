"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import { Shield, Award, Heart, Stethoscope, Check } from "lucide-react"
import Image from "next/image"

const features = [
  { icon: Shield, title: { ru: "Просторный и хорошо вентилируемый зал", ky: "Кең жана жакшы желдетилген зал" } },
  { icon: Award, title: { ru: "Профессиональное безопасное и гипоаллергенное спортивное оборудование Fighttech • АКРОСПОРТ • TaiShan", ky: "Кесипкөй коопсуз жана гипоаллерген спорттук жабдык Fighttech • АКРОСПОРТ • TaiShan" } },
  { icon: Heart, title: { ru: "Тренеры регулярно проходят обучение и повышение квалификации", ky: "Машыктыруучулар дайыма окуудан өтүп, квалификациясын жогорулатат" } },
  { icon: Stethoscope, title: { ru: "Медсестра для оказания первой доврачебной помощи при необходимости", ky: "Зарыл учурда биринчи жардам көрсөтүү үчүн медайым" } },
]

const sectionText = {
  ru: {
    badge: "Безопасность и профессионализм",
    titleStart: "Безопасные и комфортные",
    titleHighlight: "условия для вашего ребёнка",
    cardTitle: "Дети — в безопасности",
  },
  ky: {
    badge: "Коопсуздук жана кесипкөйлүк",
    titleStart: "Балаңыз үчүн коопсуз жана",
    titleHighlight: "ыңгайлуу шарттар",
    cardTitle: "Балдар — коопсуздукта",
  },
} as const

export default function SafetySection() {
  const ref = useScrollReveal()
  const { lang } = useLanguage()
  const t = sectionText[lang]

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0A2463]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 text-balance">
              {t.titleStart} <span className="text-white">{t.titleHighlight}</span>
            </h2>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-white/40 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#0A2463]" />
                  </div>
                  <span className="font-semibold">{feature.title[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full mt-10 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="space-y-3 lg:space-y-4 pt-6 lg:pt-10 relative z-10">
                <div className="relative h-[160px] sm:h-[220px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image src="/images/Gym Pictures/DSC_6919.jpg" alt="Просторный зал Uniqum Sport" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                </div>
                <div className="relative h-[200px] sm:h-[260px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image src="/images/Gym Pictures/IMG_5528.jpg" alt="Оборудование" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                </div>
              </div>
              <div className="space-y-3 lg:space-y-4 -mt-4 lg:-mt-6">
                <div className="relative h-[220px] sm:h-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image src="/images/Gym Pictures/IMG_9514 2.jpg" alt="Инвентарь" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                </div>
                <div className="relative h-[140px] sm:h-[200px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image src="/images/Gym Pictures/IMG_9526 4 (1).jpg" alt="Безопасное покрытие" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
