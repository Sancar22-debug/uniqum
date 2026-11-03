"use client"

import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { CONTACT_PHONES } from "@/lib/contacts"
import { ChevronRight, FileText, ArrowLeft, Building2, ShieldCheck, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage()

  const t = {
    ru: {
      title: "Политика конфиденциальности",
      subtitle: "Детского спортивного комплекса Uniqum Sport",
      lastUpdated: "Последнее обновление: 26 мая 2026 г.",
      home: "Главная",
      noticeKy: "",
      requisitesTitle: "Реквизиты компании",
    },
    ky: {
      title: "Купуялык саясаты",
      subtitle: "Uniqum Sport балдар спорт комплекси",
      lastUpdated: "Акыркы жаңыртуу: 26-май 2026-ж.",
      home: "Башкы бет",
      noticeKy: "Бул документ расмий орус тилинде гана жеткиликтүү.",
      requisitesTitle: "Компаниянын реквизиттери",
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

          {/* Policy Content */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-10 text-slate-700 leading-relaxed text-sm md:text-base space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <p className="font-semibold text-slate-800 text-center mb-4 uppercase">
                ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
                <br />
                <span className="text-sm font-normal text-slate-500 capitalize">Детского спортивного комплекса Uniqum Sport (ОсОО «Атлетикс»)</span>
              </p>
            </div>

            <p>
              1. Политика обработки персональных данных (далее – Политика) регулирует правоотношения по обработке персональных данных между ОсОО «Атлетикс», ИНН 00103202210385, осуществляющим деятельность под брендом Uniqum Sport (далее – Компания) и Пользователем услуг комплекса (далее – Пользователь).
            </p>

            <div className="space-y-3">
              <p>
                2. Под <strong>«Пользователем»</strong> понимается дееспособное физическое лицо, желающее воспользоваться услугами Компании, записаться на занятия, оставить заявку, зарегистрироваться либо совершить иные действия, предусмотренные функционалом информационных ресурсов Компании.
              </p>
              <p>
                Под <strong>«персональными данными»</strong> понимается любая информация, относящаяся к прямо или косвенно определённому или определяемому физическому лицу (гражданину).
              </p>
              <p>
                Под <strong>«обработкой персональных данных»</strong> понимается любое действие (операция) или совокупность действий (операций) с персональными данными, совершаемых с использованием средств автоматизации или без использования таких средств, включая: сбор, получение, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу, обезличивание, блокирование, удаление, уничтожение персональных данных.
              </p>
            </div>

            <p>
              3. Настоящая Политика определяет порядок обработки персональных данных Пользователей, условия и принципы их обработки, права Пользователей и обязанности Компании, а также сведения о мерах по защите обрабатываемых персональных данных.
            </p>

            <p>
              4. Настоящая Политика действует в отношении всех персональных данных, которые Компания получает от Пользователей.
            </p>

            <p>
              5. Пользователь соглашается с настоящей Политикой путём предоставления своих данных (имя, номер телефона, адрес электронной почты) при записи на занятия, оформлении абонемента или совершении иных действий, предусмотренных функционалом информационных ресурсов Компании. В случае несогласия с условиями Политики Пользователь должен немедленно прекратить использование услуг Компании.
            </p>

            <p>
              6. При использовании услуг Компании Пользователь может предоставлять следующие персональные данные: фамилия, имя, отчество; дата рождения (в том числе ребёнка); адрес электронной почты; номер контактного телефона; иные данные, необходимые для оказания услуг.
            </p>

            <p>
              7. Предоставляя свои персональные данные, Пользователь соглашается на их обработку (вплоть до отзыва согласия), включая сбор, хранение, обезличивание, передачу третьим лицам в предусмотренных Политикой случаях, в целях предоставления услуг, информирования и иных целях согласно п. 9 настоящей Политики. При обработке персональных данных Компания руководствуется Законом Кыргызской Республики от 14 апреля 2008 года № 58 «Об информации персонального характера» и иными законодательными актами Кыргызской Республики. Пользователь в любой момент может отозвать предоставленное Компании согласие в порядке, установленном настоящей Политикой.
            </p>

            <p>
              8. Если Пользователь желает уточнить, изменить или отозвать согласие на обработку персональных данных, необходимо направить официальный запрос с темой «Уточнить персональные данные» или «Прекратить обработку персональных данных» на адрес электронной почты: <a href="mailto:uniqumsport@gmail.com" className="text-[#0099FF] hover:underline">uniqumsport@gmail.com</a>. В письме необходимо указать свой электронный адрес и соответствующее требование.
            </p>

            <div>
              <p className="font-semibold mb-2">9. Компания использует предоставленные Пользователем данные в целях:</p>
              <ul className="list-none pl-4 space-y-1.5 border-l-2 border-slate-100">
                <li><span className="font-semibold text-[#0A2463]">9.1.</span> идентификации Пользователя и предоставления доступа к услугам Компании;</li>
                <li><span className="font-semibold text-[#0A2463]">9.2.</span> записи на тренировки, занятия и мероприятия комплекса;</li>
                <li><span className="font-semibold text-[#0A2463]">9.3.</span> дальнейшей коммуникации по заявке Пользователя, консультирования по вопросам оказания услуг;</li>
                <li><span className="font-semibold text-[#0A2463]">9.4.</span> отправки сообщений информационного характера;</li>
                <li><span className="font-semibold text-[#0A2463]">9.5.</span> информирования Пользователя об акциях, расписании, скидках и специальных предложениях посредством рассылок по электронной почте или телефонной связи;</li>
                <li><span className="font-semibold text-[#0A2463]">9.6.</span> оценки и анализа качества оказываемых услуг;</li>
                <li><span className="font-semibold text-[#0A2463]">9.7.</span> проведения маркетинговых исследований.</li>
                <li><span className="font-semibold text-[#0A2463]">9.8.</span> для рассылок об уведомлении о новых продуктах и услугах. Пользователь может отказаться от получения сообщений направив сообщение на почту компании <a href="mailto:uniqumsport@gmail.com" className="text-[#0099FF] hover:underline">uniqumsport@gmail.com</a> с пометкой «отказ от рассылок».</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">10. Компания не проверяет данные, представленные Пользователем, и исходит из того, что при предоставлении персональных данных Пользователь:</p>
              <ul className="list-none pl-4 space-y-1.5 border-l-2 border-slate-100">
                <li><span className="font-semibold text-[#0A2463]">10.1.</span> является дееспособным лицом. В случае предоставления данных несовершеннолетнего согласие на обработку персональных данных предоставляется его законным представителем.</li>
                <li><span className="font-semibold text-[#0A2463]">10.2.</span> указывает достоверную информацию о себе и самостоятельно поддерживает её в актуальном состоянии.</li>
                <li><span className="font-semibold text-[#0A2463]">10.3.</span> осознаёт, что часть информации может быть доступна иным лицам в случаях, предусмотренных Политикой.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">11. Компания обрабатывает персональные данные на основе следующих принципов:</p>
              <ul className="list-none pl-4 space-y-1.5 border-l-2 border-slate-100">
                <li><span className="font-semibold text-[#0A2463]">11.1.</span> законности;</li>
                <li><span className="font-semibold text-[#0A2463]">11.2.</span> ограничения обработки персональных данных достижением конкретных законных целей;</li>
                <li><span className="font-semibold text-[#0A2463]">11.3.</span> недопущения обработки персональных данных, несовместимой с целями их сбора;</li>
                <li><span className="font-semibold text-[#0A2463]">11.4.</span> соответствия содержания и объёма обрабатываемых данных целям их обработки;</li>
                <li><span className="font-semibold text-[#0A2463]">11.5.</span> обеспечения точности, достаточности и актуальности данных;</li>
                <li><span className="font-semibold text-[#0A2463]">11.6.</span> уничтожения или обезличивания персональных данных при достижении целей обработки или по требованию Пользователя.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">12. Компания при обработке персональных данных принимает необходимые организационные и технические меры для их защиты от неправомерного доступа и иных неправомерных действий. Обработка персональных данных осуществляется с учётом следующего:</p>
              <ul className="list-none pl-4 space-y-1.5 border-l-2 border-slate-100">
                <li><span className="font-semibold text-[#0A2463]">12.1.</span> Обработка персональных данных осуществляется с использованием баз данных на территории Кыргызской Республики.</li>
                <li><span className="font-semibold text-[#0A2463]">12.2.</span> Обработка персональных данных осуществляется как с использованием автоматизированных средств, так и без их использования.</li>
                <li><span className="font-semibold text-[#0A2463]">12.3.</span> Компания обязуется не передавать полученную от Пользователя информацию третьим лицам, кроме случаев, предусмотренных настоящей Политикой.</li>
                <li><span className="font-semibold text-[#0A2463]">12.4.</span> Хранение персональных данных осуществляется в пределах срока, объективно необходимого для исполнения обязательств перед Пользователями.</li>
              </ul>
            </div>

            <p>
              13. При необходимости передачи персональных данных третьим лицам — партнёрам Компании такая передача осуществляется при условии обеспечения партнёром конфиденциальности данных, соблюдения мер информационной безопасности и запрета на дальнейшую передачу данных третьим лицам без согласия Пользователя.
            </p>

            <p>
              14. Не считается нарушением настоящей Политики передача информации в соответствии с требованиями законодательства Кыргызской Республики, а также передача обезличенных данных партнёрам в целях оценки качества услуг и проведения аналитических исследований.
            </p>

            <p>
              15. Компания вправе использовать технологию «cookies» и иные технологии сбора технических данных (IP-адрес, тип браузера, сведения об устройстве) для улучшения качества услуг и аналитики. Данная информация не используется для установления личности Пользователя.
            </p>

            <p>
              16. Пользователь имеет право на получение от Компании информации, касающейся обработки его персональных данных. Компания безвозмездно предоставляет возможность ознакомления с персональными данными. В случае выявления неполноты или неточности сведений Компания вносит необходимые изменения в срок, не превышающий 7 (семи) рабочих дней, и уведомляет Пользователя.
            </p>

            <div>
              <p className="font-semibold mb-2">17. Компания обязуется прекратить обработку персональных данных Пользователя в случае:</p>
              <ul className="list-none pl-4 space-y-1.5 border-l-2 border-slate-100">
                <li><span className="font-semibold text-[#0A2463]">17.1.</span> выявления неправомерной обработки персональных данных;</li>
                <li><span className="font-semibold text-[#0A2463]">17.2.</span> отзыва Пользователем согласия на обработку;</li>
                <li><span className="font-semibold text-[#0A2463]">17.3.</span> получения от Пользователя требования об уничтожении персональных данных;</li>
                <li><span className="font-semibold text-[#0A2463]">17.4.</span> достижения цели обработки персональных данных.</li>
              </ul>
              <p className="mt-2">
                При наступлении указанных случаев Компания прекращает обработку и обеспечивает уничтожение данных в срок, не превышающий 30 (тридцати) дней.
              </p>
            </div>

            <p>
              18. Компания вправе вносить изменения в настоящую Политику в любое время. Актуальный текст Политики доводится до сведения Пользователей доступными способами.
            </p>

            <p>
              19. Продолжение пользования услугами Компании после публикации новой редакции Политики означает принятие её условий Пользователем.
            </p>

            <p>
              20. Все вопросы по настоящей Политике и/или обработке персональных данных направляются на адрес электронной почты Компании: <a href="mailto:uniqumsport@gmail.com" className="text-[#0099FF] hover:underline">uniqumsport@gmail.com</a>.
            </p>

            {/* Company Info Box */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h2 className="text-lg font-bold text-[#0A2463] mb-5 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0099FF]" />
                {t.requisitesTitle}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100 text-sm">
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Компания</span>
                  <span className="font-semibold text-slate-800">ОсОО «Атлетикс»</span>
                  <span className="text-slate-500 text-xs block mt-1">(LLC "Atletiks", бренд Uniqum Sport)</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">ИНН</span>
                  <span className="font-semibold text-slate-800 font-mono">00103202210385</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Юридический адрес</span>
                  <span className="font-medium text-slate-800 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    г. Бишкек, ул. Бердибаева, дом 55
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Электронная почта</span>
                  <a href="mailto:uniqumsport@gmail.com" className="font-medium text-[#0099FF] hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    uniqumsport@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Телефоны</span>
                  <span className="font-medium text-slate-800 flex flex-col gap-0.5">
                    {CONTACT_PHONES.map(({ phone, display }) => (
                      <a key={phone} href={`tel:+${phone}`} className="hover:underline flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {display}
                      </a>
                    ))}
                  </span>
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
