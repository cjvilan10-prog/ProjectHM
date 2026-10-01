import React, { useState } from 'react';
import { PageId } from '../types/resort';
import { FACILITIES_DATA, RESORT_INFO } from '../data/resortData';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Maximize2,
  CalendarCheck,
  PhoneCall,
  Utensils,
  Waves,
  Trees,
  Car,
  PartyPopper,
  Gamepad2,
} from 'lucide-react';

interface FacilitiesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenImage: (url: string, title: string, caption?: string) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onNavigate, onOpenImage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const facilityIcons: Record<string, React.ReactNode> = {
    'swimming-pool': <Waves className="w-5 h-5 text-teal-600" />,
    restaurant: <Utensils className="w-5 h-5 text-amber-600" />,
    garden: <Trees className="w-5 h-5 text-emerald-600" />,
    'beach-area': <Waves className="w-5 h-5 text-cyan-600" />,
    'parking-area': <Car className="w-5 h-5 text-stone-600" />,
    'recreation-area': <Gamepad2 className="w-5 h-5 text-indigo-600" />,
    'function-hall': <PartyPopper className="w-5 h-5 text-rose-600" />,
  };

  return (
    <div className="space-y-16 pb-20">
      {/* PAGE HERO BANNER */}
      <section className="bg-stone-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=80"
            alt="Bikini Valley Resort Pool & Facilities"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Endless Relaxation & Recreation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Resort Facilities & Services
          </h1>
          <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From our azure swimming pools and tropical coastal dining to serene botanical gardens and grand celebration venues, discover everything Bikini Valley Resort offers.
          </p>
        </div>
      </section>

      {/* INTRO SUMMARY PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-100">
            <div className="w-12 h-12 mx-auto rounded-xl bg-teal-800 text-amber-300 flex items-center justify-center mb-3">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
              Aquatic & Shoreline Bliss
            </h3>
            <p className="text-xs text-stone-600">
              Freshwater swimming pools and direct access to Samara sandy beach.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center mb-3">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
              Coastal Flavors & Dining
            </h3>
            <p className="text-xs text-stone-600">
              Fresh seafood, authentic Ilocano cuisine, and refreshing tropical drinks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center mb-3">
              <PartyPopper className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
              Celebrations & Gatherings
            </h3>
            <p className="text-xs text-stone-600">
              Spacious function hall and recreation spaces for reunions and parties.
            </p>
          </div>
        </div>
      </section>

      {/* COMPLETE 7 FACILITIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal-800 font-bold uppercase tracking-wider text-xs">
            Complete Amenities
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
            Our 7 Premier Facilities
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            Click any photograph to view high-resolution details and captions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES_DATA.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col group"
            >
              {/* Image Container */}
              <div
                className="relative h-60 overflow-hidden cursor-pointer"
                onClick={() =>
                  onOpenImage(facility.imageUrl, facility.title, facility.caption)
                }
              >
                <img
                  src={facility.imageUrl}
                  alt={facility.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Enlarge Photo
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-stone-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                  {facilityIcons[facility.id]}
                  <span>{facility.name}</span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-teal-800 transition-colors mb-1">
                    {facility.title}
                  </h3>

                  {/* Caption Highlight */}
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 mb-4">
                    <p className="text-xs text-amber-900 font-medium italic">
                      "{facility.caption}"
                    </p>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed mb-5">
                    {facility.description}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="space-y-1.5 mb-6">
                    {facility.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-stone-700 text-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operating Hours & Action */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span className="text-[11px] font-medium">{facility.hours}</span>
                  </div>

                  {facility.id === 'function-hall' || facility.id === 'restaurant' ? (
                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-3 py-1.5 rounded-full bg-teal-800 hover:bg-teal-900 text-white text-[11px] font-semibold tracking-wider transition-colors"
                    >
                      Inquire
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENT & FUNCTION HALL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-teal-800 text-amber-300 text-xs font-bold uppercase tracking-wider">
              Host Your Special Events
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Weddings, Reunions & Company Seminars
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              The Grand Valley Pavilion comfortably hosts up to 150 guests with customizable banquet layouts, audio-visual support, and fresh coastal catering packages. Plan your milestone moments with us in Samara, Aringay.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider shadow transition-colors"
            >
              Inquire Event Venue
            </button>
            <a
              href={`tel:${RESORT_INFO.contact.phone}`}
              className="px-6 py-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider border border-stone-700 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>{RESORT_INFO.contact.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
