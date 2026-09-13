import Image from 'next/image'

const leaders = [
  { name: 'Vishwanath A Shetty', role: 'Founder & Chairman', desc: 'A visionary leader with over 40 years of experience in real estate and urban development. Vishwanath laid the foundation of Samrat Enclave with a commitment to uncompromised quality.' },
  { name: 'Pramila V Shetty', role: 'Co-Founder', desc: 'The backbone of our design and sustainability initiatives. Pramila has championed the integration of green technologies across all our major townships.' },
  { name: 'Yashas V Shetty', role: 'Director', desc: 'Spearheading our technological transformation, Yashas brings modern prop-tech innovations, including our AR visualization platforms and smart-home integrations.' },
  { name: 'Kalash V Shetty', role: 'Director', desc: 'Leading our expansion and acquisitions, Kalash ensures that Samrat Enclave continues to secure the most premium and strategic land parcels across Bengaluru.' },
]

export default function Investors() {
  return (
    <div className="pt-32 pb-24 px-4 bg-slate-950/80 backdrop-blur-sm min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#D4AF37] mb-6">
            Leadership & Investors
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Meet the visionaries behind Samrat Enclave Builders & Developers. Our leadership team brings together decades of expertise in real estate, architecture, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {leaders.map((leader, idx) => (
            <div key={idx} className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-[#D4AF37]/50 transition-colors flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#D4AF37]">
                <span className="text-2xl font-serif text-[#D4AF37]">{leader.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-white mb-1">{leader.name}</h3>
                <p className="text-[#D4AF37] text-sm font-semibold tracking-wide uppercase mb-4">{leader.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {leader.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 bg-white/5 rounded-2xl p-10 border border-white/10 text-center">
          <h2 className="text-3xl font-serif text-white mb-6">Investor Relations</h2>
          <p className="text-slate-400 max-w-3xl mx-auto mb-8">
            Samrat Enclave maintains a robust portfolio and a transparent corporate governance structure. We are continuously exploring strategic partnerships to expand our footprint in the luxury real estate sector.
          </p>
          <button className="bg-[#D4AF37] text-slate-950 px-8 py-3 rounded font-semibold hover:bg-white transition-colors">
            Download Annual Report 2025
          </button>
        </div>
      </div>
    </div>
  )
}
