import type { Metadata } from "next"
import { GeistSans, GeistMono } from "geist/font"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Scene3DWrapper } from "@/components/three/Scene3DWrapper"

export const metadata: Metadata = {
  title: "Ali Ihtsham — AI Engineer & Founder @ Code Brand Studio",
  description:
    "Portfolio of Ali Ihtsham — AI Engineer, Multi-Agent Systems Architect, and Founder of Code Brand Studio. Building Agent Org, Alpha Council, and high-ticket web experiences.",
  openGraph: {
    title: "Ali Ihtsham — AI Engineer & Founder @ Code Brand Studio",
    description:
      "Portfolio of Ali Ihtsham — AI Engineer, Multi-Agent Systems Architect, and Founder of Code Brand Studio.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        <Scene3DWrapper />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
