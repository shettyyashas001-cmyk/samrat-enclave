'use client'

import { useState } from 'react'
import EnquiryForm from '@/components/EnquiryForm'
import PropertyCards from '@/components/PropertyCards'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

const mockProperties = [
  { slug: 'samrat-golfshire', title: 'Samrat Golfshire', location: 'Nandi Hills', priceStartingFrom: '5.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/001', description: 'Ultra-luxury golf villas overlooking Nandi Hills.', features: ['18-hole Golf Course', 'Marriott Hotel', 'Luxury Clubhouse'], imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { slug: 'samrat-shantiniketan', title: 'Samrat Shantiniketan', location: 'Whitefield', priceStartingFrom: '1.2 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/002', description: 'Integrated township in the heart of Whitefield.', features: ['Mall', 'Tech Park', 'Multiplex'], imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { slug: 'samrat-falcon-city', title: 'Samrat Falcon City', location: 'Kanakapura Road', priceStartingFrom: '1.8 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/003', description: 'High-rise luxury apartments with a massive retail mall.', features: ['Forum Mall', 'Metro Connectivity', 'Clubhouse'], imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { slug: 'samrat-tech-enclave', title: 'Samrat Tech Enclave', location: 'Electronic City', priceStartingFrom: '1.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/004', description: 'Strategic plots in the tech corridor.', features: ['Tech-enabled living', 'Coworking space', 'Sports Arena'], imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { slug: 'samrat-royale', title: 'Samrat Royale', location: 'JP Nagar', priceStartingFrom: '3.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/005', description: 'Classic charm meets modern amenities.', features: ['Prime Location', 'Exclusive Neighborhood', 'Landscaped Parks'], imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { slug: 'samrat-greenways', title: 'Samrat Greenways', location: 'Bilishivale', priceStartingFrom: '1.2 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/006', description: 'Premium villa plots nestled in lush green corridors.', features: ['Gated Community', 'Clubhouse', '24/7 Security'], imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80' },
  { slug: 'samrat-lakeside', title: 'Samrat Lakeside', location: 'Yelahanka', priceStartingFrom: '4.2 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/007', description: 'Lake-facing bespoke villas.', features: ['Lake View', 'Private Garden', 'Smart Home'], imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80' },
  { slug: 'samrat-highline', title: 'Samrat Highline', location: 'Indiranagar', priceStartingFrom: '6.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/008', description: 'Exclusive penthouses in the city center.', features: ['Private Pool', 'City View', 'Valet Parking'], imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80' },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('')
  const router = useRouter()

  const filteredProperties = mockProperties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="flex-1 relative font-sans selection:bg-[#D4AF37] selection:text-white bg-transparent">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center pt-20 px-4">
        <div className="w-full max-w-4xl mx-auto text-center mt-10 md:mt-20">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 text-white drop-shadow-2xl">
            Redefining <br className="md:hidden" />
            <span className="text-[#D4AF37]">Urban Horizons</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-200 mb-8 md:mb-12 drop-shadow-lg font-light max-w-2xl mx-auto px-4">
            Experience our monumental developments across Bengaluru in stunning Augmented Reality.
          </p>

          <div className="bg-white/95 backdrop-blur p-2 rounded-lg shadow-2xl flex flex-col md:flex-row items-center max-w-3xl mx-auto gap-2 md:gap-0">
            <div className="flex items-center w-full md:flex-1 pl-2 md:pl-4">
              <Search className="w-5 h-5 text-slate-400 mr-2" />
              <input 
                type="text"
                placeholder="Search by project name or location"
                className="w-full bg-transparent border-none py-3 md:py-4 px-2 text-slate-900 focus:outline-none text-base md:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="w-full md:w-auto bg-[#D4AF37] hover:bg-slate-900 text-white px-8 py-3 md:py-4 rounded-md font-semibold transition-colors"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              SEARCH
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Featured Projects */}
      <section id="projects" className="py-16 md:py-24 bg-slate-50/95 backdrop-blur-sm">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Featured Developments</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-slate-600 text-base md:text-lg">
            Explore our diverse portfolio of luxury apartments, premium villas, and commercial spaces designed for the future.
          </p>
        </div>
        
        <PropertyCards 
          properties={filteredProperties}
          onSelectProperty={(title) => {
            const prop = mockProperties.find(p => p.title === title)
            if (prop) {
              router.push(`/projects/${prop.slug}`)
            }
          }} 
        />
      </section>

      {/* Enquiry Form Section */}
      <section id="contact" className="py-16 md:py-24 bg-slate-900/95 backdrop-blur-sm px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37] to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center relative z-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
              Register Your <br className="hidden md:block"/><span className="text-[#D4AF37]">Interest</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              Connect with our property advisors to receive exclusive floor plans, pricing sheets, and arrange a private site visit.
            </p>
            <div className="space-y-4 pt-4 md:pt-8 flex flex-col items-center md:items-start">
              <div className="flex items-center text-slate-300">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4">📞</div>
                <div className="text-left">
                  <p className="text-sm text-slate-500">Call Us</p>
                  <p className="font-semibold">+91 80733 97210</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md mx-auto">
            <EnquiryForm initialLocation={selectedProperty ? selectedProperty : ''} />
          </div>
        </div>
      </section>
    </main>
  )
}
