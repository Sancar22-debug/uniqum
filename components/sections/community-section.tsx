"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy, CalendarClock, Users } from "lucide-react"

import Image from "next/image"
import { openWhatsApp } from "@/lib/contacts"

const text = {
  ru: {
    badge: "Жизнь центра",
    title: "Живой зал, командная атмосфера и видимый прогресс",
    subtitle:
      "Не просто тренировки: дети учатся работать в команде, участвуют в турнирах и растут физически и психологически.",
    stat1Label: "активных секций",
    stat2Label: "соревнований в год",
    stat3Label: "золотых медалей",
    cardTitle: "Подберём удобное время тренировок",
    schedule1: "🌅 Утро\n09:00 – 11:00",
    schedule2: "📚 После школы\n15:00 – 17:00",
    schedule3: "🌆 Вечер\n17:00 – 20:00",
    cardNote: "Группы по выходным",
    cta: "Подобрать удобную группу",
    leftCardTitle: "Первые результаты ребёнка уже через 4–6 недель",
    leftCardText:
      "✔ становится более активным и выносливым\n✔ улучшается аппетит и сон\n✔ появляется дисциплина и режим\n✔ растёт уверенность в себе",
    chip1: "Мини-группы",
    chip2: "Контроль нагрузки",
    chip3: "Регулярная обратная связь",
    miniTitle1: "Турнирный путь",
    miniText1: "Подготовка к стартам и внутренним соревнованиям",
    miniTitle2: "Личная динамика",
    miniText2: "Фиксируем рост навыков и даем рекомендации родителям",
  },
  ky: {
    badge: "Борбордун жашоосу",
    title: "Жандуу зал, командалык атмосфера жана туруктуу өсүү",
    subtitle:
      "Бул жөн гана машыгуу эмес: балдар командада иштөөнү үйрөнөт, мелдештерге катышат жана ар тараптан өсөт.",
    stat1Label: "активдүү секция",
    stat2Label: "жылдык мелдеш",
    stat3Label: "алтын медаль",
    cardTitle: "Тынымсыз ыңгайлуу расписание",
    schedule1: "Дш / Шш / Жм — 09:00-20:00",
    schedule2: "Шб / Бш — 10:00-21:00",
    schedule3: "Иш / Жек — 10:00-18:00",
    cardNote: "Дем алыш күндөрү топтор",
    cta: "Ыңгайлуу топту тандоо",
    leftCardTitle: "Жыйынтык 4-6 жумада байкалат",
    leftCardText:
      "✔ активдүү жана чыдамкай болот\n✔ табити жана уйкусу жакшырат\n✔ тартипке жана режимге үйрөнөт\n✔ өзүнө болгон ишеними артат",
    chip1: "Кичи топтор",
    chip2: "Жүктөм көзөмөлү",
    chip3: "Туруктуу байланышы",
    miniTitle1: "Турнирдик жол",
    miniText1: "Старттарга жана ички мелдештерге даярдык",
    miniTitle2: "Жеке өсүү",
    miniText2: "Көндүмдүн өсүшүн белгилеп, ата-энеге сунуш беребиз",
  },
} as const

