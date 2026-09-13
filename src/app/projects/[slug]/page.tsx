export const dynamic = 'force-dynamic'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ProjectARScene from '@/components/ProjectARScene'
import { CheckCircle, ArrowLeft, MessageSquare, Phone } from 'lucide-react'

// Prevent multiple Prisma instances in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Fallback images based on property type
function getFallbackImage(desc: string = '') {
  const lowerDesc = desc?.toLowerCase() || ''
  if (lowerDesc.includes('villa')) return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
  if (lowerDesc.includes('apartment')) return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'
  return 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
}

const MOCK_PROPERTIES = [
  { slug: 'samrat-golfshire', title: 'Samrat Golfshire', location: 'Nandi Hills', priceStartingFrom: '5.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/001', description: 'Ultra-luxury golf villas overlooking Nandi Hills.', features: '["18-hole Golf Course", "Marriott Hotel", "Luxury Clubhouse"]', brochureUrl: null, dimensions: 'Villa' },
  { slug: 'samrat-falcon-city', title: 'Samrat Falcon City', location: 'Kanakapura Road', priceStartingFrom: '1.8 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/003', description: 'High-rise luxury apartments with a massive retail mall.', features: '["Forum Mall", "Metro Connectivity", "Clubhouse"]', brochureUrl: null, dimensions: 'Apartment' },
  { slug: 'samrat-tech-enclave', title: 'Samrat Tech Enclave', location: 'Electronic City', priceStartingFrom: '1.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/004', description: 'Strategic plots in the tech corridor.', features: '["Tech-enabled living", "Coworking space", "Sports Arena"]', brochureUrl: null, dimensions: 'Plot' },
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let project = null
  try {
    project = await prisma.property.findUnique({
      where: { slug }
    })
  } catch (error) {
    console.error('Prisma fetch failed, using fallback:', error)
  }

  // Resilient Vercel Fallback
  if (!project) {
    project = MOCK_PROPERTIES.find(p => p.slug === slug) as any
    if (!project) {
      project = {
        id: 0,
        slug,
        title: 'Samrat Exclusive Development',
        location: 'Bengaluru',
        priceStartingFrom: 'On Request',
        reraNumber: 'Pending',
        description: 'Exclusive luxury properties tailored to your sophisticated lifestyle.',
        features: '["Premium Build", "Secure Community", "Lush Landscapes"]',
        brochureUrl: null,
        dimensions: 'Villa',
        createdAt: new Date(),
        updatedAt: new Date()
      } as any
    }
  }

  let features: string[] = []
  try {
    features = typeof project.features === 'string' 
      ? JSON.parse(project.features) 
      : (Array.isArray(project.features) ? project.features : [String(project.features)])
  } catch {
    features = project.features ? [String(project.features)] : []
  }

  const mainImage = project.brochureUrl && project.brochureUrl.startsWith('http')
    ? project.brochureUrl
    : getFallbackImage(project.description || '')

  const encodedTitle = encodeURIComponent(project.title)

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen text-slate-900 relative z-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-slate-500 flex items-center justify-center md:justify-start gap-2">
                📍 {project.location}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Starting From</p>
              <p className="text-3xl font-bold text-[#D4AF37]">₹ {project.priceStartingFrom}</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Details & Images */}
          <div className="space-y-10">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src={mainImage} 
                alt={project.title} 
                fill 
                className="object-cover" 
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs px-3 py-1 rounded font-bold shadow">
                RERA: {project.reraNumber || 'Applied / In Review'}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif mb-4">Project Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {features.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                      <span className="font-medium text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sales & Inquiry CTA Box */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl text-center">
              <h3 className="text-2xl font-serif mb-2">Interested in {project.title}?</h3>
              <p className="text-slate-400 mb-6">Contact our sales team today to schedule a site visit or request complete layout pricing.</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="tel:+918073397210"
                  className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-slate-950 font-bold px-6 py-3 rounded hover:bg-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Sales Team
                </a>

                <a 
                  href={`https://wa.me/918073397210?text=Hi%20Samrat%20Enclave,%20I%20am%20interested%20in%20learning%20more%20about%20${encodedTitle}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded hover:bg-emerald-500 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Model */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif mb-2">Interactive 3D Architectural View</h2>
              <p className="text-slate-500 mb-6">
                Explore the architectural layout directly from your browser. Click and drag to rotate, use the scroll wheel to zoom, or use the perspective shortcuts below.
              </p>
            </div>
            
            {/* 3D Scene Component */}
            <ProjectARScene projectType={project.dimensions} slug={project.slug} type={project.dimensions} />
            
            {/* Configuration Details Table */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-6">
              <h3 className="font-bold text-slate-900 mb-2">Configuration Details</h3>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-slate-500">Dimensions / Type</span>
                <span className="font-semibold text-slate-900">{project.dimensions}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-slate-500">Location</span>
                <span className="font-semibold text-slate-900">{project.location}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-slate-500">Price Guide</span>
                <span className="font-semibold text-[#D4AF37]">Starting from ₹ {project.priceStartingFrom}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-green-600">Now Selling</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-slate-500">Developer</span>
                <span className="font-semibold text-slate-900">Samrat Enclave</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}