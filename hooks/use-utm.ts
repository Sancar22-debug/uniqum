"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export type UTMData = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export function useUTM() {
  const searchParams = useSearchParams()
  const [utmData, setUtmData] = useState<UTMData>({})

  useEffect(() => {
    // Attempt to load from session storage first
    const cachedUtm = sessionStorage.getItem("utm_data")
    let currentUtm: UTMData = cachedUtm ? JSON.parse(cachedUtm) : {}

    // Check URL parameters for any overriding UTM tags
    const source = searchParams.get("utm_source")
    const medium = searchParams.get("utm_medium")
    const campaign = searchParams.get("utm_campaign")
    const term = searchParams.get("utm_term")
    const content = searchParams.get("utm_content")

    let updated = false

    if (source) {
      currentUtm.utm_source = source
      updated = true
    }
    if (medium) {
      currentUtm.utm_medium = medium
      updated = true
    }
    if (campaign) {
      currentUtm.utm_campaign = campaign
      updated = true
    }
    if (term) {
      currentUtm.utm_term = term
      updated = true
    }
    if (content) {
      currentUtm.utm_content = content
      updated = true
    }

    if (updated) {
      sessionStorage.setItem("utm_data", JSON.stringify(currentUtm))
    }

    setUtmData(currentUtm)

    // Log for verification
    if (Object.keys(currentUtm).length > 0) {
      const labels: Record<string, string> = {
        utm_source: "Источник",
        utm_medium: "Тип трафика",
        utm_campaign: "Кампания",
        utm_term: "Ключевое слово",
        utm_content: "Контент"
      }
      const formatted = Object.entries(currentUtm)
        .map(([k, v]) => `${labels[k as keyof typeof labels] || k}: ${v}`)
        .join(", ")
      console.log(`%c[UTM Tracking] Активные метки: ${formatted}`, "color: #0099FF; font-weight: bold;")
    }
  }, [searchParams])

  return utmData
}
