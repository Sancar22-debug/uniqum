export const WHATSAPP_PHONE = "996505332210"
export const WHATSAPP_DISPLAY_PHONE = "+996 505 33 22 10"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`

export function openWhatsApp() {
  if (typeof window === "undefined") return
  window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
}
