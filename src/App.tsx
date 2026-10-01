import React, { useState } from 'react';
import { PageId } from './types/resort';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ImageModal } from './components/ImageModal';
import { HostingGuideModal } from './components/HostingGuideModal';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactReservationPage } from './pages/ContactReservationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [preselectedRoom, setPreselectedRoom] = useState<'standard' | 'deluxe' | 'family' | undefined>(
    undefined
  );

  // Lightbox Modal state
  const [activeImage, setActiveImage] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    caption?: string;
    credit?: string;
  }>({
    isOpen: false,
    url: '',
    title: '',
  });

  // Free Hosting & Project Guide Modal
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const handleNavigate = (page: PageId, roomChoice?: 'standard' | 'deluxe' | 'family') => {
    if (roomChoice) {
      setPreselectedRoom(roomChoice);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenImage = (url: string, title: string, caption?: string, credit?: string) => {
    setActiveImage({
      isOpen: true,
      url,
      title,
      caption,
      credit,
    });
  };

  const handleCloseImage = () => {
    setActiveImage((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-stone-800 font-sans selection:bg-amber-300 selection:text-stone-950">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenImage={handleOpenImage} />
        )}
        {currentPage === 'rooms' && (
          <RoomsPage onNavigate={handleNavigate} onOpenImage={handleOpenImage} />
        )}
        {currentPage === 'facilities' && (
          <FacilitiesPage onNavigate={handleNavigate} onOpenImage={handleOpenImage} />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage onOpenImage={handleOpenImage} />
        )}
        {currentPage === 'contact' && (
          <ContactReservationPage
            preselectedRoomId={preselectedRoom}
            onOpenGuideModal={() => setIsGuideModalOpen(true)}
          />
        )}
      </main>

      {/* Global Image Lightbox Modal */}
      <ImageModal
        isOpen={activeImage.isOpen}
        onClose={handleCloseImage}
        imageUrl={activeImage.url}
        title={activeImage.title}
        caption={activeImage.caption}
        credit={activeImage.credit}
      />

      {/* Free Hosting Guide Modal */}
      <HostingGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* Global Persistent Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
