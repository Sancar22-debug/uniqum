"use client"

import { useEffect, useRef } from "react"

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = ref.current?.querySelectorAll(".reveal-item")
    if (!elements?.length) return

    const revealElement = (element: Element) => {
      const el = element as HTMLElement
      el.dataset.revealed = "true"
      el.style.opacity = "1"
      el.style.transform = el.classList.contains("reveal-left") || el.classList.contains("reveal-right")
        ? "translateX(0)"
        : "translateY(0)"
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      elements.forEach((el, index) => {
        ;(el as HTMLElement).style.transitionDelay = `${index * 80}ms`
        revealElement(el)
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            revealElement(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )

    elements.forEach((el, index) => {
      ;(el as HTMLElement).style.transitionDelay = `${index * 80}ms`
      observer.observe(el)
    })

    // Fallback: ensure content never remains hidden on edge viewport cases.
    const fallbackTimer = window.setTimeout(() => {
      elements.forEach((el) => {
        const node = el as HTMLElement
        if (node.dataset.revealed !== "true") {
          el.classList.add("revealed")
          revealElement(el)
          observer.unobserve(el)
        }
      })
    }, 1200)

    return () => {
      window.clearTimeout(fallbackTimer)
      observer.disconnect()
    }
  }, [])

  return ref
}
