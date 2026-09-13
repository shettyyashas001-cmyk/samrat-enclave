import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { Phone, Mail, MapPin, Calendar, Clock, ArrowLeft, Download } from 'lucide-react'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const dynamic = 'force-dynamic'

async function updateLeadStatus(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  const status = String(formData.get('status'))

  await prisma.enquiry.update({
    where: { id },
    data: { status },
  })

  revalidatePath('/admin')
}

export default async function AdminDashboard() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const newCount = enquiries.filter((e) => e.status === 'NEW').length
  const contactedCount = enquiries.filter((e) => e.status === 'CONTACTED').length
  const visitCount = enquiries.filter((e) => e.status === 'SITE_VISIT').length

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#D4AF37] uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Website
            </Link>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-3xl font-serif font-bold text-white">
                Lead Management Dashboard
              </h1>
              <a 
                href="/api/admin/export-leads" 
                className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-slate-950 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                title="Download all leads as CSV"
              >
                <Download className="w-4 h-4" /> Export CSV
              </a>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Real-time prospective buyer inquiries from Samrat Enclave landing pages.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-center">
              <span className="text-xs text-slate-400 uppercase font-semibold block">New Leads</span>
              <span className="text-2xl font-bold text-[#D4AF37]">{newCount}</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-center">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Contacted</span>
              <span className="text-2xl font-bold text-sky-400">{contactedCount}</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-center">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Site Visits</span>
              <span className="text-2xl font-bold text-emerald-400">{visitCount}</span>
            </div>
          </div>
        </div>

        {/* Lead Table */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/90 text-xs uppercase text-slate-400 border-b border-slate-800 tracking-wider">
                <tr>
                  <th className="py-4 px-6">Lead Details</th>
                  <th className="py-4 px-6">Preference</th>
                  <th className="py-4 px-6">Budget & Dimensions</th>
                  <th className="py-4 px-6">Date Received</th>
                  <th className="py-4 px-6">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-500">
                      No customer inquiries submitted yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-semibold text-white text-base">{lead.name}</p>
                        <div className="flex flex-col gap-1 mt-1 text-xs text-slate-400">
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> {lead.phone}
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-500" /> {lead.email}
                          </a>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                          {lead.preferredLocation}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 pl-5">
                          Type: <span className="text-slate-300">{lead.propertyType}</span>
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-block bg-slate-800 px-2.5 py-1 rounded text-xs font-semibold text-[#D4AF37] border border-slate-700">
                          {lead.budgetRange}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">
                          Size: {lead.dimensions}
                        </p>
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(lead.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <form action={updateLeadStatus} className="flex items-center gap-2">
                          <input type="hidden" name="id" value={lead.id} />
                          <select
                            name="status"
                            defaultValue={lead.status}
                            className="bg-slate-800 border border-slate-700 text-xs rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="SITE_VISIT">SITE VISIT</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                          <button
                            type="submit"
                            className="bg-[#D4AF37] text-slate-950 font-semibold px-2.5 py-1.5 text-xs rounded hover:bg-white transition-colors"
                          >
                            Save
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}