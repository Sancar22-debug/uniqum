"use client"

import { Instagram, MessageCircle, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { WHATSAPP_DISPLAY_PHONE, WHATSAPP_URL } from "@/lib/contacts"

const footerText = {
  ru: {
    about:
      "Спортивный центр для детей 3,5–17 лет в Бишкеке. Гимнастика, единоборства и ЛФК.",
    directionsTitle: "Направления",
    directions: ["Гимнастика", "Единоборства", "ЛФК", "Развивающая гимнастика"],
    navTitle: "Навигация",
    nav: [
      { href: "#directions", label: "О направлениях" },
      { href: "#results", label: "Результаты" },
      { href: "#how-it-works", label: "Как начать" },
      { href: "#faq", label: "Вопросы и ответы" },
      { href: "#contact", label: "Записаться" },
    ],
    contactsTitle: "Контакты",
    city: "Проспект Чынгыза Айтматова, 1а/1",
    rights: "Все права защищены."
  },
  ky: {
    about:
      "Бишкектеги 3,5–17 жаштагы балдар үчүн спорт борбору. Гимнастика, мушташ жана ДФК.",
    directionsTitle: "Багыттар",
    directions: ["Гимнастика", "Мушташ түрлөрү", "ДФК", "Өнүктүрүүчү гимнастика"],
    navTitle: "Навигация",
    nav: [
      { href: "#directions", label: "Багыттар тууралуу" },
      { href: "#results", label: "Жыйынтыктар" },
      { href: "#how-it-works", label: "Кантип баштоо" },
      { href: "#faq", label: "Суроолор жана жооптор" },
      { href: "#contact", label: "Жазылуу" },
    ],
    contactsTitle: "Байланыш",
    city: "Чыңгыз Айтматов проспекти, 1а/1",
    rights: "Бардык укуктар корголгон.",
    privacy: "Купуялык саясаты",
    terms: "Колдонуучу келишими",
  },
} as const

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { lang } = useLanguage()
  const t = footerText[lang]

  return (
    <footer className="bg-[#060e24] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="relative w-[155px] md:w-[195px] h-[40px] md:h-[48px] mb-5">
              <Image
                src="/images/logo-header-cropped.png"
                alt="UNIQUM SPORT"
                fill
                sizes="(max-width: 768px) 155px, 195px"
                className="object-contain object-left brightness-0 invert"
                unoptimized
              />
            </div>
            <p className="text-white/55 mb-6 leading-relaxed text-sm">{t.about}</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/uniqum.sport?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Messenger"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-5">{t.directionsTitle}</h4>
            <ul className="space-y-3">
              {t.directions.map((item) => (
                <li key={item}>
                  <a href="#directions" className="text-white/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-5">{t.navTitle}</h4>
            <ul className="space-y-3">
              {t.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-5">{t.contactsTitle}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  {WHATSAPP_DISPLAY_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">{t.city}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-sm">
            © {currentYear} UNIQUM SPORT. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}