import React, { useState } from 'react';
import { PageId, Room } from '../types/resort';
import { ROOMS_DATA, RESORT_INFO } from '../data/resortData';
import {
  Users,
  Check,
  CalendarCheck,
  Sparkles,
  Bed,
  Maximize2,
  Clock,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Coffee,
  Tv,
  Wifi,
  Wind,
} from 'lucide-react';

interface RoomsPageProps {
  onNavigate: (page: PageId, preselectedRoom?: 'standard' | 'deluxe' | 'family') => void;
  onOpenImage: (url: string, title: string, caption?: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onNavigate, onOpenImage }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | '2' | '3' | '6'>('all');

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (selectedFilter === 'all') return true;
    return room.capacity.toString() === selectedFilter;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* PAGE HEADER */}
      <section className="bg-stone-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80"
            alt="Bikini Valley Resort Rooms"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Coastal Comfort & Serenity
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Rooms & Accommodations
          </h1>
          <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Thoughtfully designed living spaces overlooking our manicured gardens and tropical coast in Samara, Aringay, La Union.
          </p>

          {/* Educational Disclaimer Banner */}
          <div className="mt-8 max-w-3xl mx-auto bg-amber-500/15 border border-amber-400/40 rounded-xl p-3.5 text-amber-200 text-xs flex items-center gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="text-amber-300 block">Hospitality Management Simulation Rates:</strong>
              All prices shown are sample educational rates for academic presentation and can be adjusted. They do not constitute fixed commercial offers.
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & ROOMS LIST CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Capacity Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Select Your Preferred Room
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Showing {filteredRooms.length} room categories
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedFilter('2')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedFilter === '2'
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              2 Guests (Standard)
            </button>
            <button
              onClick={() => setSelectedFilter('3')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedFilter === '3'
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              3 Guests (Deluxe)
            </button>
            <button
              onClick={() => setSelectedFilter('6')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedFilter === '6'
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              6 Guests (Family)
            </button>
          </div>
        </div>

        {/* ROOM CARDS */}
        <div className="space-y-12 mt-10">
          {filteredRooms.map((room, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={room.id}
                id={`room-${room.id}`}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Photo Column */}
                <div
                  className={`lg:col-span-6 relative overflow-hidden min-h-[300px] sm:min-h-[380px] cursor-pointer group ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                  onClick={() => onOpenImage(room.imageUrl, room.name, room.description)}
                >
                  <img
                    src={room.imageUrl}
                    alt={room.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Click to expand photo
                    </span>
                  </div>

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-xs font-bold shadow">
                      {room.name}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-teal-900/80 backdrop-blur-md text-teal-200 text-xs font-medium flex items-center gap-1.5 shadow">
                      <Users className="w-3.5 h-3.5" />
                      {room.capacityDescription}
                    </span>
                  </div>
                </div>

                {/* Details Column */}
                <div
                  className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : ''
                  }`}
                >
                  <div>
                    {/* Header: Title & Price */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 pb-4 mb-4">
                      <div>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                          {room.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-teal-800 font-medium italic mt-0.5">
                          {room.tagline}
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                            ₱{room.pricePHP.toLocaleString()}
                          </span>
                          <span className="text-xs text-stone-500 font-semibold">
                            PHP / night
                          </span>
                        </div>
                        <span className="text-[11px] text-amber-700 font-medium block">
                          *Sample educational rate
                        </span>
                      </div>
                    </div>

                    {/* Room Description */}
                    <p className="text-stone-600 text-sm leading-relaxed mb-6">
                      {room.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs">
                      <div className="flex items-center gap-2 text-stone-700">
                        <Bed className="w-4 h-4 text-teal-700 shrink-0" />
                        <span>
                          <strong>Beds:</strong> {room.bedConfig}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-700">
                        <Users className="w-4 h-4 text-teal-700 shrink-0" />
                        <span>
                          <strong>Capacity:</strong> {room.capacity} Guests Max
                        </span>
                      </div>
                    </div>

                    {/* Major Amenities */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                        Included Amenities:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {room.amenities.map((amenity, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-stone-700 text-xs"
                          >
                            <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="text-xs text-stone-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Check-in 2:00 PM &bull; Check-out 12:00 PM</span>
                    </div>

                    <button
                      onClick={() => onNavigate('contact', room.id)}
                      className="px-6 py-3 rounded-full bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <CalendarCheck className="w-4 h-4 text-amber-300" />
                      <span>Book This Room</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AMENITIES COMPARISON MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-teal-800 font-bold uppercase tracking-wider text-xs">
              Room Comparison
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Accommodations At-A-Glance
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
              Compare capacities, amenities, and educational sample rates side by side.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="py-3 px-4 font-bold text-stone-900">Feature</th>
                  <th className="py-3 px-4 font-bold text-stone-900 text-center">Standard Room</th>
                  <th className="py-3 px-4 font-bold text-teal-800 text-center">Deluxe Room</th>
                  <th className="py-3 px-4 font-bold text-amber-800 text-center">Family Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-800">Max Guest Capacity</td>
                  <td className="py-3 px-4 text-center">2 Guests</td>
                  <td className="py-3 px-4 text-center">3 Guests</td>
                  <td className="py-3 px-4 text-center">6 Guests</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-800">Sample Rate / Night</td>
                  <td className="py-3 px-4 text-center font-bold text-stone-900">₱1,500 PHP</td>
                  <td className="py-3 px-4 text-center font-bold text-stone-900">₱2,500 PHP</td>
                  <td className="py-3 px-4 text-center font-bold text-stone-900">₱4,000 PHP</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-800">Air Conditioning</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ Included</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ Included</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ Multi-zone</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-800">Private Bathroom</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ Ensuite</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ Rain Shower</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ Dual Sinks</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-800">Complimentary Wi-Fi</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ High-speed</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ High-speed</td>
                  <td className="py-3 px-4 text-center text-teal-600">✓ Multi-device</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-800">Television</td>
                  <td className="py-3 px-4 text-center text-stone-700">Cable TV</td>
                  <td className="py-3 px-4 text-center text-stone-700">Smart TV</td>
                  <td className="py-3 px-4 text-center text-stone-700">55" Smart TV</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-800">Private Outdoor Balcony</td>
                  <td className="py-3 px-4 text-center text-stone-400">—</td>
                  <td className="py-3 px-4 text-center text-teal-600 font-semibold">✓ Balcony Included</td>
                  <td className="py-3 px-4 text-center text-stone-400">—</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-800">Action</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onNavigate('contact', 'standard')}
                      className="px-3 py-1.5 rounded-full bg-teal-800 text-white text-xs font-semibold"
                    >
                      Book Standard
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onNavigate('contact', 'deluxe')}
                      className="px-3 py-1.5 rounded-full bg-teal-800 text-white text-xs font-semibold"
                    >
                      Book Deluxe
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onNavigate('contact', 'family')}
                      className="px-3 py-1.5 rounded-full bg-teal-800 text-white text-xs font-semibold"
                    >
                      Book Family
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* RESORT POLICIES & STAY GUIDELINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
            <Clock className="w-6 h-6 text-teal-700 mb-3" />
            <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
              Check-In & Check-Out
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Standard check-in begins at <strong>2:00 PM</strong>. Standard check-out is at <strong>12:00 PM</strong>. Early check-in or late check-out is subject to room availability upon request.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
            <Users className="w-6 h-6 text-amber-700 mb-3" />
            <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
              Occupancy Policy
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Room capacities are strictly maintained for guest comfort and safety: Standard (2 max), Deluxe (3 max), and Family (6 max). Please specify total guests when booking.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
            <ShieldCheck className="w-6 h-6 text-emerald-700 mb-3" />
            <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
              Reservation Inquiries
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Online submissions are processed as formal reservation inquiries. Our front desk team verifies availability and contacts you within 24 hours to finalize your stay.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
