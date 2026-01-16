import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Project SellWeed | Innovation Hub",
  description:
    "Pioneering sustainable ocean farming through seaweed cultivation. Strategy, Network, Economy, and Resilience for a climate-positive future.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a1a1f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen text-slate-50 relative bg-transparent">
        {/* Dark overlay for readability */}
        <div className="fixed inset-0 bg-slate-950/80 z-0 pointer-events-none" />
        {/* Content layer with bg-transparent */}
        <div className="relative z-10 bg-transparent">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
