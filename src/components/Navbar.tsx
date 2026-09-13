'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Samrat Enclave Logo" width={50} height={50} className="object-contain" />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-serif text-slate-900 tracking-wider uppercase font-bold leading-none">
              Samrat Enclave
            </h1>
            <span className="text-[10px] md:text-xs text-[#D4AF37] font-semibold tracking-widest uppercase">Builders & Developers</span>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-600">
          <Link href="/#projects" className="hover:text-[#D4AF37] transition-colors">PROJECTS</Link>
          <Link href="/about" className="hover:text-[#D4AF37] transition-colors">ABOUT US</Link>
          <Link href="/investors" className="hover:text-[#D4AF37] transition-colors">INVESTORS</Link>
          <Link href="/#contact" className="hover:text-[#D4AF37] transition-colors">CONTACT US</Link>
          <Link 
            href="/#contact"
            className="bg-slate-900 text-white px-6 py-2 rounded-sm hover:bg-[#D4AF37] transition-colors"
          >
            ENQUIRE
          </Link>
        </div>
        <button 
          className="lg:hidden text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 p-4 flex flex-col gap-4 text-sm font-semibold text-slate-700 shadow-xl">
          <Link href="/#projects" onClick={() => setMobileMenuOpen(false)}>PROJECTS</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>ABOUT US</Link>
          <Link href="/investors" onClick={() => setMobileMenuOpen(false)}>INVESTORS</Link>
          <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>CONTACT US</Link>
        </div>
      )}
    </nav>
  )
}
