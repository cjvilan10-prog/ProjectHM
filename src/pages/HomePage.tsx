import React from 'react';
import { PageId } from '../types/resort';
import { RESORT_INFO, ROOMS_DATA, FACILITIES_DATA, WHY_CHOOSE_US } from '../data/resortData';
import { VideoPlayer } from '../components/VideoPlayer';
import {
  MapPin,
  CalendarCheck,
  PhoneCall,
  ArrowRight,
  Sun,
  Waves,
  HeartHandshake,
  ShieldCheck,
  CheckCircle,
  Users,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, preselectedRoom?: 'standard' | 'deluxe' | 'family') => void;
  onOpenImage: (url: string, title: string, caption?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenImage }) => {
  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900">
        {/* Background Image with Parallax-like fit */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85"
            alt="Bikini Valley Resort tropical beachfront pool and palm trees in Samara, Aringay"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
          />
          {/* Subtle tropical gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-stone-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/40 via-transparent to-amber-950/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-300 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-lg">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{RESORT_INFO.location.fullAddress}</span>
          </div>

          {/* Slogan */}
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-amber-200 tracking-wider mb-3">
            {RESORT_INFO.slogan}
          </p>

          {/* Resort Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-md">
            Bikini Valley Resort
          </h1>

          {/* Welcoming Introduction */}
          <p className="text-base sm:text-lg md:text-xl text-stone-100 max-w-3xl mx-auto font-normal leading-relaxed mb-10 drop-shadow">
            Welcome to Bikini Valley Resort, your sanctuary of calm along the tranquil shores of{' '}
            <strong className="text-white font-semibold">Samara, Aringay, La Union</strong>.
            Surrender to gentle sea breezes, dive into our refreshing pools, and experience sincere
            Filipino hospitality tailored for unforgettable holidays and relaxing weekend getaways.
          </p>

          {/* Prominent Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <CalendarCheck className="w-5 h-5 text-stone-950" />
              <span>Book Now</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PhoneCall className="w-5 h-5 text-white" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={() => onNavigate('rooms')}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-stone-900/60 hover:bg-stone-900/80 text-stone-200 text-sm font-semibold tracking-wide border border-white/20 transition-colors"
            >
              Explore Rooms & Rates &rarr;
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 text-xs tracking-widest uppercase animate-bounce">
          <span className="text-[10px] mb-1">Scroll Down</span>
          <div className="w-4 h-7 rounded-full border border-white/40 flex justify-center pt-1">
            <div className="w-1 h-2 bg-amber-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* WELCOMING INTRO & SECONDARY PHOTO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              The Southern La Union Coastal Jewel
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              A Serene Tropical Escape in Samara, Aringay
            </h2>
            <p className="text-stone-600 text-base leading-relaxed">
              Tucked away from the bustling surf centers of northern towns, <strong>Bikini Valley Resort</strong> offers a slower, peaceful retreat. Here, sunny mornings begin with the scent of salty sea air and fresh tropical breakfast, followed by invigorating swims in our azure pool and restorative strolls in our lush garden paths.
            </p>
            <p className="text-stone-600 text-base leading-relaxed">
              Whether you are planning an intimate romantic getaway, a memorable family reunion, or a quiet solo sanctuary to recharge, our resort is built to provide maximum comfort, safety, and tropical serenity.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-stone-800 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Prime Beachfront Access</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Sparkling Swimming Pool</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Coastal Dining Bistro</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>24/7 Front Desk & Security</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                Plan Your Stay With Us
              </button>
              <button
                onClick={() => onNavigate('facilities')}
                className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                View All Facilities
              </button>
            </div>
          </div>

          {/* Secondary Photographs Showcase */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] cursor-pointer group"
              onClick={() =>
                onOpenImage(
                  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
                  'Beachfront Villas & Grounds',
                  'Bikini Valley Resort tropical beachfront villas surrounded by palm groves'
                )
              }
            >
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
                alt="Tropical beachfront villas at Bikini Valley Resort"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-medium">Click to view full photo</span>
              </div>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-stone-800 shadow-sm">
                Resort Villas
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] cursor-pointer group"
                onClick={() =>
                  onOpenImage(
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                    'Samara Shoreline & Ocean Breeze',
                    'Direct access to golden shores in Samara, Aringay'
                  )
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Sunny shoreline beach of Samara, Aringay"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-stone-800 shadow-sm">
                  Samara Beach
                </div>
              </div>

              <div
                className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] cursor-pointer group"
                onClick={() =>
                  onOpenImage(
                    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
                    'Sparkling Freshwater Pool',
                    'Refreshing dip under La Union sun'
                  )
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
                  alt="Resort pool surrounded by tropical loungers"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-stone-800 shadow-sm">
                  Crystal Pool
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GUESTS ENJOY STAYING AT BIKINI VALLEY */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-teal-800 font-bold uppercase tracking-wider text-xs">
              Exceptional Hospitality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Why Guests Love Staying at Bikini Valley
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-3">
              We take pride in providing a restorative sanctuary where every detail is tailored for rest, relaxation, and reconnection with nature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, index) => {
              const icons = {
                Waves: <Waves className="w-7 h-7 text-teal-700" />,
                Sun: <Sun className="w-7 h-7 text-amber-600" />,
                HeartHandshake: <HeartHandshake className="w-7 h-7 text-rose-600" />,
                ShieldCheck: <ShieldCheck className="w-7 h-7 text-emerald-700" />,
              };
              return (
                <div
                  key={index}
                  className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-stone-200/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-13 h-13 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center mb-5">
                      {icons[item.icon as keyof typeof icons] || <Sparkles className="w-7 h-7 text-teal-700" />}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACCOMMODATIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-teal-800 font-bold uppercase tracking-wider text-xs">
              Comfort & Elegance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Accommodations Preview
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Choose from our thoughtfully curated room categories, from peaceful standard retreats to sprawling family suites.
            </p>
          </div>
          <button
            onClick={() => onNavigate('rooms')}
            className="inline-flex items-center gap-2 text-teal-800 hover:text-teal-950 font-bold text-sm uppercase tracking-wider group"
          >
            <span>View All Room Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS_DATA.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col group"
            >
              {/* Image Frame */}
              <div
                className="relative h-60 overflow-hidden cursor-pointer"
                onClick={() => onOpenImage(room.imageUrl, room.name, room.description)}
              >
                <img
                  src={room.imageUrl}
                  alt={room.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-sm text-amber-300 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  ₱{room.pricePHP.toLocaleString()} / night
                </div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-700" />
                  <span>Up to {room.capacity} Guests</span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-teal-800 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-stone-500 mb-3 italic">{room.tagline}</p>
                  <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="px-2 py-1 rounded-md bg-stone-100 text-stone-500 text-[11px]">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 italic">
                    Sample educational rate
                  </span>
                  <button
                    onClick={() => onNavigate('contact', room.id)}
                    className="px-4 py-2 rounded-full bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Book This Room
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOTIONAL RESORT TOUR VIDEO SECTION */}
      <section className="bg-stone-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoPlayer
            title="Bikini Valley Resort: Relax. Explore. Experience."
            description="Take a guided visual tour through our seaside grounds in Samara, Aringay. Witness the tranquil beauty of La Union's coastal haven."
          />
        </div>
      </section>

      {/* FACILITIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-teal-800 font-bold uppercase tracking-wider text-xs">
              Resort Amenities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Featured Facilities
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Enjoy all seven full resort facilities designed for recreation, culinary pleasure, relaxation, and grand gatherings.
            </p>
          </div>
          <button
            onClick={() => onNavigate('facilities')}
            className="inline-flex items-center gap-2 text-teal-800 hover:text-teal-950 font-bold text-sm uppercase tracking-wider group"
          >
            <span>Explore All 7 Facilities</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES_DATA.slice(0, 4).map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-200 cursor-pointer group flex flex-col"
              onClick={() => onOpenImage(facility.imageUrl, facility.title, facility.caption)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={facility.imageUrl}
                  alt={facility.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                  {facility.name}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-teal-800 transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {facility.caption}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-teal-800 font-semibold">
                  <span>View Details</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK INQUIRY CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-white/20">
              Samara, Aringay, La Union
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
              Ready for your peaceful coastal escape?
            </h2>
            <p className="text-teal-100 text-sm sm:text-base leading-relaxed mb-8">
              Book your stay at Bikini Valley Resort today. From comfortable standard rooms to spacious family suites, our friendly team is ready to welcome you.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Reserve Your Stay Now
              </button>
              <a
                href={`tel:${RESORT_INFO.contact.phone}`}
                className="px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call {RESORT_INFO.contact.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
