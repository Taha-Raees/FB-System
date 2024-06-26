
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'G&G System',
  description: 'G&G System for event management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       {children}
       <Analytics />
       <SpeedInsights />
      </body>
    </html>
  )
}
