import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950/95 backdrop-blur-sm py-12 md:py-16 text-slate-400 border-t border-slate-900">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <Image src="/logo.png" alt="Samrat Enclave Logo" width={40} height={40} className="object-contain" />
            <div className="flex flex-col text-left">
              <h2 className="text-xl font-serif text-white tracking-wider uppercase leading-none">Samrat Enclave</h2>
              <span className="text-[10px] text-[#D4AF37] font-semibold tracking-widest uppercase">Builders & Developers</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Sculpting Bengaluru's finest living spaces since 1995. Award-winning developers with a legacy of trust and excellence.
          </p>
          <div className="text-sm">
            <p className="font-semibold text-white mb-1">Contact Us</p>
            <p>Phone: +91 80733 97210</p>
            <p>Email: info@samratenclave.com</p>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-[#D4AF37]">About Us</Link></li>
            <li><Link href="/investors" className="hover:text-[#D4AF37]">Investors</Link></li>
            <li><Link href="/#projects" className="hover:text-[#D4AF37]">Projects</Link></li>
            <li><Link href="/#contact" className="hover:text-[#D4AF37]">Contact Us</Link></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-6">Portfolio</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/#projects" className="hover:text-[#D4AF37]">Residential Villas</Link></li>
            <li><Link href="/#projects" className="hover:text-[#D4AF37]">Luxury Apartments</Link></li>
            <li><Link href="/#projects" className="hover:text-[#D4AF37]">Premium Plots</Link></li>
            <li><Link href="/#projects" className="hover:text-[#D4AF37]">Commercial Spaces</Link></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-6">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe to our newsletter for latest updates.</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <input type="email" placeholder="Email Address" className="bg-slate-900 border border-slate-800 px-4 py-2 w-full text-white focus:outline-none focus:border-[#D4AF37] rounded-sm sm:rounded-r-none" />
            <button className="bg-[#D4AF37] text-slate-950 px-6 py-2 font-semibold rounded-sm sm:rounded-l-none">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 mt-12 md:mt-16 pt-8 border-t border-slate-900 text-center text-sm flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Samrat Enclave Builders & Developers. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
