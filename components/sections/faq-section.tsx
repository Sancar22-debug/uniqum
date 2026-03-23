"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

const faqs = [
  {
    question: {
      ru: "С какого возраста принимаете детей?",
      ky: "Балдарды канча жаштан кабыл аласыздар?",
    },
    answer: {
      ru: "С 3,5 лет — есть направления для малышей и подростков. Развивающая гимнастика подходит для самых маленьких, а спортивные секции — для детей от 6 лет.",
      ky: "3,5 жаштан баштап кабыл алабыз. Кичинекейлер үчүн өнүктүрүүчү гимнастика, ал эми 6 жаштан баштап спорттук секциялар бар.",
    },
  },
  {
    question: {
      ru: "Можно ли водить нескольких детей одновременно?",
      ky: "Бир убакта бир нече баланы алып келсе болобу?",
    },
    answer: {
      ru: "Да. Можно водить детей на разные секции в одно и то же время. Наше расписание позволяет оптимизировать время для всей семьи.",
      ky: "Ооба. Балдарды ар башка секцияга бир убакта алып келүүгө болот. Расписание үй-бүлөнүн убактысына ыңгайлашат.",
    },
  },
  {
    question: {
      ru: "Сколько человек в группе?",
      ky: "Топто канча бала болот?",
    },
    answer: {
      ru: "Небольшие группы — тренер уделяет внимание каждому ребёнку.",
      ky: "Топтор чакан болот, машыктыруучу ар бир балага көңүл бурат.",
    },
  },
  {
    question: {
      ru: "Что нужно взять на первое занятие?",
      ky: "Биринчи сабакка эмне алып келүү керек?",
    },
    answer: {
      ru: "Удобную спортивную одежду, сменную чистую обувь и бутылку для воды. Для некоторых направлений может понадобиться специальная форма — об этом расскажем после записи.",
      ky: "Ыңгайлуу спорт кийим, алмаштыруучу таза бут кийим жана суу бөтөлкө. Айрым багыттарга атайын форма керек болушу мүмкүн — жазылгандан кийин айтабыз.",
    },
  },
  {
    question: {
      ru: "В какое время проходят тренировки?",
      ky: "Машыгуулар кайсы убакта өтөт?",
    },
    answer: {
      ru: "Тренировки проходят в удобное для вас время: утром, днём, вечером и в выходные. Подберём оптимальное расписание.",
      ky: "Машыгуулар сизге ыңгайлуу убакта өтөт: эртең менен, күндүз, кечинде жана дем алыш күндөрү. Ыңгайлуу график тандайбыз.",
    },
  },
  {
    question: {
      ru: "Как записаться на стартовое занятие?",
      ky: "Сыноо сабагына кантип жазылса болот?",
    },
    answer: {
      ru: "Оставьте заявку на сайте или позвоните нам. Мы свяжемся с вами, подберём подходящее направление и время для первой тренировки.",
      ky: "Сайтка арыз калтырыңыз же бизге чалыңыз. Биз байланышып, биринчи машыгууга ылайыктуу багыт менен убакытты тандайбыз.",
    },
  },
]

const sectionText = {
  ru: {
    title: "Ответы на частые вопросы",
  },
  ky: {
    title: "Көп берилген суроолорго жооптор",
  },
} as const

export default function FAQSection() {
  const ref = useScrollReveal()
  const { lang } = useLanguage()
  const t = sectionText[lang]

  return (
    <section id="faq" ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="absolute left-0 lg:-left-2 xl:left-8 top-1/2 -translate-y-1/2 w-56 h-[30rem] md:w-80 md:h-[40rem] lg:w-[26rem] lg:h-[50rem] z-0 pointer-events-none hidden md:block opacity-90">
           <Image src="/images/Cartoonypics/box.png" alt="Boxer Child" fill sizes="(max-width: 1024px) 320px, 416px" className="object-contain" />
        </div>

        <div className="text-center relative z-10 max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-sm font-bold mb-5 shadow-sm">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2463] mb-6 drop-shadow-sm">{t.title}</h2>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <Accordion type="single" collapsible className="space-y-3 relative z-20">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 rounded-2xl border-none px-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-base font-bold text-[#0A2463] hover:no-underline py-5">
                  {faq.question[lang]}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 text-base leading-relaxed">
                  {faq.answer[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
