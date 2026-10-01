import React, { useState, useEffect } from 'react';
import { PageId } from '../types/resort';
import { ResortLogo } from './ResortLogo';
import { RESORT_INFO } from '../data/resortData';
import { Menu, X, Phone, CalendarCheck, CloudSun, Globe } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, preselectedRoom?: 'standard' | 'deluxe' | 'family') => void;
  onOpenGuideModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenGuideModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms & Accommodations' },
    { id: 'facilities', label: 'Facilities & Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact & Reservation' },
  ];

  const handleLinkClick = (pageId: PageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner Notice: Location & Quick Phone */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 font-sans tracking-wide border-b border-emerald-900/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Welcome to <strong>{RESORT_INFO.name}</strong> &bull; {RESORT_INFO.location.fullAddress}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-emerald-300">Front Desk: 24/7 Service</span>
            <a
              href={`tel:${RESORT_INFO.contact.phone}`}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{RESORT_INFO.contact.phoneFormatted}</span>
            </a>
            {/* Free Hosting Guide Button */}
            <button
              onClick={onOpenGuideModal}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 transition-colors text-[11px] font-semibold border border-emerald-700/60"
              title="Step-by-step instructions to publish for free on Netlify/GitHub"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>Free Hosting Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-stone-200'
            : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="focus:outline-none transition-transform active:scale-95"
            aria-label="Bikini Valley Resort Home"
          >
            <ResortLogo size="md" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-teal-900 hover:bg-stone-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 text-stone-900" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 sm:hidden"
            >
              Book
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-teal-800 hover:bg-stone-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <nav className="flex flex-col gap-1 mb-4">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'bg-teal-800 text-white'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 shadow"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Now / Reserve
              </button>
              <div className="flex gap-2">
                <a
                  href={`tel:${RESORT_INFO.contact.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  Call Front Desk
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenGuideModal();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200"
                >
                  <Globe className="w-3.5 h-3.5 text-teal-600" />
                  Free Hosting Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
