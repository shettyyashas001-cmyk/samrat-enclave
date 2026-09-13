import type { Metadata } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Scene from '@/components/Scene'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'],
  variable: '--font-cormorant' 
})

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  title: 'Samrat Enclave | Builders & Developers',
  description: 'Sculpting Bengaluru\'s Finest Land & Living Spaces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${jakarta.variable} font-sans bg-slate-950 text-white antialiased min-h-screen flex flex-col relative`}>
        {/* Global Skyscraper Background */}
        <div className="fixed inset-0 z-0 bg-slate-950">
          <Scene />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950/90 pointer-events-none"></div>
        </div>

        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <div className="relative z-10 flex-1 flex flex-col w-full">
          {children}
        </div>

        {/* Global Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </body>
    </html>
  )
}