export default function CommunitySection() {
  const ref = useScrollReveal()
  const { lang } = useLanguage()
  const t = text[lang]

  function scrollToContact() {
    openWhatsApp()
  }

  return (
    <section ref={ref} className="relative py-20 md:py-24 bg-[#F4F7FB] overflow-x-clip">
      <div className="absolute -top-20 -right-16 w-80 h-80 bg-[#0A2463]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#ED3D4E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative flex items-center justify-center mb-16 md:mb-20 min-h-[250px]">
          <div className="text-center relative z-10 max-w-3xl lg:max-w-4xl mx-auto px-4">
            <span className="inline-block bg-[#0A2463]/10 text-[#0A2463] px-4 py-1.5 rounded-full text-sm font-bold mb-5 shadow-sm">
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#0A2463] mb-6 leading-tight text-balance mx-auto">
              {t.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
          <div className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] z-0 pointer-events-none hidden sm:block">
            <Image src="/images/Cartoonypics/taekwando.png" alt="Taekwondo Girl" fill sizes="448px" className="object-contain relative z-10" />
            <Image src="/images/icons/lighting red full.png" alt="lighting" width={64} height={64} className="absolute top-10 -left-6 -rotate-12 z-0 pointer-events-none" style={{ height: "auto" }} unoptimized />
            <Image src="/images/icons/redstar.png" alt="stars" width={48} height={48} className="absolute bottom-4 -right-2 rotate-[20deg] z-0 pointer-events-none" style={{ height: "auto" }} unoptimized />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 space-y-5">
            <div className="relative pt-9 md:pt-12">
              <Image
                src="/images/hero-child.jpg"
                alt="UNIQUM SPORT athlete"
                width={88}
                height={88}
                sizes="88px"
                className="absolute left-3 md:left-5 -top-3 md:-top-4 z-20 h-16 w-16 md:h-[5.5rem] md:w-[5.5rem] rounded-2xl border-4 border-white object-cover shadow-2xl"
              />

              <div className="relative h-full min-h-[380px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0A2463] via-[#143d98] to-[#0A2463] p-6 lg:p-10 flex flex-col">
                <Image
                  src="/images/img_9514.jpg"
                  alt="UNIQUM SPORT"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="absolute inset-0 z-0 object-cover opacity-25"
                />
                <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0A2463]/88 via-[#143d98]/82 to-[#0A2463]/88" />
                <div className="relative z-10">
                  <h3 className="text-white text-xl md:text-3xl font-black max-w-lg mb-3 md:mb-4">
                    {t.leftCardTitle}
                  </h3>
                  <p className="text-white/85 text-sm md:text-base leading-loose max-w-2xl mb-5 md:mb-6 whitespace-pre-line">
                    {t.leftCardText}
                  </p>

                  <div className="grid grid-cols-3 gap-2 md:gap-3 mt-auto">
                    <div className="bg-white rounded-2xl p-2.5 md:p-3 text-center">
                      <div className="text-xl md:text-2xl font-black text-[#0A2463]">55+</div>
                      <div className="text-[11px] font-semibold text-[#0A2463]/70">{t.stat1Label}</div>
                    </div>
                    <div className="bg-white rounded-2xl p-2.5 md:p-3 text-center">
                      <div className="text-xl md:text-2xl font-black text-[#0A2463]">85</div>
                      <div className="text-[11px] font-semibold text-[#0A2463]/70">{t.stat2Label}</div>
                    </div>
                    <div className="bg-white rounded-2xl p-2.5 md:p-3 text-center">
                      <div className="text-xl md:text-2xl font-black text-[#0A2463]">1000+</div>
                      <div className="text-[11px] font-semibold text-[#0A2463]/70">{t.stat3Label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="min-h-40 md:h-44 rounded-2xl shadow-xl bg-white border border-[#0A2463]/10 p-5">
                <div className="w-11 h-11 rounded-xl bg-[#ED3D4E]/12 flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5 text-[#0A2463]" />
                </div>
                <h4 className="text-[#0A2463] font-black text-base md:text-lg mb-1">{t.miniTitle1}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{t.miniText1}</p>
              </div>
              <div className="min-h-40 md:h-44 rounded-2xl shadow-xl bg-white border border-[#0A2463]/10 p-5">
                <div className="w-11 h-11 rounded-xl bg-[#0099FF]/12 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-[#0A2463]" />
                </div>
                <h4 className="text-[#0A2463] font-black text-base md:text-lg mb-1">{t.miniTitle2}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{t.miniText2}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full bg-white rounded-3xl p-7 md:p-8 shadow-2xl border border-[#0A2463]/8">
              <h3 className="text-2xl md:text-3xl font-black text-[#0A2463] mb-6">
                {t.cardTitle}
              </h3>

              <div className="space-y-3 mb-7">
                <div className="flex items-center gap-3 bg-[#0A2463]/5 rounded-xl p-3">
                  <CalendarClock className="w-5 h-5 text-[#0A2463]" />
                  <span className="text-sm font-semibold text-[#0A2463] whitespace-pre-line">{t.schedule1}</span>
                </div>
                <div className="flex items-center gap-3 bg-[#ED3D4E]/7 rounded-xl p-3">
                  <Users className="w-5 h-5 text-[#0A2463]" />
                  <span className="text-sm font-semibold text-[#0A2463] whitespace-pre-line">{t.schedule2}</span>
                </div>
                <div className="flex items-center gap-3 bg-[#0099FF]/10 rounded-xl p-3">
                  <Trophy className="w-5 h-5 text-[#0A2463]" />
                  <span className="text-sm font-semibold text-[#0A2463] whitespace-pre-line">{t.schedule3}</span>
                </div>
                <div className="flex items-center gap-3 bg-[#22C55E]/10 rounded-xl p-3">
                  <Trophy className="w-5 h-5 text-[#0A2463]" />
                  <span className="text-sm font-semibold text-[#0A2463] whitespace-pre-line">🏆 {t.cardNote}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-[#ED3D4E] text-white hover:bg-[#ED3D4E]/90 font-black rounded-full h-13 md:h-14 text-base group shadow-lg"
                onClick={scrollToContact}
              >
                {t.cta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
