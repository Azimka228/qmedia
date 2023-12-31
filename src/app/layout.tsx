import "./globals.scss"
import {ReactNode} from "react"

import type {Metadata} from "next"
import {Inter} from "next/font/google"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Qmedia",
  description: "Qmedia test task",
}

const RootLayout = ({children}: {children: ReactNode}) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
)

export default RootLayout
