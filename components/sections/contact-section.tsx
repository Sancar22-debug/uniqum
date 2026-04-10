"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "@/components/language-provider"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, Phone, MapPin, Instagram, MessageCircle, Loader2 } from "lucide-react"
import { WHATSAPP_DISPLAY_PHONE, WHATSAPP_URL, openWhatsApp, getWhatsAppUrlWithUTM } from "@/lib/contacts"
import { useUTM } from "@/hooks/use-utm"

const sectionText = {
  ru: {
    badge: "Запишитесь сейчас",
    title: "Подберём направление и начнём",
    description: "Оставьте контакты — мы свяжемся и подберём идеальную секцию для вашего ребёнка",
    successTitle: "Заявка отправлена!",
    successDescription: "Мы свяжемся с вами в ближайшее время",
    namePlaceholder: "Ваше имя",
    phonePlaceholder: "Номер телефона",
    agePlaceholder: "Возраст ребёнка",
    submit: "Отправить заявку",
    centerSubtitle: "Спортивный центр для детей в Бишкеке",
    phoneLabel: "Телефон",
    addressLabel: "Адрес",
    city: "Проспект Чынгыза Айтматова, 1а/1",
  },
  ky: {
    badge: "Азыр жазылыңыз",
    title: "Багыт тандап, баштайбыз",
    description: "Байланышыңызды калтырыңыз — биз байланышып, балаңызга ылайыктуу секцияны тандайбыз",
    successTitle: "Өтүнмө жөнөтүлдү!",
    successDescription: "Жакын арада сиз менен байланышабыз",
    namePlaceholder: "Атыңыз",
    phonePlaceholder: "Телефон номери",
    agePlaceholder: "Баланын жашы",
    submit: "Өтүнмө жөнөтүү",
    centerSubtitle: "Бишкектеги балдар үчүн спорт борбору",
    phoneLabel: "Телефон",
    addressLabel: "Дарек",
    city: "Чыңгыз Айтматов проспекти, 1а/1",
  },
} as const

export default function ContactSection() {
  const ref = useScrollReveal()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { lang } = useLanguage()
  const t = sectionText[lang]
  const utmTags = useUTM()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      age: formData.get("age"),
      utmTags
    }

    try {
      await fetch("/api/amocrm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    } catch (error) {
      console.error("Failed to submit to AmoCRM", error)
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A2463 0%, #1a3a8a 100%)" }}
      suppressHydrationWarning
    >
      <div className="absolute top-16 right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" suppressHydrationWarning />
      <div className="absolute bottom-16 left-16 w-80 h-80 bg-[#ED3D4E]/8 rounded-full blur-3xl pointer-events-none" suppressHydrationWarning />

      <div className="container mx-auto px-4 relative z-10" suppressHydrationWarning>
        <div className="grid lg:grid-cols-2 gap-12 items-start" suppressHydrationWarning>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl" suppressHydrationWarning>
            <span className="inline-block bg-white text-[#0A2463] border border-gray-200 px-4 py-1.5 rounded-full text-sm font-bold mb-5">
              {t.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A2463] mb-2">{t.title}</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">{t.description}</p>

            {isSubmitted ? (
              <div className="bg-green-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-700 mb-2">{t.successTitle}</h3>
                <p className="text-green-600">{t.successDescription}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  placeholder={t.namePlaceholder}
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-[#0A2463] px-4 text-base"
                  required
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-[#0A2463] px-4 text-base"
                  required
                />
                <Input
                  name="age"
                  placeholder={t.agePlaceholder}
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-[#0A2463] px-4 text-base"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-[#ED3D4E] text-white hover:bg-[#ED3D4E]/90 font-black rounded-xl h-14 text-base group shadow-lg"
                >
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : t.submit}
                  {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>
            )}
          </div>

          <div className="text-white space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-2">
                <span className="text-white">UNIQUM</span> SPORT
              </h3>
              <p className="text-white/70 text-lg">{t.centerSubtitle}</p>
            </div>

            <div className="space-y-3">
              <a
                href={getWhatsAppUrlWithUTM(utmTags)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-white/35 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#0A2463]" />
                </div>
                <div>
                  <div className="text-xs text-white/50 font-medium uppercase tracking-wide">{t.phoneLabel}</div>
                  <div className="font-semibold">{WHATSAPP_DISPLAY_PHONE}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-12 h-12 rounded-xl bg-[#0099FF] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/50 font-medium uppercase tracking-wide">{t.addressLabel}</div>
                  <div className="font-semibold">{t.city}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/uniqum.sport?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={getWhatsAppUrlWithUTM(utmTags)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="WhatsApp / Telegram"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* 2GIS Map */}
            <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <iframe
                src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A42.86058333997541%2C%22lon%22%3A74.5845937728882%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22bishkek%22%7D%2C%22org%22%3A%2270000001063119278%22%7D"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                title="Uniqum Sport на карте 2ГИС"
              />
            </div>
            <a
              href="https://2gis.kg/bishkek/firm/70000001063119278/tab/routes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#ED3D4E] hover:bg-[#d6354a] text-white font-bold rounded-xl py-3 px-6 transition-colors shadow-lg text-sm"
            >
              <MapPin className="w-4 h-4" />
              {lang === "ru" ? "Построить маршрут в 2ГИС" : "2ГИС'те маршрут түзүү"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
