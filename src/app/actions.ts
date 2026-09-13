'use server'

import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

// Strict Zod Validation Schema
const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string()
    .transform((val) => val.replace(/[\s\-\(\)\+]/g, '').replace(/^(91|0)/, ''))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number')),
  email: z.string().email('Invalid email address').max(150).optional().or(z.literal('')),
  preferredLocation: z.string().max(100).optional().default('Bengaluru'),
  propertyType: z.string().max(100).optional().default('Villa Plots'),
  budgetRange: z.string().max(50).optional().default('Flexible'),
  dimensions: z.string().max(50).optional().default('Standard'),
  notes: z.string().max(1000).optional(),
})

export type EnquiryActionState = {
  success?: boolean
  error?: string
  matches?: any[]
}

// In-Memory Rate Limiter (Token Bucket / Sliding Window)
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  let record = rateLimitMap.get(ip);
  if (!record || record.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count += 1;
  return true;
}

// Simple HTML sanitizer to prevent Stored XSS
function sanitize(input: string | undefined): string | undefined {
  if (!input) return input;
  return input.replace(/<[^>]*>?/gm, '').trim();
}

export async function submitEnquiry(
  prevState: EnquiryActionState | undefined,
  formData: FormData
): Promise<EnquiryActionState> {
  try {
    // 1. Check Honeypot for Bot Protection
    const honeypot = formData.get('bot_field') as string;
    if (honeypot) {
      console.warn('Bot detected via honeypot');
      return { success: true, matches: [] }; // Silently drop
    }

    // 2. IP Rate Limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1';
    
    if (!checkRateLimit(ip)) {
      return { success: false, error: 'Too many requests. Please try again in 10 minutes.' }
    }

    // 3. Extract and Sanitize Payload
    const rawData = {
      name: sanitize(formData.get('name') as string),
      phone: sanitize(formData.get('phone') as string),
      email: sanitize(formData.get('email') as string),
      preferredLocation: sanitize(formData.get('preferredLocation') as string),
      propertyType: sanitize(formData.get('propertyType') as string),
      budgetRange: sanitize(formData.get('budgetRange') as string),
      dimensions: sanitize(formData.get('dimensions') as string),
      notes: sanitize(formData.get('notes') as string),
    }

    // 4. Strict Payload Validation
    const validatedData = enquirySchema.parse(rawData)

    // 5. Parameterized Database Save (Prisma naturally prevents SQL Injection)
    const enquiry = await prisma.enquiry.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || undefined,
        preferredLocation: validatedData.preferredLocation,
        propertyType: validatedData.propertyType,
        budgetRange: validatedData.budgetRange,
        dimensions: validatedData.dimensions,
        notes: validatedData.notes,
      },
    })

    // 6. Send Webhook Notification securely
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🚨 **New Property Lead!** 🚨\n\n**Name:** ${validatedData.name}\n**Phone:** ${validatedData.phone}\n**Interest:** ${validatedData.propertyType} in ${validatedData.preferredLocation}\n**Budget:** ${validatedData.budgetRange}`,
          }),
        })
      } catch (webhookError) {
        console.error('Error sending webhook notification:', webhookError) // Logged internally, never leaked
      }
    }

    // 7. Find Matching Properties
    const matches = await prisma.property.findMany({
      where: {
        location: {
          contains: validatedData.preferredLocation,
        },
      },
    })

    return {
      success: true,
      matches,
    }
  } catch (error: any) {
    if (error && typeof error === 'object' && 'errors' in error) {
      // Return simple validation error message, do not leak stack traces
      return { success: false, error: error.errors[0].message }
    }
    
    console.error('Error submitting enquiry:', error) // Log to console, generic message to client
    return { success: false, error: 'Submission failed. Please try again.' }
  }
}
