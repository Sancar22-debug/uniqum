"use client"

import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { ChevronRight, ArrowLeft, Building2, FileText, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  const { lang } = useLanguage()

  const t = {
    ru: {
      title: "Пользовательское соглашение",
      subtitle: "Детского спортивного комплекса Uniqum Sport",
      lastUpdated: "Последнее обновление: 26 мая 2026 г.",
      home: "Главная",
      noticeKy: "",
      requisitesTitle: "Реквизиты организации",
    },
    ky: {
      title: "Колдонуучу келишими",
      subtitle: "Uniqum Sport балдар спорт комплекси",
      lastUpdated: "Акыркы жаңыртуу: 26-май 2026-ж.",
      home: "Башкы бет",
      noticeKy: "Бул документ расмий орус тилинде гана жеткиликтүү.",
      requisitesTitle: "Уюмдун реквизиттери",
    }
  }[lang]

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Suspense fallback={<div className="h-16 w-full" />}>
        <Header isSolid={true} />
      </Suspense>
      
      <main className="flex-grow pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#0A2463] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.home}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-medium">{t.title}</span>
          </div>

          {/* Agreement Content */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-10 text-slate-700 leading-relaxed text-sm md:text-base space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <p className="font-semibold text-slate-800 text-center mb-4">
                ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ
                <br />
                <span className="text-sm font-normal text-slate-500">Детского спортивного комплекса Uniqum Sport (ОсОО "Атлетикс")</span>
              </p>
              <p className="text-sm text-justify">
                Настоящее Пользовательское соглашение (далее – «Соглашение») регулирует отношения между Обществом с ограниченной ответственностью "Атлетикс", осуществляющим деятельность под брендом Uniqum Sport (далее – «Организация»), и пользователем услуг (далее – «Пользователь») при пользовании услугами детского спортивного комплекса Uniqum Sport.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-base font-bold text-[#0A2463] mb-2">1. Общие положения</h2>
              <div className="space-y-1.5 pl-4 border-l-2 border-slate-100 text-sm">
                <p>
                  <strong>1.1.</strong> Использование услуг Организации Пользователем означает согласие с условиями настоящего Соглашения.
                </p>
                <p>
                  <strong>1.2.</strong> В случае несогласия с условиями настоящего Соглашения Пользователь обязан прекратить использование услуг Организации.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-base font-bold text-[#0A2463] mb-2">2. Предмет соглашения</h2>
              <div className="space-y-1.5 pl-4 border-l-2 border-slate-100 text-sm">
                <p>
                  <strong>2.1.</strong> Организация предоставляет Пользователю доступ к услугам детского спортивного комплекса Uniqum Sport, включая тренировки, занятия и иные спортивные мероприятия.
                </p>
                <p>
                  <strong>2.2.</strong> Пользователь обязуется использовать услуги Организации исключительно в законных целях и в соответствии с условиями данного Соглашения.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-base font-bold text-[#0A2463] mb-2">3. Права и обязанности сторон</h2>
              <div className="space-y-3 pl-4 border-l-2 border-slate-100 text-sm">
                <div>
                  <p className="font-semibold text-slate-800">3.1. Организация обязана:</p>
                  <ul className="list-none pl-4 space-y-1 text-slate-600 mt-1">
                    <li>— предоставить Пользователю доступ к услугам комплекса;</li>
                    <li>— обеспечивать безопасность занятий и надлежащее техническое состояние оборудования;</li>
                    <li>— оказывать консультационную поддержку по вопросам расписания и услуг комплекса.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-slate-800">3.2. Пользователь обязан:</p>
                  <ul className="list-none pl-4 space-y-1 text-slate-600 mt-1">
                    <li>— не использовать услуги Организации в целях, противоречащих законодательству Кыргызской Республики;</li>
                    <li>— соблюдать внутренний распорядок и правила безопасности комплекса;</li>
                    <li>— обеспечивать конфиденциальность данных своей учётной записи и не передавать их третьим лицам;</li>
                    <li>— не осуществлять действия, способные нанести вред имуществу или репутации Организации.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-base font-bold text-[#0A2463] mb-2">4. Конфиденциальность и защита данных</h2>
              <div className="space-y-1.5 pl-4 border-l-2 border-slate-100 text-sm">
                <p>
                  <strong>4.1.</strong> Организация обеспечивает конфиденциальность и безопасность персональных данных Пользователя в соответствии с Политикой конфиденциальности Организации.
                </p>
                <p>
                  <strong>4.2.</strong> Пользователь соглашается с тем, что Организация может обрабатывать и хранить персональные данные в целях оказания услуг и улучшения качества обслуживания.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-base font-bold text-[#0A2463] mb-2">5. Ограничение ответственности</h2>
              <div className="space-y-1.5 pl-4 border-l-2 border-slate-100 text-sm">
                <p>
                  <strong>5.1.</strong> Организация не несёт ответственности за прямые или косвенные убытки, возникшие у Пользователя вследствие нарушения им условий настоящего Соглашения, правил безопасности комплекса или вследствие обстоятельств непреодолимой силы.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-base font-bold text-[#0A2463] mb-2">6. Изменения и дополнения</h2>
              <div className="space-y-1.5 pl-4 border-l-2 border-slate-100 text-sm">
                <p>
                  <strong>6.1.</strong> Организация вправе вносить изменения в настоящее Соглашение без предварительного уведомления Пользователя. Обновлённая версия Соглашения вступает в силу с момента её публикации на официальных информационных ресурсах Организации.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-base font-bold text-[#0A2463] mb-2">7. Заключительные положения</h2>
              <div className="space-y-1.5 pl-4 border-l-2 border-slate-100 text-sm">
                <p>
                  <strong>7.1.</strong> Все споры и разногласия, возникающие в связи с настоящим Соглашением, решаются путём переговоров сторон. В случае невозможности урегулирования споров путём переговоров они передаются на рассмотрение суда по месту регистрации Организации в соответствии с законодательством Кыргызской Республики.
                </p>
                <p>
                  <strong>7.2.</strong> Настоящее Соглашение вступает в силу с момента начала использования Пользователем услуг Организации и действует на весь период их использования.
                </p>
              </div>
            </div>

            {/* Requisites */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h2 className="text-base font-bold text-[#0A2463] mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0099FF]" />
                {t.requisitesTitle}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100 text-sm">
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Компания</span>
                  <span className="font-semibold text-slate-800">ОсОО "Атлетикс"</span>
                  <span className="text-slate-500 text-xs block mt-1">(бренд Uniqum Sport)</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">ИНН</span>
                  <span className="font-semibold text-slate-800 font-mono">00103202210385</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Электронная почта</span>
                  <a href="mailto:uniqumsport@gmail.com" className="font-medium text-[#0099FF] hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    uniqumsport@gmail.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Suspense fallback={<div className="h-64 w-full bg-[#060e24]" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
