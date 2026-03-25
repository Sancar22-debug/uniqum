"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, Users, Target, Heart } from "lucide-react"
import Image from "next/image"
import { openWhatsApp } from "@/lib/contacts"

const results = [
  {
    icon: BookOpen, color: "#3B82F6",
    title: { ru: "Лучше учится в школе", ky: "Мектепте жакшы окуйт" },
    description: { ru: "Повышается концентрация и усидчивость", ky: "Көңүл буруу жана чыдамкайлык жогорулайт" },
  },
  {
    icon: Clock, color: "#EC4899",
    title: { ru: "Привыкает к режиму", ky: "Тартипке көнөт" },
    description: { ru: "Формируется дисциплина и регулярность", ky: "Тартип жана туруктуулук калыптанат" },
  },
  {
    icon: Users, color: "#F43F5E",
    title: { ru: "Получает наставника в лице тренера", ky: "Машыктыруучу насаатчы болот" },
    description: { ru: "Поддержка, авторитет и пример для ребёнка", ky: "Колдоо, үлгү жана авторитет балага багыт берет" },
  },
  {
    icon: Target, color: "#14B8A6",
    title: { ru: "Понимает: Результат = работа", ky: "Жыйынтык = эмгек" },
    description: { ru: "Привычка прикладывать усилия ради цели", ky: "Максат үчүн аракет кылуу адаты пайда болот" },
  },
  {
    icon: Heart, color: "#8B5CF6",
    title: { ru: "Нормализуется сон и аппетит", ky: "Уйку жана табит калыпка келет" },
    description: { ru: "Формируется правильная осанка", ky: "Туура келбет калыптанат" },
  },
]

const sectionText = {
  ru: {
    badge: "Системный результат",
    titleStart: "В UNIQUM SPORT ребёнок получает",
    titleHighlight: "не «просто тренировки»",
    description: "А комплексное развитие, которое видно уже через первые месяцы",
    cta: "Подобрать направление для ребёнка",
  },
  ky: {
    badge: "Системалуу жыйынтык",
    titleStart: "UNIQUM SPORT'та бала алат",
    titleHighlight: "жөн гана машыгууну эмес",
    description: "Алгачкы айларда эле көрүнгөн комплекстүү өнүгүүнү алат",
    cta: "Балаңызга багыт тандоо",
  },
} as const

export default function ResultsSection() {
  const ref = useScrollReveal()
  const { lang } = useLanguage()
  const t = sectionText[lang]

  return (
    <section id="results" ref={ref} className="relative py-20 md:py-24 overflow-x-clip">
      <div className="absolute inset-0 bg-[#0A2463]" />
      <div
        className="absolute top-0 left-0 w-full h-24 bg-white pointer-events-none"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-[#ED3D4E] pointer-events-none"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative flex items-center justify-center mb-16 md:mb-20 min-h-[250px]">
          <div className="text-center relative z-10 max-w-3xl lg:max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-balance drop-shadow-sm">
              {t.titleStart}{" "}
              <span className="text-white underline decoration-white/60 underline-offset-4">{t.titleHighlight}</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>
          <div className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] z-0 pointer-events-none hidden sm:block">
            <Image src="/images/Cartoonypics/acrobatic.png" alt="Acrobatic Child" fill sizes="448px" className="object-contain relative z-10" />
            <Image src="/images/icons/redstar.png" alt="stars" width={64} height={64} className="absolute -top-4 -right-2 rotate-12 z-0 pointer-events-none" unoptimized />
            <Image src="/images/icons/lighting red full.png" alt="lightning" width={56} height={56} className="absolute bottom-8 -left-4 -rotate-12 z-0 pointer-events-none" unoptimized />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((result, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <result.icon className="w-6 h-6" style={{ color: result.color }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{result.title[lang]}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{result.description[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="text-center mt-10 md:mt-12 px-1">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-white text-[#0A2463] hover:bg-gray-100 font-black rounded-full px-6 sm:px-8 py-4 sm:py-6 h-auto whitespace-normal text-center leading-tight text-sm sm:text-base group shadow-xl"
            onClick={openWhatsApp}
          >
            {t.cta}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
