"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { openWhatsApp } from "@/lib/contacts"
import Image from "next/image"

const directions = [
  {
    id: "lfk",
    title: { ru: "ЛФК", ky: "ДФК" },
    description: {
      ru: "Здоровая спина и стопа. Коррекция осанки, перекоса таза, вальгуса и плоскостопия.",
      ky: "Дени сак бел жана таман. Келбетти, жамбаш кыйшайышын, вальгусту жана жалпак таманды оңдоо.",
    },
    ages: { ru: "5–17 лет", ky: "5–17 жаш" },
    bgGradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
    image: "/images/sem03898.jpg",
    features: {
      ru: ["Здоровая спина и стопа", "Коррекция осанки", "Коррекция перекоса таза, вальгуса и плоскостопия"],
      ky: ["Дени сак бел жана таман", "Келбетти оңдоо", "Жамбаш, вальгус жана жалпак таманды оңдоо"],
    },
    textDark: false,
    silhouette: "/images/silhouette-gymnast.avif",
    silhouetteClass: "right-0 bottom-0 w-32 h-32",
    silhouetteMobileClass: "right-2 bottom-2 w-40 h-40",
  },
  {
    id: "gymnastics",
    title: { ru: "Гимнастика", ky: "Гимнастика" },
    description: {
      ru: "Развиваем гибкость, координацию и силу. Подходит для детей любого уровня подготовки.",
      ky: "Ийкемдүүлүк, координация жана күчтү өнүктүрөбүз. Ар кандай деңгээлдеги балдарга ылайыктуу.",
    },
    ages: { ru: "6–17 лет", ky: "6–17 жаш" },
    bgGradient: "linear-gradient(135deg, #0099FF 0%, #0066CC 100%)",
    image: "/images/img_9514.jpg",
    features: {
      ru: ["Акробатика", "Аэробная гимнастика", "Спортивная гимнастика", "Эстетическая гимнастика"],
      ky: ["Акробатика", "Аэробдук гимнастика", "Спорттук гимнастика", "Эстетикалык гимнастика"],
    },
    textDark: false,
    silhouette: "/images/silhouette-development.jpg",
    silhouetteClass: "right-0 bottom-0 w-32 h-32 -scale-x-100",
    silhouetteMobileClass: "right-2 bottom-2 w-40 h-40 -scale-x-100",
  },
  {
    id: "martial-arts",
    title: { ru: "Единоборства", ky: "Мушташ түрлөрү" },
    description: {
      ru: "Дзюдо и тхэквондо для развития дисциплины, уверенности и самозащиты.",
      ky: "Дзюдо жана тхэквондо тартипти, ишенимди жана өзүн коргоону өнүктүрөт.",
    },
    ages: { ru: "6–17 лет", ky: "6–17 жаш" },
    bgGradient: "linear-gradient(135deg, #ED3D4E 0%, #c41c2e 100%)",
    image: "/images/dsc_7373.jpg",
    features: {
      ru: ["Дзюдо", "Тхэквондо ITF", "Бокс"],
      ky: ["Дзюдо", "Тхэквондо ITF", "Бокс"],
    },
    textDark: false,
    silhouette: "/images/silhouette-karate.jpg",
    silhouetteClass: "right-0 bottom-0 w-32 h-32",
    silhouetteMobileClass: "right-2 bottom-2 w-40 h-40",
  },
  {
    id: "developmental",
    title: { ru: "Развивающая гимнастика", ky: "Өнүктүрүүчү гимнастика" },
    description: {
      ru: "Для самых маленьких — первые шаги в спорте в игровой форме.",
      ky: "Эң кичинекейлер үчүн оюн аркылуу спорттогу алгачкы кадамдар.",
    },
    ages: { ru: "от 3,5 лет", ky: "3,5 жаштан" },
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 100%)",
    image: "/images/sem03898.jpg",
    features: {
      ru: ["Игровая форма", "Развитие моторики", "Подготовка к спорту"],
      ky: ["Оюн форматы", "Моториканы өнүктүрүү", "Спортко даярдоо"],
    },
    textDark: true,
    silhouette: "/images/silhouette-gymnastics.png",
    silhouetteClass: "right-0 bottom-0 w-32 h-32",
    silhouetteMobileClass: "right-2 bottom-2 w-40 h-40",
  },
]

