import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "UNIQUM SPORT | Спортивные секции для детей в Бишкеке",
  description:
    "Гимнастика, единоборства и ЛФК для детей от 3,5 до 17 лет. Развиваем силу, гибкость и дисциплину в одном месте.",
  generator: "v0.app",
  keywords: ["спорт для детей", "гимнастика бишкек", "единоборства для детей", "ЛФК", "детские секции"],
  icons: {
    icon: "/images/631454923_18042394823736392_8950591375023917446_n.jpg",
    apple: "/images/631454923_18042394823736392_8950591375023917446_n.jpg",
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
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
