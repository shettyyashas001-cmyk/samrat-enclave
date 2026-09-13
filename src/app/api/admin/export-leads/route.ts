export const dynamic = 'force-dynamic'
export const revalidate = 0

import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    const headers = [
      'Lead ID',
      'Name',
      'Phone',
      'Email',
      'Preferred Location',
      'Property Type',
      'Budget Range',
      'Dimensions',
      'Status',
      'Submission Date',
    ]

    const csvRows = []
    csvRows.push(headers.join(','))

    for (const enq of enquiries) {
      const row = [
        enq.id,
        `"${enq.name.replace(/"/g, '""')}"`,
        `"${enq.phone}"`,
        `"${enq.email}"`,
        `"${enq.preferredLocation.replace(/"/g, '""')}"`,
        `"${enq.propertyType}"`,
        `"${enq.budgetRange}"`,
        `"${enq.dimensions}"`,
        `"${enq.status}"`,
        `"${enq.createdAt.toISOString()}"`,
      ]
      csvRows.push(row.join(','))
    }

    const csvString = csvRows.join('\n')

    return new Response(csvString, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="leads_export.csv"',
      },
    })
  } catch (error) {
    console.error('Error generating CSV:', error)
    return new Response('Error generating CSV', { status: 500 })
  }
}