const sectionText = {
  ru: {
    badge: "Все направления в одном месте",
    title: "Мы собрали ключевые направления для вашего ребёнка",
    description:
      "Направление и группу подбираем по возрасту и уровню подготовки — для здоровья или для спортивного роста",
    cta: "Подобрать идеальную секцию для ребёнка",
    prev: "Предыдущее направление",
    next: "Следующее направление",
    item: "Направление",
  },
  ky: {
    badge: "Бардык багыттар бир жерде",
    title: "Балаңыз үчүн негизги багыттарды чогулттук",
    description:
      "Багытты жана топту жашына, даярдык деңгээлине жараша тандайбыз — ден соолук же спорттук өсүш үчүн",
    cta: "Балаңызга ылайыктуу секцияны тандоо",
    prev: "Мурунку багыт",
    next: "Кийинки багыт",
    item: "Багыт",
  },
} as const

export default function DirectionsSection() {
  const ref = useScrollReveal()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { lang } = useLanguage()
  const t = sectionText[lang]

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % directions.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + directions.length) % directions.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % directions.length)
  }

  const current = directions[activeIndex]

  return (
    <section id="directions" ref={ref} className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-center mb-16 md:mb-20 min-h-[250px]">
          <div className="absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 w-40 h-40 md:w-60 md:h-60 lg:w-72 lg:h-72 z-0 pointer-events-none hidden sm:block">
             <Image src="/images/Cartoonypics/judo.png" alt="Judo Kids" fill sizes="288px" className="object-contain opacity-95" />
          </div>
          <div className="text-center relative z-10 max-w-3xl lg:max-w-4xl mx-auto px-4">
            <span className="inline-block bg-[#0A2463]/10 text-[#0A2463] px-4 py-1.5 rounded-full text-sm font-bold mb-5 shadow-sm">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2463] mb-6 text-balance mx-auto drop-shadow-sm">
              {t.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
              {t.description}
            </p>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {directions.map((dir, index) => (
            <button
              key={dir.id}
              onClick={() => {
                setActiveIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`reveal-item relative overflow-hidden rounded-3xl p-6 text-left cursor-pointer transition-all duration-300 border border-[#0A2463]/15 bg-white ${
                activeIndex === index ? "ring-2 ring-[#0A2463] -translate-y-0.5 shadow-xl" : "hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div
                className={`pointer-events-none absolute bg-contain bg-no-repeat opacity-[0.15] ${dir.silhouetteClass}`}
                style={{ backgroundImage: `url('${dir.silhouette}')`, filter: "contrast(1.15)" }}
              />
              <div>
                <h3 className="text-xl font-black mb-1 text-[#0A2463]">{dir.title[lang]}</h3>
                <p className="text-sm font-semibold mb-3 text-[#0A2463]/70">{dir.ages[lang]}</p>
                <div className="flex flex-wrap gap-1.5">
                  {dir.features[lang].map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#0A2463]/10 text-[#0A2463]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="md:hidden mb-8">
          <div className="reveal-item relative overflow-hidden rounded-3xl p-8 min-h-[360px] border border-[#0A2463]/15 bg-white shadow-sm">
            <div
              className={`pointer-events-none absolute bg-contain bg-no-repeat opacity-[0.15] ${current.silhouetteMobileClass}`}
              style={{ backgroundImage: `url('${current.silhouette}')`, filter: "contrast(1.15)" }}
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-2 text-[#0A2463]">{current.title[lang]}</h3>
              <p className="text-base font-semibold mb-2 text-[#0A2463]/75">{current.ages[lang]}</p>
              <p className="mb-6 leading-relaxed text-[#0A2463]/90">{current.description[lang]}</p>
              <div className="flex flex-wrap gap-2">
                {current.features[lang].map((feature, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1.5 rounded-full font-medium bg-[#0A2463]/10 text-[#0A2463]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-[#0A2463] text-white flex items-center justify-center hover:bg-[#0A2463]/80 transition-colors"
              aria-label={t.prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {directions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-[#0A2463] w-8" : "bg-[#0A2463]/25 w-2.5"
                  }`}
                  aria-label={`${t.item} ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#0A2463] text-white flex items-center justify-center hover:bg-[#0A2463]/80 transition-colors"
              aria-label={t.next}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="reveal-item text-center mt-4 px-1">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-[#0A2463] text-white hover:bg-[#0A2463]/90 font-black rounded-full px-6 sm:px-8 py-4 sm:py-6 h-auto whitespace-normal text-center leading-tight text-sm sm:text-base group shadow-lg"
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
