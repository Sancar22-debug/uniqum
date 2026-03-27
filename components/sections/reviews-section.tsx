"use client"

import { useLanguage } from "@/components/language-provider"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    name: "Чипенко Анна",
    image: "/images/review/Anna.jpeg",
    subtitle: {
      ru: "3 года с Uniqum Sport",
      ky: "Uniqum Sport менен 3 жыл"
    },
    text: {
      ru: "Хочу выразить огромную Благодарна Уникуму- за то,что он дает моим детям такие положительные эмоции, за тренеров-каждый из которых является для моего ребенка авторитетом и другом,за новых друзей-с которыми мой ребенок общается даже за пределами комплекса,за огромный вклад в здоровье моего ребенка-мы действительно меньше болеем,за атмосферу,которая царит в зале!!!! Спасибо Уникум за то,что ты рядом с нами!!!!",
      ky: "Уникумга чоң ыраазычылыгымды билдиргим келет - балдарыма ушундай позитивдүү эмоцияларды тартуулаганы үчүн, ар бири менин балама дос жана авторитет болгон машыктыруучулар үчүн, комплекстин сыртында да баарлашкан жаңы достору үчүн, баламдын ден соолугуна кошкон зор салымы үчүн - биз чындап эле аз ооруп калдык, залдагы сонун атмосфера үчүн!!!! Биз менен болгонуң үчүн рахмат Уникум!!!!"
    }
  },
  {
    name: "Анара",
    image: "/images/review/Anara.jpeg",
    subtitle: {
      ru: "родитель Уникумов",
      ky: "Уникумдардын ата-энеси"
    },
    text: {
      ru: "Уникум Спорт — смело могу сказать, что это ключ к большим возможностям для будущего моих детей. Наряду со здоровьем, здесь учат добиваться успеха и достигать поставленных целей.",
      ky: "Уникум Спорт — балдарымдын келечеги үчүн эң чоң мүмкүнчүлүктөрдүн ачкычы десем жаңылышпайм. Ден соолук менен бирге, ийгиликке жетүүнү, максатка жетүүнү үйрөтүп жатат десем болот."
    }
  },
  {
    name: "Ольга",
    image: "/images/review/Olga.jpeg",
    subtitle: {
      ru: "мама Уникума",
      ky: "Уникумдун апасы"
    },
    text: {
      ru: "Моя дочь уже три года ходит в спортивный комплекс Уникум. Это действительно место, куда дети идут с радостью. Здесь развивают физическую форму,воспитывают дисциплину, уверенность в себе и командный дух. Отдельное спасибо тренерам — они настоящие профессионалы своего дела! Всегда внимательные, терпеливые и умеют найти подход к каждому ребёнку. Мой ребёнок с удовольствием ходит на тренировки и делится своими успехами. Также хочется отметить отличные условия: чистота, безопасность и современное оборудование создают комфортную атмосферу.",
      ky: "Кызым үч жылдан бери Уникум спорт комплексине барат. Бул чынында эле балдар кубаныч менен бара турган жер. Бул жерде алар физикалык формасын өнүктүрүп, тартипке, өзүнө ишенүүгө жана командалык рухка тарбиялашат. Машыктыруучуларга өзгөчө рахмат – алар өз ишинин чыныгы адистери! Ар дайым кунт коюп, сабырдуу жана ар бир балага мамиле таба билишет. Балам машыгууларга ырахаттануу менен барып, ийгиликтери менен бөлүшөт. Ошондой эле эң сонун шарттарды белгилей кетким келет: тазалык, коопсуздук жана заманбап жабдуулар ыңгайлуу атмосфераны түзөт."
    }
  }
]

export default function ReviewsSection() {
  const { lang } = useLanguage()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="py-20 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ED3D4E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2463] mb-5 text-balance">
            {lang === 'ru' ? 'Отзывы наших клиентов' : 'Биздин кардарлардын сын-пикирлери'}
          </h2>
          <p className="text-gray-500 text-lg">
            {lang === 'ru' ? 'Что говорят родители о наших тренировках' : 'Биздин машыгуулар жөнүндө ата-энелер эмне дешет'}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
            <div className="flex -ml-4">
              {reviews.map((review, index) => (
                <div className="flex-none pl-4 min-w-[280px] w-full sm:w-[80%] md:w-1/2 lg:w-1/3" key={index}>
                  <div className="h-full bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col relative group hover:-translate-y-1 transition-transform duration-300">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100 rotate-180" />

                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border-2 border-[#ED3D4E]/20">
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0A2463] leading-tight">{review.name}</h3>
                        <p className="text-[#ED3D4E] text-sm font-medium mt-1">{review.subtitle[lang]}</p>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed italic">
                        "{review.text[lang]}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="hidden sm:flex absolute -left-8 lg:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-[#0A2463] hover:bg-gray-50 z-10 transition-transform hover:scale-105 border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="hidden sm:flex absolute -right-8 lg:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-[#0A2463] hover:bg-gray-50 z-10 transition-transform hover:scale-105 border border-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
