'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitEnquiry, EnquiryActionState } from '@/app/actions'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface EnquiryFormProps {
  initialLocation?: string
}

export default function EnquiryForm({ initialLocation = '' }: EnquiryFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<EnquiryActionState | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: initialLocation,
    propertyType: '',
    budgetRange: '',
    dimensions: '',
    notes: '',
    bot_field: '',
  })

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })
    
    const response = await submitEnquiry(undefined, data)
    setResult(response)
    setIsSubmitting(false)
    if (response.success) {
      setStep(4) // Success step
    }
  }

  return (
    <div className="w-full max-w-md mx-auto backdrop-blur-xl bg-slate-900/60 p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Your Details</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number (+91)"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <button
              onClick={handleNext}
              disabled={!formData.name || !formData.phone || !formData.email}
              className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-slate-950 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Preferences</h3>
            <select
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
              value={formData.preferredLocation}
              onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            >
              <option value="">Select Location</option>
              <option value="Bilishivale">Bilishivale</option>
              <option value="Chikkagubbi">Chikkagubbi</option>
              <option value="JP Nagar">JP Nagar</option>
            </select>
            
            <select
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            >
              <option value="">Select Property Type</option>
              <option value="Villa Plot">Villa Plot</option>
              <option value="Independent Villa">Independent Villa</option>
            </select>
            
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="w-1/3 border border-slate-600 text-slate-300 hover:text-white py-3 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.preferredLocation || !formData.propertyType}
                className="w-2/3 bg-[#D4AF37] hover:bg-[#b5952f] text-slate-950 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Final Details</h3>
            <select
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            >
              <option value="">Select Budget</option>
              <option value="50L - 1Cr">₹50L - ₹1 Cr</option>
              <option value="1Cr - 2.5Cr">₹1 Cr - ₹2.5 Cr</option>
              <option value="2.5Cr+">₹2.5 Cr+</option>
            </select>
            
            <select
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            >
              <option value="">Select Dimensions</option>
              <option value="30x40">30x40</option>
              <option value="30x50">30x50</option>
              <option value="40x60">40x60</option>
              <option value="Custom">Custom</option>
            </select>

            {result?.error && (
              <p className="text-red-400 text-sm">{result.error}</p>
            )}

            <div style={{ display: 'none' }} aria-hidden="true">
              <input 
                type="text" 
                name="bot_field" 
                tabIndex={-1} 
                autoComplete="off"
                value={formData.bot_field}
                onChange={(e) => setFormData({ ...formData, bot_field: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="w-1/3 border border-slate-600 text-slate-300 hover:text-white py-3 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.budgetRange || !formData.dimensions}
                className="w-2/3 flex justify-center items-center bg-[#D4AF37] hover:bg-[#b5952f] text-slate-950 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="mx-auto w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <h3 className="text-3xl font-serif text-[#D4AF37]">Thank You</h3>
            <p className="text-slate-300">
              We've found {result?.matches?.length || 0} matching properties for you. A brochure has been sent to your email.
            </p>
            
            <div className="mt-6 text-left space-y-3">
              {result?.matches?.map((match, idx) => (
                <div key={idx} className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-white">{match.title}</h4>
                  <p className="text-sm text-slate-400">Starting from {match.priceStartingFrom}</p>
                  <p className="text-xs text-[#D4AF37] mt-1">RERA: {match.reraNumber}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setStep(1)}
              className="mt-6 w-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 py-3 rounded-lg transition-colors"
            >
              Start New Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
