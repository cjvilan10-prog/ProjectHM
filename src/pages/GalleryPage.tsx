import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/resortData';
import { Sparkles, Maximize2, Info, Filter, Camera } from 'lucide-react';

interface GalleryPageProps {
  onOpenImage: (url: string, title: string, caption?: string, credit?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenImage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'grounds', label: 'Resort Grounds' },
    { id: 'rooms', label: 'Accommodations' },
    { id: 'facilities', label: 'Pool & Dining' },
    { id: 'scenery', label: 'Sunsets & Coastline' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* PAGE HEADER */}
      <section className="bg-stone-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            alt="Bikini Valley Resort Coastline Sunset"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-700">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            Visual Splendor & Memories
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Resort Photo Gallery
          </h1>
          <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Take a visual walk through our sun-kissed pool deck, calm coastal shoreline, inviting suites, and tranquil garden walkways in Samara, Aringay.
          </p>
        </div>
      </section>

      {/* FILTER & GALLERY GRID CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-8 border-b border-stone-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-stone-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3] border border-stone-200"
              onClick={() =>
                onOpenImage(photo.imageUrl, photo.title, photo.caption, photo.credit)
              }
            >
              {/* Image */}
              <img
                src={photo.imageUrl}
                alt={photo.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    {photo.categoryLabel}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-white font-bold text-base mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-stone-300 text-xs line-clamp-2">
                    {photo.caption}
                  </p>
                  <span className="text-[10px] text-teal-300 font-medium mt-2 block">
                    Click to view full size &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Educational Stock Photo Credits & Disclaimer */}
        <div className="mt-14 p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-800 block">Photo Credits & Attribution:</strong>
              High-resolution stock imagery licensed under Unsplash used to represent the resort features, amenities, and coastal ambiance of Samara, Aringay for educational Hospitality Management project purposes.
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-white border border-stone-200 font-semibold text-stone-700 text-[11px] shrink-0">
            {filteredPhotos.length} Images Displayed
          </span>
        </div>
      </section>
    </div>
  );
};
