export const WHATSAPP_PHONE = "996505332210"
export const WHATSAPP_DISPLAY_PHONE = "+996 505 33 22 10"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`

export function getWhatsAppUrlWithUTM(utmData?: any) {
  let message = "Здравствуйте! Хочу записаться на тренировку."
  
  if (utmData && Object.keys(utmData).length > 0) {
    const source = utmData.utm_source || ""
    const campaign = utmData.utm_campaign || ""
    if (source || campaign) {
      message += ` (Источник: ${source}${campaign ? ", Кампания: " + campaign : ""})`
    }
  }

  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(utmData?: any) {
  if (typeof window === "undefined") return
  const url = getWhatsAppUrlWithUTM(utmData)
  window.open(url, "_blank", "noopener,noreferrer")
}
