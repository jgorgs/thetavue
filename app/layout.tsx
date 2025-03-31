import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientWrapper } from "@/components/dashboard/client-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ThetaVue",
  description: "Options portfolio management for retail traders",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}



import './globals.css'