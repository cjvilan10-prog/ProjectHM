import React from 'react';
import { PageId } from '../types/resort';
import { ResortLogo } from './ResortLogo';
import { RESORT_INFO } from '../data/resortData';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 font-sans border-t border-stone-800">
      {/* Top Tropical Pattern & Accent Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-amber-400 to-emerald-600" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <ResortLogo variant="light" size="md" showTagline />
            <p className="text-stone-400 text-sm leading-relaxed pt-2">
              A serene tropical escape located along the tranquil coastline of Samara, Aringay, La Union.
              Offering idyllic beach walks, sparkling swimming pools, and genuine Filipino warmth.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-serif italic border border-stone-700">
                "{RESORT_INFO.slogan}"
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-stone-800 pb-2">
              Explore The Resort
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">&bull;</span> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('rooms')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">&bull;</span> Rooms & Accommodations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('facilities')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">&bull;</span> Facilities & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('gallery')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">&bull;</span> Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">&bull;</span> Contact & Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-stone-800 pb-2">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a
                  href={RESORT_INFO.maps.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  {RESORT_INFO.location.fullAddress}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${RESORT_INFO.contact.phone}`}
                  className="hover:text-amber-300 transition-colors font-medium text-stone-200"
                >
                  {RESORT_INFO.contact.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${RESORT_INFO.contact.email}`}
                  className="hover:text-amber-300 transition-colors break-all text-stone-200"
                >
                  {RESORT_INFO.contact.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-xs text-stone-400">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-300">Front Desk: 24/7 Daily</p>
                  <p>Check-in: 2:00 PM &bull; Check-out: 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Social Media & Educational Project Note */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-stone-800 pb-2">
              Connect With Us
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href={RESORT_INFO.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors border border-stone-700/60"
              >
                <svg className="w-4 h-4 fill-blue-500" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="truncate">Facebook Profile</span>
                <ExternalLink className="w-3 h-3 ml-auto text-stone-500" />
              </a>

              <a
                href={RESORT_INFO.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors border border-stone-700/60"
              >
                <svg className="w-4 h-4 fill-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="truncate">Instagram (@bikinivalley)</span>
                <ExternalLink className="w-3 h-3 ml-auto text-stone-500" />
              </a>
            </div>

            <div className="pt-2 text-xs text-stone-400 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
              <span className="font-semibold text-amber-300 block mb-1">
                College Project Notice:
              </span>
              Designed for College Hospitality Management study. Room rates & features are sample representations.
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {currentYear} {RESORT_INFO.name}. All rights reserved. &bull; Samara, Aringay, La Union, Philippines
          </p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with hospitality & warmth for guests</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
