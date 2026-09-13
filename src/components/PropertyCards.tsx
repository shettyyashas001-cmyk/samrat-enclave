import { MapPin } from 'lucide-react'
import Image from 'next/image'

interface PropertyCardProps {
  properties: Array<{
    title: string;
    location: string;
    priceStartingFrom: string;
    description: string;
    features: string[];
    reraNumber: string;
    imageUrl?: string;
  }>;
  onSelectProperty: (title: string) => void;
}

export default function PropertyCards({ properties, onSelectProperty }: PropertyCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
      {properties.map((prop, idx) => (
        <div 
          key={idx}
          className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
        >
          {/* Image Area */}
          <div className="h-48 md:h-56 bg-slate-200 relative overflow-hidden flex items-center justify-center">
            {prop.imageUrl ? (
              <Image 
                src={prop.imageUrl} 
                alt={prop.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="text-slate-400">No Image</div>
            )}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] md:text-xs px-3 py-1 rounded-sm uppercase tracking-wider font-semibold">
              Premium
            </div>
          </div>

          <div className="p-5 md:p-6 flex-1 flex flex-col">
            <h3 className="text-lg md:text-xl font-serif text-slate-900 mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
              {prop.title}
            </h3>
            <div className="flex items-center text-slate-500 text-xs md:text-sm mb-3">
              <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{prop.location}</span>
            </div>
            
            <p className="text-slate-600 text-xs md:text-sm mb-4 line-clamp-2 h-10">
              {prop.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4 h-12 overflow-hidden">
              {prop.features.slice(0, 3).map((feature, i) => (
                <span key={i} className="text-[10px] md:text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full border border-slate-200 truncate max-w-[120px]">
                  {feature}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-end border-t border-slate-100 pt-4 mt-auto">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">Starting From</p>
                <p className="text-base md:text-lg font-semibold text-[#D4AF37]">₹ {prop.priceStartingFrom}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProperty(prop.title);
                }}
                className="text-xs md:text-sm font-medium text-slate-900 border-b-2 border-transparent group-hover:border-[#D4AF37] transition-colors pb-0.5"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
