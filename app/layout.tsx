import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "UNIQUM SPORT | Спортивные секции для детей в Бишкеке",
  description:
    "Гимнастика, единоборства и ЛФК для детей от 3,5 до 17 лет. Развиваем силу, гибкость и дисциплину в одном месте.",
  generator: "v0.app",
  keywords: ["спорт для детей", "гимнастика бишкек", "единоборства для детей", "ЛФК", "детские секции"],
  icons: {
    icon: "/images/logo_circular.jpg",
    apple: "/images/logo_circular.jpg",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A2463",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ky" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
