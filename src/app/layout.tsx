import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nusaloka',
  description: 'Nusantara Culture WebApp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <div className="relative z-40">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  )
}
