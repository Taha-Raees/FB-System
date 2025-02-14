import ChatBox from '@/Components/layout/ChatBot/ChatBox';
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

import "../globals.css";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WeLcome to G&G System ',
  description: 'G&G System Getstarted',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       {children}
       <ChatBox/>
       <Analytics />
       <SpeedInsights />
      </body>
    </html>
  )
}
