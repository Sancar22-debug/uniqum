"use client"

import { useLanguage } from "@/components/language-provider"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const trainers = [
  {
    name: "Питаев Тимур",
    image: "/images/trainers/Тимур.jpg",
    title: { ru: "Тренер по спортивной гимнастике", ky: "Спорттук гимнастика боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта КР. Тренер сборной КР. Лучший спортсмен КР 2021 года. Призёр международных соревнований и многократный чемпион КР. 17 лет тренировочного стажа и 5 лет стажа работы с детьми.",
      ky: "КР Спорт чебери. КР курама командасынын машыктыруучусу. 2021-жылдын мыкты спортчусу. Көп жолку КР чемпиону. 17 жылдык машыгуу жана 5 жылдык балдар менен иштөө тажрыйбасы."
    }
  },
  {
    name: "Игнатенко Юлия",
    image: "/images/trainers/Юлия.jpg",
    title: { ru: "Тренер по развивающей гимнастике", ky: "Өнүктүрүүчү гимнастика боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта по лёгкой атлетике. Серебряный призёр Чемпионата Азии. Шестикратная победительница Универсиады КР. Победительница международных соревнований. Опыт более 14 лет.",
      ky: "Жеңил атлетика боюнча спорт чебери. Азия чемпионатынын күмүш байге ээси. КР Универсиадасынын 6 жолку жеңүүчүсү. 14 жылдан ашык тажрыйба."
    }
  },
  {
    name: "Воробьева Светлана",
    image: "/images/trainers/Светлана.JPG",
    title: { ru: "Тренер по эстетической гимнастике", ky: "Эстетикалык гимнастика боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта международного класса. Финалистка Чемпионата Азии. Бронзовый призер Чемпионата мира по эстетической гимнастике. Тренировочный стаж – 12 лет.",
      ky: "Эл аралык класстагы спорт чебери. Азия чемпионатынын финалисти. Дүйнө чемпионатынын коло байге ээси. 12 жылдык тажрыйба."
    }
  },
  {
    name: "Абдыкаров Акжол",
    image: "/images/trainers/Акжол.JPG",
    title: { ru: "Тренер по дзюдо", ky: "Дзюдо боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта КР по дзюдо. Обладатель синего пояса по джиу-джитсу. Чемпион и призер международных турниров.",
      ky: "Дзюдо боюнча КР спорт чебери. Джиу-джитсу боюнча көк кур ээси. Эл аралык турнирлердин чемпиону."
    }
  },
  {
    name: "Иличбек уулу Нурсалим",
    image: "/images/trainers/Нурсалим.jpg",
    title: { ru: "Тренер по дзюдо", ky: "Дзюдо боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта КР и чемпион КР по дзюдо. Серебряный призер Чемпионата Азии по дзюдо. Персональный тренер.",
      ky: "Дзюдо боюнча КР спорт чебери жана чемпиону. Азия чемпионатынын күмүш байге ээси."
    }
  },
  {
    name: "Шевченко Борис",
    image: "/images/trainers/Шевченко Борис.JPG",
    title: { ru: "Тренер по акробатике и разв. гимнастике", ky: "Акробатика жана өнүктүрүү гимнастикасы машыктыруучусу" },
    description: {
      ru: "Многократный чемпион Кыргызской Республики. Призёр международных соревнований. Мастер спорта КР. Опыт работы: 3 года.",
      ky: "Кыргыз Республикасынын көп жолку чемпиону. Эл аралык мелдештердин байге ээси. КР спорт чебери. Тажрыйбасы: 3 жыл."
    }
  },
  {
    name: "Тахиржан уулу Файзулла",
    image: "/images/trainers/Файзулла.jpg",
    title: { ru: "Тренер по тхэквондо", ky: "Тхэквондо боюнча машыктыруучу" },
    description: {
      ru: "Кандидат в мастера спорта КР. 2-кратный чемпион Кыргызстана и Казахстана. Обладатель черного пояса, 3 дан.",
      ky: "Тхэквондо боюнча КМС. Кыргызстандын жана Казакстандын 2 жолку чемпиону. Кара кур ээси, 3 дан."
    }
  },
  {
    name: "Сторожевых Артур",
    image: "/images/trainers/Артур.png",
    title: { ru: "Тренер по тхэквондо ITF", ky: "Тхэквондо ITF боюнча машыктыруучу" },
    description: {
      ru: "КМС по тхэквондо ITF. Многократный чемпион КР. Призёр чемпионата и Кубка Азии. Чемпион США по кикбоксингу.",
      ky: "Тхэквондо ITF боюнча КМС. КР көп жолку чемпиону. Азия кубогунун байге ээси. Кикбоксинг боюнча АКШ чемпиону."
    }
  },
  {
    name: "Дюшеналиев Адилет",
    image: "/images/trainers/Адилет.jpg",
    title: { ru: "Тренер по боксу", ky: "Бокс боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта по кикбоксингу, КМС по боксу. 3-кратный чемпион КР по кикбоксингу. Чемпион турнира Uzbekistan Open. Призер Кубка Мира.",
      ky: "Кикбоксинг боюнча спорт чебери, бокс боюнча КМС. КР 3 жолку чемпиону. Дүйнө кубогунун байге ээси."
    }
  },
  {
    name: "Ференц Ирина",
    image: "/images/trainers/Ирина.jpg",
    title: { ru: "Тренер по аэробной гимнастике", ky: "Аэробдук гимнастика боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта СССР. 30 лет педагогического и тренерского опыта. Подготовила 5 мастеров спорта КР.",
      ky: "СССР спорт чебери. 30 жылдык педагогикалык жана машыктыруучулук тажрыйба. 5 КР спорт чеберин даярдаган."
    }
  },
  {
    name: "Чотонова Евгения",
    image: "/images/trainers/Евгения Чотонова.JPG",
    title: { ru: "Тренер по АФК", ky: "АФК боюнча машыктыруучу" },
    description: {
      ru: "Тренер для детей с особенностями развития. Специалист по сенсорной интеграции. Стаж работы более 20 лет.",
      ky: "Өнүгүүсү өзгөчө балдар үчүн машыктыруучу. Сенсордук интеграция адиси. Иш тажрыйбасы 20 жылдан ашык."
    }
  },
  {
    name: "Эсеналиев Марат",
    image: "/images/trainers/Марат.jpg",
    title: { ru: "Тренер по спортивной гимнастике", ky: "Спорттук гимнастика боюнча машыктыруучу" },
    description: {
      ru: "Опыт работы с детьми: 13 лет. Спортивный разряд. Воспитанники — участники и призеры международных турниров.",
      ky: "Балдар менен иштөө тажрыйбасы: 13 жыл. Спорттук разряд. Окуучулары — эл аралык турнирлердин катышуучулары."
    }
  },
  {
    name: "Ботанбаева Рамина",
    image: "/images/trainers/Рамина.jpg",
    title: { ru: "Тренер по эстетической гимнастике", ky: "Эстетикалык гимнастика боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта КР по художественной гимнастике. Абсолютный серебряный призёр соревнований 2020 года. Стаж 6 лет.",
      ky: "Көркөм гимнастика боюнча КР спорт чебери. 2020-жылкы мелдештердин күмүш байге ээси. Тажрыйбасы 6 жыл."
    }
  },
  {
    name: "Ткачук Эмиль",
    image: "/images/trainers/Эмиль.PNG",
    title: { ru: "Тренер по спортивной гимнастике", ky: "Спорттук гимнастика боюнча машыктыруучу" },
    description: {
      ru: "Многократный чемпион Кыргызской Республики. Серебряный призёр турнира в Казахстане. Стаж 14 лет.",
      ky: "Кыргыз Республикасынын көп жолку чемпиону. Казакстандагы турнирдин күмүш байге ээси. Тажрыйбасы 14 жыл."
    }
  },
  {
    name: "Абдигалиев Мадияр",
    image: "/images/trainers/Мадияр.png",
    title: { ru: "Тренер по дзюдо", ky: "Дзюдо боюнча машыктыруучу" },
    description: {
      ru: "Мастер спорта. Многократный чемпион и призёр РК. Тренировочный стаж 10 лет, стаж тренерства 5 лет.",
      ky: "Спорт чебери. РК көп жолку чемпиону. Машыгуу тажрыйбасы 10 жыл, машыктыруучулук 5 жыл."
    }
  },
  {
    name: "Таюрская Палина",
    image: "/images/trainers/Палина.JPG",
    title: { ru: "Тренер по ОФП", ky: "ОФП боюнча машыктыруучу" },
    description: {
      ru: "Кандидат в мастера спорта по акробатике. Опыт работы с детьми: 3 года. Образование: КГАФКиС.",
      ky: "Акробатика боюнча спорт чеберлигине талапкер. Балдар менен иштөө тажрыйбасы: 3 жыл. Билими: КМДТКА."
    }
  },
  {
    name: "Грицак Жанна",
    image: "/images/trainers/Жанна.jpg",
    title: { ru: "Тренер по развивающей гимнастике", ky: "Өнүктүрүү гимнастикасы боюнча машыктыруучу" },
    description: {
      ru: "1 взрослый разряд по спортивной гимнастике. Тренировочный стаж более 10 лет. Стаж тренерства: 4 года.",
      ky: "Спорттук гимнастика боюнча 1-чоңдор разряды. Машыгуу тажрыйбасы 10 жылдан ашык. Машыктыруучулук 4 жыл."
    }
  }
]

export default function TrainersSection() {
  const { lang } = useLanguage()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
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
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0099FF]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2463] mb-5 text-balance">
            {lang === 'ru' ? 'С детьми работает лучшая команда профессиональных тренеров Uniqum Sport' : 'Uniqum Sport\'тун мыкты кесипкөй машыктыруучулар командасы балдар менен иштейт'}
          </h2>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
            <div className="flex -ml-4">
              {trainers.map((trainer, index) => (
                <div className="flex-none pl-4 min-w-[220px] w-[75%] sm:w-1/2 md:w-1/3 lg:w-1/4" key={index}>
                  <div className="h-full bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group">
                    <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-gray-100">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-[center_20%] md:object-top"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-3 sm:bottom-4 left-4 right-4">
                        <h3 className="text-xl font-black text-white mb-1">{trainer.name}</h3>
                        <p className="text-white/90 text-sm font-bold">{trainer.title[lang]}</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-white">
                      <p className="text-gray-600 text-sm leading-relaxed">{trainer.description[lang]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-[#0A2463] hover:bg-gray-50 z-10 transition-transform hover:scale-105 border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-[#0A2463] hover:bg-gray-50 z-10 transition-transform hover:scale-105 border border-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
