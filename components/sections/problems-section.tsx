"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

const problems = [
  {
    image: "/images/Cartoonypics/smartphone.png",
    title: { ru: "Зависимость от гаджетов", ky: "Гаджетке көз карандылык" },
    description: { ru: "Телефон заменяет движение и активность", ky: "Телефон кыймылды жана активдүүлүктү алмаштырат" },
    color: "#ED3D4E",
  },
  {
    image: "/images/Cartoonypics/bored.png",
    title: { ru: "Малоподвижный образ жизни", ky: "Кыймылы аз жашоо образы" },
    description: { ru: "Недостаток физической нагрузки каждый день", ky: "Күн сайын физикалык жүктөм жетишпейт" },
    color: "#0099FF",
  },
  {
    image: "/images/Cartoonypics/undisciplined.png",
    title: { ru: "Отсутствие дисциплины", ky: "Тартиптин жоктугу" },
    description: { ru: "Сложно соблюдать режим и правила", ky: "Тартипти жана эрежени кармануу кыйын" },
    color: "#8B5CF6",
  },
  {
    image: "/images/Cartoonypics/overweight.png",
    title: { ru: "Проблемы с весом и осанкой", ky: "Салмак жана келбет көйгөйү" },
    description: { ru: "Последствия отсутствия движения", ky: "Кыймылдын жетишсиздигинин кесепети" },
    color: "#ED3D4E",
  },
  {
    image: "/images/Cartoonypics/stressed.png",
    title: { ru: "Низкая стрессоустойчивость", ky: "Стресске туруктуулук төмөн" },
    description: { ru: "Трудно справляться с нагрузками и эмоциями", ky: "Жүктөм жана эмоция менен күрөшүү кыйын" },
    color: "#0099FF",
  },
  {
    image: "/images/Cartoonypics/sick.png",
    title: { ru: "Низкий иммунитет", ky: "Иммунитет алсыз" },
    description: { ru: "Постоянные болезни и простуды", ky: "Оору жана суук тийүү бат-бат кайталанат" },
    color: "#8B5CF6",
  },
]

const cardThemes = [
  "from-[#FFE66D] to-[#FFD166]",
  "from-[#86E7FF] to-[#5CC8FF]",
  "from-[#FFC6EA] to-[#FF9ACB]",
  "from-[#B6F8C9] to-[#7DE2A8]",
  "from-[#D8C1FF] to-[#B090FF]",
  "from-[#FFCEAE] to-[#FFA86A]",
]

const sectionText = {
  ru: {
    badge: "Знакомые проблемы?",
    title: "Если ваши дети сталкиваются с этими проблемами",
    description:
      "Современные дети всё меньше двигаются — и это сказывается на их здоровье и развитии:",
  },
  ky: {
    badge: "Бул көйгөйлөр таанышпы?",
    title: "Эгер балаңыз ушул көйгөйлөргө туш болуп жатса",
    description: "Азыркы балдар аз кыймылдайт, бул алардын ден соолугуна жана өнүгүүсүнө таасир берет",
  },
} as const

export default function ProblemsSection() {
  const ref = useScrollReveal()
  const { lang } = useLanguage()
  const t = sectionText[lang]

  return (
    <section ref={ref} className="relative -mt-px py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative flex items-center justify-center mb-16 md:mb-20 min-h-[250px]">
          <div className="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] z-0 pointer-events-none hidden sm:block">
             <Image src="/images/Cartoonypics/confident.png" alt="Confident Boy" fill sizes="448px" className="object-contain" />
          </div>
          <div className="text-center relative z-10 max-w-3xl lg:max-w-4xl mx-auto px-4">
            <span className="inline-block bg-[#ED3D4E]/10 text-[#ED3D4E] px-4 py-1.5 rounded-full text-sm font-bold mb-5 shadow-sm">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2463] mb-6 leading-tight text-balance mx-auto">
              {t.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl p-6 border-4 border-white bg-gradient-to-br ${
                cardThemes[index % cardThemes.length]
              } shadow-[0_10px_0_0_rgba(10,36,99,0.15)] hover:-translate-y-1 hover:shadow-[0_14px_0_0_rgba(10,36,99,0.2)] transition-all cursor-default`}
            >
              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white/80 border-2 border-white pointer-events-none" />
              
              <div className="absolute -right-4 -bottom-4 w-32 h-32 md:w-40 md:h-40 pointer-events-none transition-transform group-hover:scale-105 z-0">
                <Image src={problem.image} alt={problem.title[lang]} fill sizes="(max-width: 768px) 150px, 200px" className="object-contain drop-shadow-xl" />
              </div>
              
              <div className="relative z-10 pr-20 md:pr-24">
                <h3 className="text-xl font-bold text-[#0A2463] mb-2">{problem.title[lang]}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{problem.description[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
